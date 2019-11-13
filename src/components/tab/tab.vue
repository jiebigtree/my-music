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
          iconClass: "menu",
          name: "发现",
          to: "/finding"
        },
        {
          iconClass: "menu",
          name: "视频",
          to: "/radio"
        },
        {
          iconClass: "menu",
          name: "我的",
          to: "/mine"
        },
        {
          iconClass: "menu",
          name: "云村",
          to: "/cloud"
        },
        {
          iconClass: "menu",
          name: "账号",
          to: "/account"
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
.tab-container
  width 100%
.tab
  position fixed
  bottom 0
  left 0
  right 0
  // height 50px
  background-color black
  color white
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
    color red
</style>
