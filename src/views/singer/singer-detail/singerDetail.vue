<template>
  <div class="bigest-container">
    <topHeader>
      <div slot="center-search">{{ name }}</div>
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
    <scroll
      :nofooter="true"
      :pic="pic"
      :tabFix="tabFix"
      @fixer="fixer"
      @big="big"
    >
      <div slot="list">
        <div class="pic-con">
          <div :style="style" ref="bigPic" class="pic-con">
            <div class="pic-mask">
              <!-- <h1>{{ name }}</h1> -->
            </div>
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
        <keep-alive>
          <component :is="currentView" :id="id"></component>
        </keep-alive>
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
      style: `background-image:url(${this.$route.params.singerPic});width:100%;height:200px;background-position:center center;background-size:100%;overflow:hidden`,
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
      // console.log(i);
      this.fixCls = i;
    },
    big(i) {
      // console.log(i / 10);
      this.$refs.bigPic.style.transform = `scale(${1 + i / 15})`;
      this.$refs.bigPic.style.overflow = "hidden";
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
  background-color #eee
  .one-tab
    width 50%
    text-align center
  .isCurrent
    background-color white
.fixCls
  position fixed!important
  top 50px;
  left 0
  z-index 10
  width 100%
  background-color #eee
.pic-con
  width 100%
  height 240px
  overflow hidden
</style>
