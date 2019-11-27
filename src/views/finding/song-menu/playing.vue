<template>
  <div class="playing" v-show="playList.length > 0">
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

        <div
          class="cd"
          :style="style"
          @click="toggleCenter"
          v-show="!showLyrics"
        >
          <img :src="currentSong.pic" alt="" />
        </div>
        <div
          class="wrapper"
          @click="toggleCenter"
          v-show="showLyrics"
          ref="wrapper"
        >
          <div class="lyric-container" ref="content">
            <p
              ref="lyricLine"
              class="text"
              v-for="(line, index) in lyrArr"
              :key="index"
            >
              {{ line.txt }}
            </p>
          </div>
        </div>
        <div style="width:100%;overflow:hidden">
          <audio
            ref="audio"
            :src="currentSong.url"
            @ended="endMusic"
            @canplay="ready"
            @timeupdate="updateTime"
          ></audio>
        </div>
        <div class="bottom">
          <div class="play-time-container">
            <div class="left-time">{{ format(currenTime) }}</div>
            <div class="progress">
              <progresser
                :percent="percent"
                @percentChange="percentChanger"
              ></progresser>
            </div>
            <div class="right-time">{{ format(duration) }}</div>
          </div>
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
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import progresser from "@/components/publicComponents/progress.vue";
// import Lyric from "lyric-parser";
import BScroll from "better-scroll";

export default {
  name: "playing",
  components: {
    progresser
  },
  data() {
    return {
      roundState: true,
      playingState: false,
      musicOk: false,
      currenTime: 0,
      duration: 0,
      lyrics: "",
      showLyrics: false,
      lyrArr: [],
      scroll: "",
      scrollY: "",
      isScroll: false,
      timeoutflag: null,
      scrollTop: 0
    };
  },
  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 600);
  },
  methods: {
    initScroll() {
      this.listScroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        scrollY: true,
        click: true,
        useTransition: false, // 防止iphone微信滑动卡顿
        bounce: true,
        momentumLimitDistance: 5
      });
      this.scrolling();
    },
    scrolling() {
      this.listScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
        // console.log(this.scrollY)
      });
    },
    baker() {
      this.setFullScreen(false);
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX"
    }),
    open() {
      this.setFullScreen(true);
    },
    togglePlaying() {
      this.setPlayingState(!this.playing);
      this.roundState = !this.roundState;
    },
    pre() {
      if (!this.musicOk) {
        return;
      }
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playList.length - 1;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.playingState = true;
      }
      this.musicOk = false;
    },
    next() {
      if (!this.musicOk) {
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.playList.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.playingState = true;
      }
      this.musicOk = false;
    },
    endMusic() {
      this.next();
    },
    ready() {
      this.musicOk = true;
    },
    updateTime(e) {
      this.duration = e.target.duration;
      this.currenTime = e.target.currentTime;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    format(interval) {
      interval = interval | 0;
      const minute = this._pad((interval / 60) | 0);
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    percentChanger(percent) {
      this.$refs.audio.currentTime = this.duration * percent;
      if (!this.playing) {
        this.togglePlaying();
      }
    },
    toggleCenter() {
      this.showLyrics = !this.showLyrics;
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
    },
    percent() {
      return this.currenTime / this.duration;
    }
  },
  watch: {
    currentSong() {
      this.showLyrics = false;
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
      let url = "http://localhost:3000/lyric?id=" + this.currentSong.id;
      axios.get(url).then(res => {
        // console.log(res.data.lrc.lyric);
        this.lyrics = res.data.lrc.lyric;
        const arr1 = this.lyrics.split("[").slice(1);
        // console.log(arr1[i].indexOf("]"));
        for (let i = 0; i < arr1.length; i++) {
          this.lyrArr[i] = {
            time: arr1[i].slice(0, arr1[i].indexOf("]")),
            txt: arr1[i].slice(arr1[i].indexOf("]") + 1)
          };
        }
      });
    },
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
        // console.log(newPlaying);
        this.playingState = newPlaying;
        this.roundState = newPlaying;
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
