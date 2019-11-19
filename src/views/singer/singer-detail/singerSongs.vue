<template>
  <div>
    <div>
      <ul class="items">
        <li v-for="(one, index) in songArray" :key="index" class="one-item">
          <span class="index">{{ index + 1 }}</span>
          <span class="name">{{ one.name }}</span>
        </li>
      </ul>
    </div>
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
        console.log(res.data.hotSongs);
        this.songArray = res.data.hotSongs;
      });
    }
  },
  mounted() {
    this.getSingerMusic();
  }
};
</script>
<style lang="stylus" scoped>
.items
  width 100%
  .one-item
    width 100%
    height 40px
    line-height 40px
    .index
      width 15%
      text-align center
      float left
    .name
      float left
      width 60%
      text-align left
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
</style>
