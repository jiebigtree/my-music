<template>
  <div class="playing">
    <audio :src="playUrl" controls=""></audio>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "playing",
  data() {
    return {
      songId: this.$route.params.songId,
      playUrl: ""
    };
  },
  methods: {
    getSongUrl() {
      let url =
        "http://localhost:3000/song/url?id=" + this.$route.params.songId;
      axios.get(url).then(res => {
        // console.log(res.data.data[0].url);
        this.playUrl = res.data.data[0].url;
      });
    }
  },
  created() {
    this.getSongUrl();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped></style>
