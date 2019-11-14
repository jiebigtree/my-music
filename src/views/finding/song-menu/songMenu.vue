<template>
  <div class="song-menu">
    <topHeader>
      <div slot="left-icon" @click="goBack">
        <svg-icon
          iconClass="menu"
          style="fill:white;width:20px;height:20px"
        ></svg-icon>
      </div>
      <div slot="center-search">歌单</div>
      <svg-icon
        iconClass="playing"
        slot="right-icon"
        style="fill:white;width:20px;height:20px"
      ></svg-icon>
    </topHeader>
    <van-search
      placeholder="搜索歌单内歌曲"
      shape="round"
      :show-action="false"
    />
    <div class="song-menu-header">
      <div class="menu-pic">
        <img :src="menuDetail.playlist.coverImgUrl" alt="" width="100%" />
      </div>
      <div class="menu-description">
        <h1>{{ menuDetail.playlist.name }}</h1>
        <div class="editor-infor">
          <img
            :src="menuDetail.playlist.creator.avatarUrl"
            alt=""
            width="30px"
            class="head-pic"
          />
          <span class="editor">{{ menuDetail.playlist.creator.nickname }}</span>
          <svg-icon
            iconClass="menu"
            style="fill:white;width:15px;height:15px"
          ></svg-icon>
        </div>
        <span class="list-description">{{
          menuDetail.playlist.description
        }}</span>
      </div>
    </div>
    <div class="operate">
      <div>
        <svg-icon
          iconClass="menu"
          style="fill:white;width:20px;height:20px"
        ></svg-icon>
        <span>206</span>
      </div>
      <div>
        <svg-icon
          iconClass="menu"
          style="fill:white;width:20px;height:20px"
        ></svg-icon>
        <span>206</span>
      </div>
      <div>
        <svg-icon
          iconClass="menu"
          style="fill:white;width:20px;height:20px"
        ></svg-icon>
        <span>206</span>
      </div>
    </div>
    <div class="play-list-conatiner">
      <div class="play-list">
        <ul>
          <li v-for="(one, index) in menuDetail.privileges" :key="index">
            <play-list :idnum="one.id" :index="index"></play-list>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import playList from "./playList";
export default {
  name: "song-menu",
  data() {
    return {
      menuDetail: {}
    };
  },
  methods: {
    getMenuData() {
      let url =
        "http://localhost:3000/playlist/detail?id=" + this.$route.params.id;
      axios.get(url).then(res => {
        console.log(res.data);
        this.menuDetail = res.data;
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getMenuData();
  },
  components: {
    playList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "../../../assets/stylus/common.styl"
@import "../../../assets/stylus/songMenu.styl"
</style>
