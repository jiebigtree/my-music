<template>
  <div class="one-play-list-conatiner" @click="oneMusic">
    <div class="float-left">
      {{ index + 1 }}
    </div>
    <div class="float-center">
      <div class="music-name">{{ listArray.name }}</div>
      <div class="singer-name">{{ singer }}-{{ alubum }}</div>
    </div>
    <!-- {{ index + 1 }} -->
    <!-- {{ listArray.name }}
    {{ singer }} -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "play-list",
  props: {
    idnum: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      listArray: {},
      singer: "",
      alubum: "",
      alPicUrl: ""
    };
  },
  methods: {
    getData() {
      let url = "http://localhost:3000/song/detail?ids=" + this.idnum;
      axios.get(url).then(res => {
        // this.listArray = res.data.data[0];
        // console.log(res.data.songs);
        this.listArray = res.data.songs[0];
        this.singer = res.data.songs[0].ar[0].name;
        this.alubum = res.data.songs[0].al.name;
        this.alPicUrl = res.data.songs[0].al.picUrl;
      });
    },
    oneMusic() {
      // this.$emit("toGetPic", this.alPicUrl);
      this.$router.push({
        name: "playing",
        params: {
          songId: this.idnum,
          songPic: this.alPicUrl
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.one-play-list-conatiner
  display flex
  height 50px
  .float-left
    line-height 50px
    width 10%
    text-align center
  .float-center
    display flex
    flex-direction column
    width 70%
    .music-name
      height 65%
      line-height 35px
      font-size 16px
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    .singer-name
      font-size 12px
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
</style>
