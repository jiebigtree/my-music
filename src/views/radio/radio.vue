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

    <scroll :data="data"> </scroll>
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
    }
  }
};
</script>
