<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- </transition> -->
    <player></player>
    <tab v-if="showTab"></tab>
  </div>
</template>
<script>
import axios from "axios";
import Tab from "./components/tab/tab.vue";
import player from "./views/finding/song-menu/playing";
export default {
  name: "App",
  data() {
    return { transitionName: "" };
  },
  components: {
    Tab,
    player
  },
  created() {
    axios
      .get(
        "http://localhost:3000/login/cellphone?phone=18846914587&password=netmusic4587"
      )
      .then(res => {
        console.log(res.data.playlist);
        this.allData = res.data.playlist;
      });
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  },
  computed: {
    showTab() {
      if (
        this.$route.name == "playing" ||
        this.$route.name == "singer-detail"
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="stylus">
#app
    width 100%
    height 100%
    background-color $bodybgc
    overflow hidden
    font-family: 'yunyou';
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  overflow hidden
}
.slide-right-enter {
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  transform: translate3d(-100%, 0, 0);
}
</style>
