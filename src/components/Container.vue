<template>
  <button @click="updateClick(0)">포스트</button>
  <button @click="updateClick(1)">필터</button>
  <button @click="updateClick(2)">글작성</button>
  <button @click="updateClick(3)">마이페이지</button>

  <div v-if="step == 0">
    <Post :PostData="PostData[i]" v-for="(post, i) in PostData" :key="i" />
  </div>
  <!-- 필터선택페이지 -->
  <div v-if="step == 1">
    <div
      class="upload-image"
      :class="selectedFilter"
      :style="{ backgroundImage: `url(${imgUrl})` }"
    ></div>
    <div class="filters">
      <FilterBox
        :imgUrl="imgUrl"
        v-for="filter in filters"
        :key="filter"
        :filter="filter"
      >
        <template v-slot:default="name">
          <span>{{ name }}</span>
        </template>
      </FilterBox>
    </div>
  </div>

  <!-- 글작성페이지 -->
  <div v-if="step == 2">
    <div
      class="upload-image"
      :style="{ backgroundImage: `url(${imgUrl})` }"
    ></div>
    <div class="write">
      <textarea class="write-box" @input="$emit('write', $event.target.value)">
write!</textarea
      >
    </div>
  </div>

  <div v-if="step == 3">
    <MyPage />
  </div>

  <!-- 글 발행 -->
</template>

<script>
import Post from './Post.vue'
import FilterBox from './FilterBox.vue'
import MyPage from './MyPage.vue'

export default {
  name: 'Container',

  data() {
    return {
      filters: [
        'aden',
        '_1977',
        'brannan',
        'brooklyn',
        'clarendon',
        'earlybird',
        'gingham',
        'hudson',
        'inkwell',
        'kelvin',
        'lark',
        'lofi',
        'maven',
        'mayfair',
        'moon',
        'nashville',
        'perpetua',
        'reyes',
        'rise',
        'slumber',
        'stinson',
        'toaster',
        'valencia',
        'walden',
        'willow',
        'xpro2',
      ],

      selectedFilter: '',
    }
  },

  components: {
    Post,
    FilterBox,
    MyPage,
  },

  props: {
    PostData: Array,
    step: Number,
    imgUrl: String,
  },

  methods: {
    updateClick(num) {
      this.$emit('update-step', num)
    },
  },

  mounted() {
    this.emitter.on('filterUpload', (a) => {
      this.selectedFilter = a
    })
  },
}
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
