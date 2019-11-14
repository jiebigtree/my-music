<template>
  <div class="top-header-conatiner">
    <div class="top-header">
      <div class="slot-container">
        <div class="left-icon">
          <slot name="left-icon"> </slot>
        </div>
        <div class="center-search">
          <slot name="center-search"> </slot>
        </div>
        <div class="right-icon">
          <slot name="right-icon"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: "top-header",
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "../../assets/stylus/common.styl"
.top-header-conatiner
  height 50px;
  width 100%
.top-header
  width 100%
  position fixed
  top 0
  left 0
  height 50px
  background-color $bgc
  .slot-container
    height 100%
    display flex
    flex-direction row
    justify-content space-around
    align-items center;
    .center-search
      input
        height 25px
        border-radius 15px
        background-color $bgGray
        font-size 12px
        width 200px
        text-indent 10px
        color $fontColor
</style>
