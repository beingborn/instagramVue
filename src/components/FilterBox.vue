<template>
  <div
    :class="filter + ' filter-item'"
    :style="{ backgroundImage: `url(${imgUrl})` }"
  >
    {{ filter }}
    <slot name="a"></slot>
    <button @click="fire" class="btn-primary btn-32">필터</button>
  </div>
</template>

<script>
export default {
  name: 'filterbox',
  methods: {
    fire() {
      this.emitter.emit('filterUpload', this.filter)
      this.emitter.emit('filterChange', this.filter)
    },
  },

  props: {
    imgUrl: String,
    filter: String,
  },
}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
  cursor: pointer;
}
</style>
