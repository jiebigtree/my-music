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
              style="fill:white;width:20px;height:20px"
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

        <div class="cd" :style="style" @click="toggleCenter">
          <img :src="currentSong.pic" alt="" />
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
          <p ref="lyricLine" class="lyric"></p>
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
            <div class="sequence" @click="changeSequence">
              <svg-icon
                iconClass="round"
                style="width:20px;height:20px"
                v-show="playSequence == 0"
              ></svg-icon>
              <svg-icon
                iconClass="circle"
                style="width:20px;height:20px"
                v-show="playSequence == 1"
              ></svg-icon>
              <svg-icon
                iconClass="sequence"
                style="width:20px;height:20px"
                v-show="playSequence == 2"
              ></svg-icon>
              <svg-icon
                iconClass="random"
                style="width:20px;height:20px"
                v-show="playSequence == 3"
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
            <div class="list" @click="showList">
              <svg-icon
                iconClass="list"
                style="width:20px;height:20px"
              ></svg-icon>
            </div>
          </div>
        </div>
        <van-popup
          v-model="listShow"
          position="bottom"
          :style="{ height: '65%' }"
        >
          <div class="play-list-pop">
            <ul>
              <li v-for="(item,index) in playList" :key="index">
                <span class="song-name">{{item.songName}}</span>
                <span class="singer-name">{{item.singer}}</span>
              </li>
            </ul>
          </div>
        </van-popup>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import progresser from "@/components/publicComponents/progress.vue";

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
      lyrArr: [],
      result: [],
      flagN: 0,
      playSequence: 0,
      listShow:false
    };
  },
  beforeRouterLeave(to, from, next) {
    to.meta.keepAlive = true;
    next();
  },
  mounted() {},
  methods: {
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
      // console.log(this.playList[index].url);
      if (this.playList[index].url == null) {
        console.log("该歌曲无法播放");
        index++;
      }
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
      if (this.playSequence == 0) {
        this.next();
        console.log("列表循环");
      } else if (this.playSequence == 1) {
        console.log("单曲循环");
      } else if (this.playSequence == 2) {
        console.log("顺序播放");
      } else {
        console.log("随机播放");
      }
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
    },
    getLrc() {
      let timeReg = /\[\d{2}:\d{2}\.\d{2,3}\]/g; //匹配时间的正则表达式
      for (let i = 0; i < this.lyrics.length - 1; i++) {
        let time = this.lyrics[i].match(timeReg); //获取歌词里的时间
        let value = this.lyrics[i].replace(timeReg, ""); //获取纯歌词文本

        for (let j = 0; j < time.length; j++) {
          let t = time[j].slice(1, -1).split(":"); //t[0]分钟，t[1]秒
          let timeArr = parseInt(t[0], 10) * 60 + parseFloat(t[1]);
          this.result.push([timeArr, value]); //以[时间(秒)，歌词]的形式存进result
        }
      }
      this.showLrc();
    },
    showLrc() {
      let that = this;
      if (this.playing) {
        setInterval(function() {
          let curTime = that.currenTime; //获取当前的播放时间
          if (
            curTime > that.result[that.flagN + 1][0] ||
            curTime < that.result[that.flagN][0]
          ) {
            for (let i = 0; i < that.result.length; i++) {
              if (
                curTime > that.result[i][0] &&
                curTime < that.result[i + 1][0]
              ) {
                that.flagN = i;
              }
            }
          }
          if (
            curTime > that.result[that.flagN][0] &&
            curTime < that.result[that.flagN + 1][0] &&
            that.$refs.lyricLine.innerHTML !== that.result[that.flagN][1]
          ) {
            that.$refs.lyricLine.innerHTML = that.result[that.flagN][1];
            that.flagN =
              that.flagN === that.result.length - 2 ? 0 : that.flagN + 1;
          }
        }, 400);
      }
    },
    changeSequence() {
      if (this.playSequence == 3) {
        this.playSequence = 0;
      } else {
        this.playSequence++;
      }
      console.log(this.playSequence);
    },
    showList(){
      this.listShow = true
    }
  },
  computed: {
    ...mapGetters([
      "fullScreen",
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
        this.lyrics = res.data.lrc.lyric.split("\n");
        this.getLrc();
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
