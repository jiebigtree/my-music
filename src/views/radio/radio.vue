<template>
  <div>
    <topHeader>
      <div slot="center-search">热门歌手</div>
      <div @click="chaneg" slot="right-icon">
        <svg-icon
          iconClass="playing"
          style="fill:white;width:20px;height:20px"
        ></svg-icon>
      </div>
    </topHeader>

    <scroll>
      <div
        v-for="(item, index) in data"
        :key="index"
        class="list-one"
        slot="list-info"
      >
        <img :src="item.picUrl" alt="" class="singer-pic" />
        <span class="singer-name">{{ item.name }}</span>
        <button
          @click="getSingerMV(item.id)"
          style="float:right;width:50px;font-size:10px"
        >
          歌手MV
        </button>
        <button
          @click="getSingerMusic(item.id)"
          style="float:right;width:50px;font-size:10px"
        >
          歌手歌曲
        </button>
      </div>
    </scroll>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import scroll from "../../components/publicComponents/scroll.vue";
import axios from "axios";
export default {
  components: {
    scroll
  },
  data() {
    return {
      data: [],
      pulldown: true,
      pageNum: 0
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let url =
        "http://localhost:3000/top/artists?offset=" +
        this.pageNum +
        "&limit=30";
      axios.get(url).then(res => {
        this.data = [...this.data, ...res.data.artists];
        console.log(this.data);
      });
    },
    chaneg() {
      console.log(this.pageNum);
      this.pageNum++;
      this.loadData();
    },
    getSingerMV(id) {
      console.log("歌手MV");
      let url = "http://localhost:3000/artist/mv?id=" + id;
      axios.get(url).then(res => {
        console.log(res.data);
      });
    },
    getSingerMusic(id) {
      console.log("歌手单曲");
      let url = "http://localhost:3000/artists?id=" + id;
      axios.get(url).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>
