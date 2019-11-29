<template>
  <div class="top-header-conatiner">
    <div class="top-header">
      <div class="slot-container">
        <div class="left-icon" style="leftShow">
          <slot name="left-icon">
            <div @click="goBack">
              <svg-icon
                iconClass="back"
                style="width:20px;height:20px"
              ></svg-icon>
            </div>
          </slot>
        </div>
        <div class="center-search">
          <slot name="center-search"> </slot>
        </div>
        <div class="right-icon" @click="open">
          <slot name="right-icon">
            <div v-show="!fullScreen">
              <svg-icon
                iconClass="back"
                style="width:20px;height:20px"
              ></svg-icon>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "top-header",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      console.log("back");
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN"
    }),
    open() {
      console.log("open");
      this.setFullScreen(true);
    }
  },
  created() {},
  computed: {
    ...mapGetters(["fullScreen"])
  },
  props: {
    leftShow: {
      type: String,
      default: ""
    }
  }
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
  background-color rgba(0,0,0,0)
  z-index 9
  .slot-container
    height 100%
    display flex
    flex-direction row
    justify-content space-between
    align-items center;
    .center-search
      input
        height 25px
        border-radius 15px
        background-color rgba(220,220,220,.3)
        font-size 12px
        width 200px
        text-align center
        color rgba(220,220,220,.5)
      div
        text-align center
        width 200px
        font-weight 900
        color rgba(80,80,80,.8)
    .left-icon,.right-icon
      width 16%
      text-align center
</style>
