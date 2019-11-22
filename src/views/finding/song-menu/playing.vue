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
          <div slot="center-search">
            <div style="color:white">
              <span class="song-name">{{ currentSong.songName }}</span>
              <span class="singer-name">{{ currentSong.singer }}</span>
            </div>
          </div>
          <div slot="right-icon" style="opacity:0">
            <svg-icon
              iconClass="back"
              style="fill:white;width:20px;height:20px"
            ></svg-icon>
          </div>
        </topHeader>
        <div class="cd" :style="style">
          <img :src="currentSong.pic" alt="" />
          <!-- <img src="@/assets/images/cd.png" alt="" width="100%" /> -->
        </div>
        <div style="width:100%;overflow:hidden">
          <!-- <span>{{ playList }}</span> -->
          <!-- {{ playList }} -->
          <!-- {{ currentSong }}
        {{ currentIndex }} -->
          <audio ref="audio" :src="currentSong.url"></audio>
          <!-- <span>{{ currentSong.songName }}</span> -->

          <!-- <img :src="currentSong.pic" alt="" width="100%" /> -->
        </div>
        <div class="bottom">
          <div class="bottom-icons">
            <div class="sequence">
              <svg-icon
                iconClass="circle"
                style="width:20px;height:20px"
              ></svg-icon>
            </div>
            <div class="pre">
              <svg-icon
                iconClass="pre"
                style="width:20px;height:20px"
              ></svg-icon>
            </div>
            <div class="state" @click="togglePlaying" v-if="playing">
              <svg-icon
                iconClass="pause"
                style="width:20px;height:20px"
              ></svg-icon>
            </div>
            <div class="state" v-else @click="togglePlaying">
              <svg-icon
                iconClass="play"
                style="width:20px;height:20px"
              ></svg-icon>
            </div>
            <div class="next">
              <svg-icon
                iconClass="next"
                style="width:20px;height:20px"
              ></svg-icon>
            </div>
            <div class="list">
              <svg-icon
                iconClass="list"
                style="width:20px;height:20px"
              ></svg-icon>
            </div>
          </div>
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
      roundState: true
    };
  },
  methods: {
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
      this.roundState = !this.roundState;
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
    ]),
    style() {
      if (this.roundState) {
        return "animation-play-state:play";
      } else {
        return "animation-play-state:paused";
      }
    }
  },
  created() {},
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
        // console.log(newPlaying);
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
