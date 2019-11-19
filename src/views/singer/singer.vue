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
        slot="singer-list"
        @click="getSingerDetail(item.id, item.picUrl, item.name)"
      >
        <img :src="item.picUrl" alt="" class="singer-pic" />
        <span class="singer-name">{{ item.name }}</span>
      </div>
    </scroll>
  </div>
</template>
<script>
import scroll from "@/components/publicComponents/scroll.vue";
import axios from "axios";
export default {
  name: "singer",
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
    getSingerDetail(id, pic, name) {
      this.$router.push({
        name: "singer-detail",
        params: {
          singerId: id,
          singerPic: pic,
          singerName: name
        }
      });
    }
  }
};
</script>
