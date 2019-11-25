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
          <audio ref="audio" :src="currentSong.url" @canplay="ready" @timeupdate="updateTime"></audio>
          <!-- <span>{{ currentSong.songName }}</span> -->

          <!-- <img :src="currentSong.pic" alt="" width="100%" /> -->
        </div>
        <div class="bottom">
          <div class="play-time-container">{{format(currenTime)}}{{format(duration)}}</div>
          <div></div>
          <div class="bottom-icons">
            <div class="sequence">
              <svg-icon
                iconClass="circle"
                style="width:20px;height:20px"
              ></svg-icon>
            </div>
            <div class="pre" @click="pre">
              <svg-icon
                iconClass="pre"
                style="width:20px;height:20px"
              ></svg-icon>
            </div>
            <div class="state" @click="togglePlaying" v-if="playingState">
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
            <div class="next" @click="next">
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
      roundState: true,
      playingState:false,
      musicOk:false,
      currenTime:0,
      duration:0
    };
  },
  methods: {
    baker() {
      this.setFullScreen(false);
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex:'SET_CURRENT_INDEX'
    }),
    open() {
      this.setFullScreen(true);
    },
    togglePlaying() {
      this.setPlayingState(!this.playing);
      this.roundState = !this.roundState;
    },
    pre(){
      if(!this.musicOk){
        return
      }
      let index = this.currentIndex - 1
      if(index === -1){
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)
      if(!this.playing){
        this.playingState = true
      }
      this.musicOk = false
    },
    next(){
      if(!this.musicOk){
        return
      }
      let index = this.currentIndex + 1
      if(index === this.playList.length){
        index = 0
      }
      this.setCurrentIndex(index)
      if(!this.playing){
        this.playingState = true
      }
      this.musicOk = false
    },
    ready(){
      this.musicOk = true
    },
    updateTime(e){
      this.duration = e.target.duration
      this.currenTime = e.target.currentTime
    },
    _pad(num,n=2){
      let len = num.toString().length
      while(len < n){
        num = '0' + num
        len ++
      }
      return num
    },
    format(interval){
      interval = interval | 0
      const minute = this._pad(interval / 60 | 0)
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    }
  },
  computed: {
    ...mapGetters([
      "fullScreen",
      "playList",
      "currentSong",
      "playList",
      "currentIndex",
      "playing",
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
        this.playingState = newPlaying
        this.roundState = newPlaying
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
