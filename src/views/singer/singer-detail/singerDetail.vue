<template>
  <div class="bigest-container">
    <topHeader>
      <div slot="center-search">热门歌手</div>
      <div slot="right-icon">
        <svg-icon
          iconClass="playing"
          style="fill:white;width:20px;height:20px"
        ></svg-icon>
      </div>
    </topHeader>
    <div class="tab fixCls" v-show="fixCls">
      <div
        @click="changeView('Song', true)"
        :class="{ isCurrent: isCurrent }"
        class="one-tab"
      >
        单曲
      </div>
      <div
        @click="changeView('MV', false)"
        :class="{ isCurrent: !isCurrent }"
        class="one-tab"
      >
        MV
      </div>
    </div>
    <scroll :nofooter="true" :pic="pic" :tabFix="tabFix" @fixer="fixer">
      <div slot="list">
        <div :style="style">
          <div class="pic-mask">
            <h1>{{ name }}</h1>
          </div>
        </div>
        <div>
          <div class="tab">
            <div
              @click="changeView('Song', true)"
              :class="{ isCurrent: isCurrent }"
              class="one-tab"
            >
              单曲
            </div>
            <div
              @click="changeView('MV', false)"
              :class="{ isCurrent: !isCurrent }"
              class="one-tab"
            >
              MV
            </div>
          </div>
        </div>
        <component :is="currentView" :id="id"></component>
      </div>
    </scroll>
  </div>
</template>
<script>
import scroll from "@/components/publicComponents/scroll.vue";
// import axios from "axios";
import singerMV from "./singerMVs";
import singerSong from "./singerSongs";
export default {
  name: "singer-detail",
  components: {
    scroll,
    singerSong,
    singerMV
  },
  data() {
    return {
      id: this.$route.params.singerId,
      pic: this.$route.params.singerPic,
      name: this.$route.params.singerName,
      currentView: "singerSong",
      style: `background-image:url(${this.$route.params.singerPic});width:100%;height:200px;background-position:center center;background-size:100%`,
      isCurrent: true,
      tabFix: true,
      fixCls: false
    };
  },
  methods: {
    changeView: function(data, bool) {
      console.log(data);
      this.currentView = "singer" + data; //动态地改变currentView的值就可以动态挂载组件了。
      this.isCurrent = bool;
    },
    fixer(i) {
      console.log(i);
      this.fixCls = i;
    }
  },
  created() {}
};
</script>
<style lang="stylus" scoped>
.pic-mask
  background-color rgba(0,0,0,.4)
  position relative
  width 100%
  height 100%
  h1
    position absolute
    bottom 15%
    width 100%
    line-height 50px
    text-align center
    font-size 26px
    color #ccc
.tab
  display flex
  justify-content space-around
  height 40px
  width 100%
  line-height 40px
  .one-tab
    width 50%
    text-align center
  .isCurrent
    background-color rgba(0,0,0,.3)
.fixCls
  position fixed!important
  top 50px;
  left 0
  z-index 10
  width 100%
</style>
