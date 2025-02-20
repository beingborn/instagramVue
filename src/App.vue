<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li @click="step++">Next</li>
      <li @click="publish">글발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- state를 직접적으로 바꾸기 X => store.js에 부탁  -->
  <h4>안녕 {{ $store.state.name }}</h4>
  <!-- store에서 지정한 함수를 실행 (mutations) -->
  <button @click="$store.commit('ageIncrease', 10)">나이</button>
  <h4>{{ $store.state.age }}</h4>

  <!-- state에서 ajax 요청 받기 => (actions) -->
  <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기</button>

  <!-- computed 함수는 이름만 사용 -->
  <p>{{ now2 }}, {{ counter }}</p>
  <button @click="counter++">카운터</button>

  <Container
    :PostData="PostData"
    :step="step"
    @update-step="updateStep"
    @write="writeDetail = $event"
    :imgUrl="imgUrl"
  />
  <button @click="more()">데이터 가져오기</button>
  <div class="footer">
    <ul class="footer-button-plus">
      <input type="file" id="file" class="inputfile" @change="upload($event)" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from './components/Container.vue'
import PostData from './assets/postData.js'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Container: Container,
  },
  data() {
    return {
      PostData: PostData,
      moreCount: 0,
      step: 0,
      imgUrl: '',
      writeDetail: '',
      selectedFilter: '',
      counter: 0,
    }
  },

  // 값을 처음만 실행함. (자원 절약)
  computed: {
    now2() {
      return new Date()
    },
  },

  methods: {
    now() {
      return new Date()
    },

    upload(e) {
      let file = e.target.files
      let url = URL.createObjectURL(file[0])
      this.imgUrl = url
      this.step++
    },
    savecont(content) {
      this.desc = content
    },
    publish() {
      var myPost = {
        name: 'Kim Hyun',
        userImage: 'https://picsum.photos/100?random=1',
        postImage: this.imgUrl,
        likes: 36,
        date: 'May 15',
        liked: false,
        content: this.writeDetail,
        filter: this.selectedFilter,
      }

      this.PostData.unshift(myPost)
      this.step = 0
    },

    // 전달 받은 매개변수를 새로운 데이터로 갈아치움
    updateStep(newStep) {
      this.step = newStep
    },

    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.moreCount}.json`)
        .then((res) => {
          this.PostData.unshift(res.data)
          this.moreCount++
        })
        .catch((res) => {
          console.log('실패', res)
        })
    },
  },
  mounted() {
    this.emitter.on('filterChange', (a) => {
      this.selectedFilter = a
    })
  },
}
</script>

<style lang="scss">
body {
  @include text-style.text-style(16, colors.$primary);
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;

  &.is-active {
    width: 100%;
  }
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: 'consolas';
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
