<template>
  <div class="finding">
    <topHeader v-if="!searchBtn">
      <div slot="left-icon" @click="leftMenu()">
        <svg-icon
          iconClass="menu"
          style="fill:white;width:20px;height:20px"
        ></svg-icon>
      </div>
      <div slot="center-search">
        <input type="text" :placeholder="searchKeyword" @click="showKeyBoard" />
      </div>
      <svg-icon
        iconClass="playing"
        slot="right-icon"
        style="fill:white;width:20px;height:20px"
      ></svg-icon>
    </topHeader>
    <topHeader v-if="searchBtn">
      <div slot="left-icon" @click="closeSearch">
        <svg-icon iconClass="back" style="width:20px;height:20px"></svg-icon>
      </div>
      <div slot="center-search">
        <input
          type="text"
          :placeholder="searchKeyword"
          v-model="searchKeyword"
        />
      </div>
      <div slot="right-icon" @click.stop="search()" style="z-index:100">
        <span style="font-size:14px">搜索</span>
      </div>
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
            <span>推荐歌单</span>
            <span>歌单广场</span>
          </div>
          <div class="menus">
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
        </div>
        <div class="river-title">
          <span>新碟</span>
          <span>更多新碟</span>
        </div>
        <div class="dishes-container">
          <div class="one-dish" v-for="(one, index) in newDish" :key="index">
            <img :src="one.blurPicUrl" alt="" width="100%" />
            <span class="dash-name"> {{ one.name }} </span>
            <span class="singer-name"> {{ one.artist.name }} </span>
          </div>
        </div>
        <van-popup
          v-model="searchBtn"
          position="bottom"
          :style="{ width: '100%', height: '100%' }"
          :duration="duTime"
        >
          <div class="search-container">
            <div class="search-history">
              <p class="history-text">搜索历史</p>
              <ul>
                <li
                  v-for="(item, index) in HistoryList"
                  :key="index"
                  @click="clickSearch(item)"
                >
                  <span v-if="item">{{ item }}</span>
                </li>
              </ul>
            </div>
            <div class="hot-search">
              <p class="history-text">热搜榜</p>
              <ul>
                <li
                  v-for="(item, index) in hotSearch"
                  :key="index"
                  @click="clickSearch(item.searchWord)"
                >
                  <div class="hot-left">{{ index + 1 }}</div>
                  <div class="hot-center">
                    <span class="hot-name">{{ item.searchWord }}</span>
                    <span class="icon" v-if="item.iconType == 0"></span>
                    <span
                      style="color:red"
                      class="icon"
                      v-if="item.iconType == 1"
                      >HOT</span
                    >
                    <span
                      style="color:green"
                      class="icon"
                      v-if="item.iconType == 2"
                      >NEW</span
                    >
                    <span
                      style="color:red"
                      class="icon"
                      v-if="item.iconType == 5"
                      >↑</span
                    >
                    <span class="hot-text">{{ item.content }}</span>
                  </div>
                  <div class="hot-right">
                    {{ item.score }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </van-popup>
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
        { iconClass: "music", text: "每日推荐", pageName: "" },
        { iconClass: "radio", text: "歌单", pageName: "" },
        { iconClass: "cloud", text: "排行榜", pageName: "" },
        { iconClass: "mine", text: "电台", pageName: "" },
        { iconClass: "account", text: "直播", pageName: "" }
      ],
      newDish: [],
      searchBtn: false,
      duTime: 0.3,
      HistoryList: [],
      hotSearch: []
    };
  },
  beforeRouterLeave(to, from, next) {
    to.meta.keepAlive = false;
    next();
  },
  methods: {
    clickSearch(val) {
      this.searchKeyword = val;
      this.search();
    },
    getBannerPic() {
      axios.get("http://localhost:3000/banner?type=2").then(res => {
        this.banerPic = res.data.banners;
      });
    },
    getSongMenu() {
      axios.get("http://localhost:3000/personalized?limit=6").then(res => {
        this.songMenu = res.data.result;
        // console.log(this.songMenu);
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
        this.newDish = emptyArray.slice(0, 3);
        // console.log(this.newDish);
      });
    },
    showKeyBoard() {
      this.searchBtn = true;
      axios.get("http://localhost:3000/search/hot/detail").then(res => {
        console.log(res.data.data);
        this.hotSearch = res.data.data;
      });
      this.SearchVal(" ");
    },
    closeSearch() {
      this.searchBtn = false;
    },
    SearchVal(val) {
      val = val.trim(); // 清除空格
      if (this.HistoryList.length > 0) {
        // 有数据的话 判断
        if (this.HistoryList.indexOf(val) !== -1) {
          // 有相同的，先删除 再添加
          this.HistoryList.splice(this.HistoryList.indexOf(val), 1);
          this.HistoryList.unshift(val);
        } else {
          // 没有相同的 添加
          this.HistoryList.unshift(val);
        }
      } else {
        // 没有数据 添加
        this.HistoryList.unshift(val);
      }
      if (this.HistoryList.length > 3) {
        // 保留六个值
        this.HistoryList.pop();
      }
      localStorage.setItem("HistoryList", JSON.stringify(this.HistoryList));
    },
    search() {
      // console.log(this.searchKeyword);
      this.SearchVal(this.searchKeyword);
      this.$router.push({
        name: "search-result",
        params: {
          name: this.searchKeyword
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
        if (num > 99999999) {
          num = parseInt(num / 100000000) + "亿";
        } else {
          num = parseInt(num / 10000) + "万";
        }
      } else {
        return num;
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
