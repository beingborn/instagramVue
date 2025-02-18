import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      // state 보관
      name: 'kim',
      age: 11,
      likes: 30,
    }
  },

  // 데이터 수정 방법 정의
  // store.js 수신
  // 파라미터 = 필수 상단 데이터를 가르킴
  mutations: {
    nameChange(state) {
      state.name = 'park'
    },
    ageIncrease(state, resAge) {
      state.age += resAge
    },
  },
})

export default store
