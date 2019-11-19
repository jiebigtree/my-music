<template>
  <div>
    <div v-for="(one, index) in songArray" :key="index">
      {{ one.name }}
    </div>
    <!-- <list :songArray="songArray"> </list> -->
  </div>
</template>
<script>
// import scroll from "@/components/publicComponents/scroll.vue";
import axios from "axios";
export default {
  name: "singer-songs",
  components: {
    // scroll
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      songArray: []
    };
  },
  methods: {
    getSingerMusic() {
      console.log("歌手单曲");
      let url = "http://localhost:3000/artists?id=" + this.id;
      axios.get(url).then(res => {
        // console.log(res.data.hotSongs);
        this.songArray = res.data.hotSongs;
      });
    }
  },
  mounted() {
    this.getSingerMusic();
  }
};
</script>
