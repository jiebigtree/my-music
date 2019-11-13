<template>
  <div class="finding">
    <topHeader>
      <input type="text" slot="center-search" :placeholder="searchKeyword" />
    </topHeader>
    <div class="banner-container">
      <cube-slide ref="slide" :data="banerPic" :interval="3000">
        <cube-slide-item v-for="(item, index) in banerPic" :key="index">
          <!-- <a :href="item.url"> -->
          <img :src="item.pic" width="100%" />
          <!-- </a> -->
        </cube-slide-item>
        <template slot="dots" slot-scope="props">
          <span
            class="my-dot"
            :class="{ active: props.current === index }"
            v-for="(item, index) in props.dots"
            :key="index"
            >{{ index + 1 }}</span
          >
        </template>
      </cube-slide>
    </div>
    <div class="song-menu-containerb">
      <div class="river-title">
        <span>推荐歌单</span>
        <span>歌单广场</span>
      </div>
      <div class="menus">
        <div class="one-menu" v-for="(one, index) in songMenu" :key="index">
          <div>
            <svg-icon iconClass="bofang"></svg-icon>
            <span>{{ one.playCount | numFilter }}</span>
          </div>
          <img :src="one.picUrl" alt="" />
          <span>{{ one.name }}</span>
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
        console.log(res.data.result);
        this.songMenu = res.data.result;
      });
    },
    getSearchKeyword() {
      axios.get("http://localhost:3000/search/default").then(res => {
        // console.log(res.data.data);
        this.searchKeyword = res.data.data.realkeyword;
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
    .my-dot
      width 8px
      height 8px
      border-radius 50%
  .menus
    display flex
    flex-wrap wrap
    justify-content space-around
    .one-menu
      width 30%
      border-radius 5px
      img
        width 100%
        border-radius 5px
      span
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
</style>
