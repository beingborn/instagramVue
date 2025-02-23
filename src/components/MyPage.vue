<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input id="search" placeholder="?" @input="onChange($event)" />
    <div class="post-header" v-for="(follower, index) in follower" :key="index">
      <div
        class="profile"
        :style="{ backgroundImage: `url(${follower.image})` }"
      ></div>
      <span class="profile-name">{{ follower.name }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { reactive } from 'vue'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    let follower = ref([])
    let test = reactive({ name: 'kim' })

    test

    onMounted(() => {
      axios.get('/follower.json').then((a) => {
        follower.value = a.data
      })
    })

    return { follower }
  },
  methods: {
    onChange(event) {
      let length = this.follower.length

      for (let i = 0; i < length; i++) {
        if (this.follower[i].name.includes(event.target.value) == false) {
          document.querySelectorAll('.post-header')[i].style.display = 'none'
        } else {
          document.querySelectorAll('.post-header')[i].style.display = 'block'
        }
      }
    },
  },

  name: 'MyPage',
}
</script>

<style></style>
