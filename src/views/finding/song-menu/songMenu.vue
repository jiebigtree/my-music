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
    <scroll>
      <div slot="list">
        <van-search
          placeholder="搜索歌单内歌曲"
          shape="round"
          :show-action="false"
        />
        <div class="song-menu-header">
          <div class="menu-pic">
            <img :src="coverImgUrl" alt="" width="100%" />
          </div>
          <div class="menu-description">
            <h1>{{ name }}</h1>
            <div class="editor-infor">
              <img :src="avatarUrl" alt="" width="30px" class="head-pic" />
              <span class="editor">{{ nickname }}</span>
              <!-- <svg-icon iconClass="menu" style="width:15px;height:15px"></svg-icon> -->
            </div>
            <span class="list-description">{{ description }}</span>
          </div>
        </div>
        <div class="operate">
          <!-- <div>
            <svg-icon
              iconClass="menu"
              style="width:20px;height:20px"
            ></svg-icon>
            <span>206</span>
          </div>
          <div>
            <svg-icon
              iconClass="menu"
              style="width:20px;height:20px"
            ></svg-icon>
            <span>206</span>
          </div>
          <div>
            <svg-icon
              iconClass="menu"
              style="fill:white;width:20px;height:20px"
            ></svg-icon>
            <span>206</span>
          </div> -->
        </div>
        <div class="play-list-conatiner">
          <div class="play-list">
            <ul class="play-list-ul">
              <li v-for="(one, index) in menuDetail.privileges" :key="index">
                <play-list :idnum="one.id" :index="index"></play-list>
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
      description: ""
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
