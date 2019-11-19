<template>
  <div class="playing" @click="alertaa">
    <!-- <topHeader>
      <div slot="center-search">歌单</div>
      <svg-icon
        iconClass="playing"
        slot="right-icon"
        style="fill:white;width:20px;height:20px"
      ></svg-icon>
    </topHeader>
    <audio :src="playUrl" controls=""></audio>
    <img class="playing-bg" :src="songPic" alt="" />
    {{ playUrl }} -->
    aa
  </div>
</template>

<script>
// import axios from "axios";
import { mapGetters } from "vuex";
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
    alertaa() {
      alert(1);
    }
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
