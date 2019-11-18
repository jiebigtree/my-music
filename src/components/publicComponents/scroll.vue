<template>
  <div class="wrapper" ref="wrapper">
    <slot name="list">
      <ul>
        <li v-for="(item, index) in data" :key="index">{{ item.name }}</li>
      </ul>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper);
    });
  },
  methods: {

  }
}
</script>

<style type="text/css">
.wrapper {
  overflow: hidden;
  height: 100vh;
  margin-bottom: 200px;
  background-color: yellow;
}
ul li {
  height: 40px;
}
</style>
