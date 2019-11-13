<template>
  <div class="finding">
    <topHeader>
      <svg-icon
        iconClass="menu"
        slot="left-icon"
        style="fill:white;width:20px;height:20px"
      ></svg-icon>
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
      searchKeyword: ""
    };
  },
  methods: {
    getBannerPic() {
      axios.get("http://localhost:3000/banner?type=2").then(res => {
        // console.log(res.data.banners);
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
        // console.log(res.data.result);
        this.songMenu = res.data.result;
      });
    },
    getSearchKeyword() {
      axios.get("http://localhost:3000/search/default").then(res => {
        // console.log(res.data.data);
        this.searchKeyword = res.data.data.realkeyword;
      });
    },
    getNewDishes() {
      axios.get("http://localhost:3000/album/newest").then(res => {
        console.log(res.data);
      });
    }
  },
  created() {
    // axios
    // .get(
    // "http://localhost:3000/login/cellphone?phone=18846914587&password=netmusic4587"
    // )
    // .then(res => {
    // console.log(res.data)
    // });
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
.finding
  width 100%
  height 100%
  background-color $bgc
  .banner-container
    width 90%
    margin 10px auto
    border-radius 10px
    overflow hidden
  .menus
    display flex
    flex-wrap wrap
    justify-content space-around
    .one-menu
      position relative
      width 30%
      border-radius 5px
      margin 5px 0
      img
        width 100%
        border-radius 5px
      .one-name
        width 100%
        display inline-block
        color $fontColor
        font-size 10px
        line-height 15px
        overflow: hidden ;
        display: -webkit-box ;
        -webkit-line-clamp: 2 ;
        -webkit-box-orient: vertical ;
        word-break: break-all ;
        height 30px
        margin-top 2px
  .river-title
    width 100%
    height 50px
    color $fontColor
    line-height 50px
    span:first-child
      font-weight 900
      font-size 20px
      float left
      margin-left 5px
    span:last-child
      float right
      font-size 12px
      margin-right 5px
  .play-count
    position absolute
    right 5px
    text-shadow 2px 2px 2px black
    top 0
    text-align right
    font-size 10px
    height 20px
    line-height 20px
    .play-num
      margin-left 4px
      color white
</style>
