<template>
  <div class="finding">
    <topHeader>
      <div slot="left-icon">
        <svg-icon
          iconClass="menu"
          style="fill:white;width:20px;height:20px"
        ></svg-icon>
      </div>
      <div slot="center-search">
        <input type="text" :placeholder="searchKeyword" @click="toSearch" />
      </div>
      <svg-icon
        iconClass="playing"
        slot="right-icon"
        style="fill:white;width:20px;height:20px"
      ></svg-icon>
    </topHeader>
    <scroll>
      <div slot="list">
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
        <div class="song-menu-containerb">
          <div class="river-title">
            <span @click="showsongList" :class="{ isNow: songList }"
              >推荐歌单</span
            >
            <span @click="showdishList" :class="{ isNow: dishList }">新碟</span>
            <span v-show="songList">歌单广场</span>
            <span v-show="dishList">更多新碟</span>
          </div>
          <transition name="slide-left">
            <div class="menus" v-show="songList">
              <div
                class="one-menu"
                v-for="(one, index) in songMenu"
                :key="index"
                @click="getSongMenuDetail(one.id)"
              >
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
          </transition>
          <transition name="slide-left">
            <div class="menus" v-show="dishList">
              <div
                class="one-menu"
                v-for="(one, index) in newDish"
                :key="index"
              >
                <img :src="one.blurPicUrl" alt="" />
                <span class="dish-name">{{ one.name }}</span>
                <span class="singer-name"> {{ one.artist.name }} </span>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "../../components/publicComponents/scroll.vue";
import axios from "axios";

export default {
  components: {
    scroll
  },
  name: "finding",
  data() {
    return {
      banerPic: [],
      songMenu: [],
      searchKeyword: "",
      list: [
        { iconClass: "introduce", text: "每日推荐", pageName: "" },
        { iconClass: "musicMenu", text: "歌单", pageName: "" },
        { iconClass: "paihangbang", text: "排行榜", pageName: "" },
        { iconClass: "diantai", text: "电台", pageName: "" },
        { iconClass: "live", text: "直播", pageName: "" }
      ],
      newDish: [],
      songList: true,
      dishList: false
    };
  },
  beforeRouterLeave(to, from, next) {
    to.meta.keepAlive = false;
    next();
  },
  methods: {
    showsongList() {
      this.songList = true;
      this.dishList = false;
    },
    showdishList() {
      this.songList = false;
      this.dishList = true;
    },
    getBannerPic() {
      axios.get("http://localhost:3000/banner?type=2").then(res => {
        this.banerPic = res.data.banners;
      });
    },
    getSongMenu() {
      axios.get("http://localhost:3000/personalized?limit=6").then(res => {
        this.songMenu = res.data.result;
        console.log(this.songMenu);
      });
    },
    getSongMenuDetail(id) {
      this.$router.push({
        name: "song-menu",
        params: {
          id: id
        }
      });
    },
    getSearchKeyword() {
      axios.get("http://localhost:3000/search/default").then(res => {
        this.searchKeyword = res.data.data.realkeyword;
      });
    },
    getNewDishes() {
      axios.get("http://localhost:3000/album/newest").then(res => {
        let emptyArray = [];
        // console.log(res.data.albums);
        emptyArray = res.data.albums;
        this.newDish = emptyArray.slice(0, 6);
        // console.log(this.newDish);
      });
    },
    toSearch() {
      this.$router.push({
        name: "search",
        params: {
          value: this.searchKeyword
        }
      });
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
        if (num > 99999999) num = parseInt(num / 100000000) + "亿";
        else num = parseInt(num / 10000) + "万";
      } else return num;
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
