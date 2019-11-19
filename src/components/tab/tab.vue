<template>
  <div class="tab-container">
    <div class="tab">
      <div class="tab-container">
        <router-link
          tag="div"
          v-for="(one, index) in tabButtons"
          :key="index"
          class="tab-item"
          :to="one.to"
        >
          <svg-icon
            :iconClass="one.iconClass"
            style="width:20px;height:20px;fill:white"
          ></svg-icon>
          <span class="tab-span">{{ one.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab",
  data() {
    return {
      tabButtons: [
        {
          iconClass: "music",
          name: "发现",
          to: "/finding"
        },
        {
          iconClass: "singer",
          name: "歌手",
          to: "/singer"
        },
        {
          iconClass: "mine",
          name: "我的",
          to: "/mine"
        },
        {
          iconClass: "cloud",
          name: "云村",
          to: "/cloud"
        }
      ]
    };
  },
  methods: {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "../../assets/stylus/common.styl"
.tab-container
  width 100%
  height 50px
.tab
  position fixed
  bottom 0
  left 0
  right 0
  // height 50px
  background-color $bgc
  color $fontColor
  .tab-container
    display flex
    flex-direction row
    justify-content space-around
    .tab-item
      text-align center
      margin 4px 0
      .tab-span
        display block
        font-size 10px
        margin-top 4px
  .router-link-active
    color white
</style>
