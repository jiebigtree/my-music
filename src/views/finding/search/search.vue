<template>
  <div class="sear-result-container">
    <topHeader>
      <div slot="left-icon" @click="goBack">
        <svg-icon iconClass="back" style="width:20px;height:20px"></svg-icon>
      </div>
      <div slot="center-search" v-show="!searchResult">
        <input
          type="text"
          :placeholder="searchKeyword"
          v-model="searchKeyword"
        />
      </div>
      <div slot="center-search" v-show="searchResult">
        <input type="text" :value="searchKeyword" @click="closeResult" />
      </div>
      <div slot="right-icon" style="z-index:100">
        <span style="font-size:14px" @click.stop="search" v-show="!searchResult"
          >搜索</span
        >
        <span
          style="font-size:14px"
          @click.stop="closeResult"
          v-show="searchResult"
          >取消</span
        >
      </div>
    </topHeader>
    <scroll>
      <div class="search-container" slot="list" v-show="!searchResult">
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
                <span style="color:red" class="icon" v-if="item.iconType == 1"
                  >HOT</span
                >
                <span style="color:green" class="icon" v-if="item.iconType == 2"
                  >NEW</span
                >
                <span style="color:red" class="icon" v-if="item.iconType == 5"
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
      <div v-show="searchResult"></div>
    </scroll>
  </div>
</template>

<script>
import axios from "axios";
import scroll from "../../../components/publicComponents/scroll.vue";
export default {
  name: "search",
  components: {
    scroll
  },
  data() {
    return {
      HistoryList: [],
      hotSearch: [],
      searchKeyword: "",
      searchResult: false
    };
  },
  methods: {
    getHotData() {
      axios.get("http://localhost:3000/search/hot/detail").then(res => {
        this.hotSearch = res.data.data;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    clickSearch(val) {
      this.searchKeyword = val;
      this.search();
      this.SearchVal(val);
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
      this.SearchVal(this.searchKeyword);
      this.searchResult = true;
      // this.$router.push({
      //   name: "search-result",
      //   params: {
      //     name: this.searchKeyword
      //   }
      // });
    },
    closeResult() {
      this.searchResult = false;
    }
  },
  created() {
    this.getHotData();
    this.searchKeyword = this.$route.params.value;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.top-header .slot-container .center-search input[data-v-1f8284bc]
  color black
.search-history
  // border: 1px solid red
  ul
    width: 100%
    display: flex
    justify-content space-around
  ul li
    background-color: rgb(248,248,248)
    border-radius: 15px
    height 30px
    span
      display: block
      margin: 2px 10px
      line-height: 30px
      font-size: 10px
      color: #666

.history-text
  line-height: 50px
  text-indent: 10px
  font-size: 18px
.hot-search
  li
    display: flex
    height 55px
    justify-content: space-around
  .hot-left
    width: 10%
    text-align: center
    line-height: 55px
  .hot-center
    width: 70%
    .hot-name,.icon
      display inline-block
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      line-height: 20px
      font-size: 18px
    .icon
      margin-left: 10px
    .hot-text
      display: block
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      font-size: 10px
      color: #ddd
      line-height: 20px
  .hot-right
    text-align: center
    line-height: 50px
    font-size: 10px
    color: #ddd
</style>
