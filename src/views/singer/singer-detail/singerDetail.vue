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
    <div @click="changeView('Song')">单曲</div>
    <div @click="changeView('MV')">MV</div>
    <component :is="currentView" :id="id"></component>
    <!-- <scroll>
      <div style="width:100%;height:500px">aaa</div>
    </scroll> -->
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
      currentView: "singerSong"
    };
  },
  methods: {
    changeView: function(data) {
      console.log(data);
      this.currentView = "singer" + data; //动态地改变currentView的值就可以动态挂载组件了。
    }
  }
};
</script>
