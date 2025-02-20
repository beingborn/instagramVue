import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      // state 보관
      name: 'kim',
      age: 11,
      likes: 31,
      likeClick: false,
      more: {},
    }
  },

  // 데이터 수정 방법 정의
  // store.js 수신
  // 파라미터 = 필수 상단 데이터를 가르킴
  mutations: {
    setMore(state, data) {
      state.more = data
    },
    nameChange(state) {
      state.name = 'park'
    },
    ageIncrease(state, resAge) {
      state.age += resAge
    },
    likeIncrease(state) {
      if (state.likeClick == false) {
        state.likes++
        state.likeClick = true
      } else {
        state.likes--
        state.likeClick = false
      }
    },
  },

  // AJAX 요청 받는 함수
  // axios로 데이터 받아옴.
  // mutations 데이터를 변경하는 함수 제작
  // 데이터를 받아왔을 때 해당 데이터값을 싫어 해당 함수 실행
  // context == $store라고 생각하면 됌

  actions: {
    getData(context) {
      axios.get(`https://codingapple1.github.io/vue/more0.json`).then((res) => {
        console.log(res.data)
        context.commit('setMore', res.data)
      })
    },
  },
})

export default store
