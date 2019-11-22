<template>
  <div class="song-menu">
    <topHeader>
      <div slot="center-search">歌单</div>
      <svg-icon
        iconClass="playing"
        slot="right-icon"
        style="fill:white;width:20px;height:20px"
      ></svg-icon>
    </topHeader>

    <scroll :coverImgUrl="coverImgUrl">
      <div slot="list">
        <van-search
          placeholder="搜索歌单内歌曲"
          shape="round"
          :show-action="false"
        />
        <div class="song-menu-header">
          <div class="bg-blur"></div>
          <div class="menu-pic">
            <img :src="coverImgUrl" alt="" width="100%" />
          </div>
          <div class="menu-description">
            <h1 class="title">{{ name }}</h1>
            <div class="editor-infor">
              <img :src="avatarUrl" alt="" width="30px" class="head-pic" />
              <span class="editor">{{ nickname }}</span>
            </div>
            <span class="list-description">{{ description }}</span>
          </div>
        </div>
        <div class="play-list-conatiner">
          <div class="play-list">
            <ul class="play-list-ul">
              <li v-for="(one, index) in menuDetail.privileges" :key="one.id">
                <play-list
                  :idnum="one.id"
                  :index="index"
                  @select="select"
                  @songsList="songslist"
                ></play-list>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "../../../components/publicComponents/scroll.vue";
import axios from "axios";
import playList from "./playList";
import { mapActions } from "vuex";
export default {
  name: "song-menu",
  data() {
    return {
      menuDetail: {},
      coverImgUrl: "",
      name: "",
      avatarUrl: "",
      creator: "",
      nickname: "",
      description: "",
      list: [],
      style: `background-image: url(${this.coverImgUrl})`
    };
  },
  methods: {
    getMenuData() {
      let url =
        "http://localhost:3000/playlist/detail?id=" + this.$route.params.id;
      axios.get(url).then(res => {
        // console.log(res.data);
        this.menuDetail = res.data;
        this.coverImgUrl = this.menuDetail.playlist.coverImgUrl;
        this.name = this.menuDetail.playlist.name;
        this.creator = this.menuDetail.playlist.creator;
        this.avatarUrl = this.menuDetail.playlist.creator.avatarUrl;
        this.nickname = this.menuDetail.playlist.creator.nickname;
        this.description = this.menuDetail.playlist.description;
      });
    },
    ...mapActions(["selectPlay"]),
    select(song, index) {
      console.log(this.list[index].url);
      this.selectPlay({
        list: this.list,
        index: index
      });
    },
    songslist(url, i, pic, singer, id, songName) {
      this.list[i] = {
        url: url,
        pic: pic,
        singer: singer,
        id: id,
        songName: songName
      };
    }
  },
  created() {
    this.getMenuData();
  },
  components: {
    playList,
    scroll
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "../../../assets/stylus/common.styl"
@import "../../../assets/stylus/songMenu.styl"
</style>
