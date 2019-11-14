<template>
  <div class="one-play-list-conatiner">
    <div class="float-left">
      {{ index + 1 }}
    </div>
    <div class="float-left">
      <div class="music-name">{{ listArray.name }}</div>
      <div class="singer-name">{{ singer }}-{{ listArray.name }}</div>
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
      singer: ""
    };
  },
  methods: {
    getData() {
      let url = "http://localhost:3000/song/detail?ids=" + this.idnum;
      axios.get(url).then(res => {
        // this.listArray = res.data.data[0];
        // console.log(res.data.songs[0]);
        this.listArray = res.data.songs[0];
        this.singer = res.data.songs[0].ar[0].name;
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped></style>
