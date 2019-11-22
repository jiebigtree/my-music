<template>
  <div>
    <div>
      <ul class="items">
        <li v-for="(one, index) in songArray" :key="index" class="one-item">
          <!-- <span class="index">{{ index + 1 }}</span>
          <span class="name">{{ one.name }}</span> -->
          <song
            :id="one.id"
            :index="index"
            :name="one.name"
            @songslist="songslist"
            @choose="choose"
            :alName="one.al.name"
            :picUrl="one.al.picUrl"
            :singerName="one.ar[0].name"
          ></song>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import scroll from "@/components/publicComponents/scroll.vue";
import axios from "axios";
import song from "./one-song";
import { mapActions } from "vuex";

export default {
  name: "singer-songs",
  components: {
    // scroll
    song
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      songArray: [],
      list: []
    };
  },
  methods: {
    getSingerMusic() {
      // console.log("歌手单曲");
      let url = "http://localhost:3000/artists?id=" + this.id;
      axios.get(url).then(res => {
        console.log(res.data.hotSongs);
        this.songArray = res.data.hotSongs;
      });
    },
    ...mapActions(["selectPlay"]),
    choose(song, index) {
      // console.log(this.list[index].url);
      this.selectPlay({
        list: this.list,
        index: index
      });
    },
    songslist(url, i, songName, id, pic, singer) {
      // console.log(url);
      this.list[i] = {
        url: url,
        songName: songName,
        id: id,
        pic: pic,
        singer: singer
      };
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
