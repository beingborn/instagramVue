<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="?" />
    <div class="post-header">
      <div class="profile"></div>
      <span class="profile-name">{{ follower }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    // ref 를 쓰는 이유
    let follower = ref([])

    axios.get('')

    return { follower }
  },

  name: 'MyPage',
}
</script>

<style></style>
