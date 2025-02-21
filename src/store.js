// App.js와 Store에 데이터를 넣는다 가정했을 때. 어떤식으로 구분하고 또
// 어느정도의 기준으로 이를 분별할 것인가.

// 우선 App.js에서 넣었을 경우에는 자식에게 데이터를 넘겨주기위해 props를 이용해야한다.
// 2depth 까지는 그리 번거롭지 않지만. 더 관계가 복잡해지거나, 형제 간의 속성 공유가 필요한 경우에는
// 이는 그리 효율적인 방식이 아니다.

// 그래서 정말 전역적으로 많이 사용이 되는 데이터는 store에 넣고 빈도수는 적으나 App.js에서 2 depth 이상
// 넘어가지 않는 경우, App에 넣자.

// 그리고 App.js에서는 데이터 변경의 가능성이 적은 데이터를 넣으면 좋을 것 같다.
// store.js는 한번 데이터를 검사해줄 방법이 방법이 있기 때문에 API (서버)의 개념으로 한번 더 필터링 할 수 있다는 게
// 큰 장점이다.

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
  // 데이터를 받아왔을 때 해당 데이터값을 실어 해당 함수 실행
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
