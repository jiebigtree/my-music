<template>
  <div>
    <topHeader>
      <div slot="center-search">热门歌手</div>
      <div>
        <svg-icon
          iconClass="playing"
          style="fill:white;width:20px;height:20px"
        ></svg-icon>
      </div>
    </topHeader>

    <scroll :nofooter="true">
      <div slot="list">
        <div :style="style">
          <div class="pic-mask">
            <h1>{{ name }}</h1>
          </div>
        </div>
        <div class="tab">
          <div @click="changeView('Song')">单曲</div>
          <div @click="changeView('MV')">MV</div>
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
      style: `background-image:url(${this.$route.params.singerPic});width:100%;height:200px;background-position:center center;background-size:100%`
    };
  },
  methods: {
    changeView: function(data) {
      console.log(data);
      this.currentView = "singer" + data; //动态地改变currentView的值就可以动态挂载组件了。
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
    bottom 25%
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
  background-color yellow
  line-height 40px
</style>
