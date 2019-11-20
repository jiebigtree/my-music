<template>
  <div class="playing" v-show="playList.length > 0">
    <!-- <audio :src="playUrl" controls=""></audio>
    <img class="playing-bg" :src="songPic" alt="" />
    {{ playUrl }} -->
    <div class="full-screen" v-show="fullScreen">
      <topHeader>
        <div slot="left-icon" @click="baker">
          <svg-icon
            iconClass="back"
            style="fill:white;width:20px;height:20px"
          ></svg-icon>
        </div>
        <div slot="center-search">歌单</div>
      </topHeader>
      <div style="width:100%;overflow:scroll">
        <!-- <span>{{ playList }}</span> -->
        <!-- {{ playList }} -->
        {{ currentSong }}
        {{ currentIndex }}
        <audio :src="currentSong.url" autoplay controls></audio>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "playing",
  data() {
    return {
      // songId: this.$route.params.songId,
      // songPic: this.$route.params.songPic,
      // playUrl: "",
      // bgPic: `background-image: url('${this.playUrl}')`
    };
  },
  methods: {
    // getSongUrl() {
    //   let url =
    //     "http://localhost:3000/song/url?id=" + this.$route.params.songId;
    //   axios.get(url).then(res => {
    //     // console.log(res.data.data[0].url);
    //     this.playUrl = res.data.data[0].url;
    //   });
    // },
    baker() {
      this.setFullScreen(false);
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN"
    }),
    open() {
      this.setFullScreen(true);
    }
  },
  computed: {
    ...mapGetters([
      "fullScreen",
      "playList",
      "currentSong",
      "playList",
      "currentIndex"
    ])
  },
  created() {
    // this.getSongUrl();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "../../../assets/stylus/common.styl"
@import "../../../assets/stylus/playing.styl"
</style>
