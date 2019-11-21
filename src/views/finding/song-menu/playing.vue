<template>
  <div class="playing" v-show="playList.length > 0">
    <!-- <audio :src="playUrl" controls=""></audio>
    <img class="playing-bg" :src="songPic" alt="" />
    {{ playUrl }} -->
    <transition name="slide-fade">
      <div class="full-screen" v-show="fullScreen">
        <div
          class="bg-blur"
          :style="{
            backgroundImage: 'url(' + currentSong.pic + ')',
            backgroundSize: 'cover'
          }"
        ></div>
        <topHeader>
          <div slot="left-icon" @click="baker">
            <svg-icon
              iconClass="back"
              style="fill:red;width:20px;height:20px"
            ></svg-icon>
          </div>
          <div slot="center-search">{{ currentSong.songName }}</div>
          <div slot="right-icon">
            <svg-icon
              iconClass="back"
              style="fill:white;width:20px;height:20px"
            ></svg-icon>
          </div>
        </topHeader>
        <div style="width:100%;overflow:scroll">
          <!-- <span>{{ playList }}</span> -->
          <!-- {{ playList }} -->
          <!-- {{ currentSong }}
        {{ currentIndex }} -->
          <audio ref="audio" :src="currentSong.url"></audio>
          <span>{{ currentSong.singer }}</span>
          <!-- <span>{{ currentSong.songName }}</span> -->
          <div class="cd"></div>
          <!-- <img :src="currentSong.pic" alt="" width="100%" /> -->
        </div>
        <div class="bottom">
          <button @click="togglePlaying">暂停</button>
        </div>
      </div>
    </transition>
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
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE"
    }),
    open() {
      this.setFullScreen(true);
    },
    togglePlaying() {
      this.setPlayingState(!this.playing);
    }
  },
  computed: {
    ...mapGetters([
      "fullScreen",
      "playList",
      "currentSong",
      "playList",
      "currentIndex",
      "playing"
    ])
  },
  created() {
    // this.getSongUrl();
  },
  watch: {
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "../../../assets/stylus/common.styl"
@import "../../../assets/stylus/playing.styl"
</style>
