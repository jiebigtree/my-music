<template>
  <div class="finding">
    <topHeader>
      <div slot="left-icon" @click="leftMenu()">
        <svg-icon
          iconClass="menu"
          style="fill:white;width:20px;height:20px"
        ></svg-icon>
      </div>

      <input type="text" slot="center-search" :placeholder="searchKeyword" />
      <svg-icon
        iconClass="playing"
        slot="right-icon"
        style="fill:white;width:20px;height:20px"
      ></svg-icon>
    </topHeader>
    <div class="banner-container">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in banerPic" :key="index">
          <img :src="item.pic" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="list-container">
      <div class="one-list" v-for="(one, index) in list" :key="index">
        <div class="svg-container">
          <svg-icon
            :iconClass="one.iconClass"
            style="fill:white;width:20px;height:20px"
          ></svg-icon>
        </div>
        <span class="list-text">{{ one.text }}</span>
      </div>
    </div>
    <hr style="background-color:#799d67" />
    <div class="song-menu-containerb">
      <div class="river-title">
        <span>推荐歌单</span>
        <span>歌单广场</span>
      </div>
      <div class="menus">
        <div class="one-menu" v-for="(one, index) in songMenu" :key="index">
          <div class="play-count">
            <svg-icon
              iconClass="bofang"
              style="fill:white;width:15px;height:15px"
            ></svg-icon>
            <span class="play-num">{{ one.playCount | numFilter }}</span>
          </div>
          <img :src="one.picUrl" alt="" />
          <span class="one-name">{{ one.name }}</span>
        </div>
      </div>
    </div>
    <van-popup
      v-model="show"
      position="left"
      :style="{ width: '45%', height: '100%' }"
    >
      <ul class="ul">
        <li>aa</li>
        <li>aa</li>
        <li>cc</li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "finding",
  data() {
    return {
      banerPic: [],
      songMenu: [],
      searchKeyword: "",
      list: [
        { iconClass: "music", text: "每日推荐", pageName: "" },
        { iconClass: "radio", text: "歌单", pageName: "" },
        { iconClass: "cloud", text: "排行榜", pageName: "" },
        { iconClass: "mine", text: "电台", pageName: "" },
        { iconClass: "account", text: "直播", pageName: "" }
      ],
      show: false
    };
  },
  methods: {
    getBannerPic() {
      axios.get("http://localhost:3000/banner?type=2").then(res => {
        this.banerPic = res.data.banners;
      });
    },
    showDialog() {
      this.$createDialog({
        type: "alert",
        title: "Alert",
        content: "dialog content"
      }).show();
    },
    getSongMenu() {
      axios.get("http://localhost:3000/personalized?limit=6").then(res => {
        this.songMenu = res.data.result;
      });
    },
    getSearchKeyword() {
      axios.get("http://localhost:3000/search/default").then(res => {
        this.searchKeyword = res.data.data.realkeyword;
      });
    },
    getNewDishes() {
      axios.get("http://localhost:3000/album/newest").then(res => {
        console.log(res.data);
      });
    },
    leftMenu() {
      this.show = !this.show;
    }
  },
  created() {
    this.getBannerPic();
    this.getSongMenu();
    this.getSearchKeyword();
    this.getNewDishes();
  },
  mounted() {},
  filters: {
    numFilter(num) {
      if (num > 9999) {
        if (num > 99999999) {
          num = parseInt(num / 100000000) + "亿";
        } else {
          num = parseInt(num / 10000) + "万";
        }
      }
      return num;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "../../assets/stylus/common.styl"
@import "../../assets/stylus/finding.styl"
</style>
