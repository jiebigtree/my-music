<template>
  <div>
    <div v-if="mvArray.length > 0">
      <ul class="items">
        <li v-for="(one, index) in mvArray" :key="index" class="one-item">
          <span class="index">{{ index + 1 }}</span>
          <span class="name">{{ one.name }}</span>
        </li>
      </ul>
    </div>
    <div v-else>
      这个歌手没有MV哦
    </div>
  </div>
</template>
<script>
// import scroll from "@/components/publicComponents/scroll.vue";
import axios from "axios";
export default {
  name: "singer-mvs",
  components: {
    // scroll
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      mvArray: []
    };
  },
  methods: {
    getSingerMV() {
      console.log("歌手MV");
      let url = "http://localhost:3000/artist/mv?id=" + this.id;
      axios.get(url).then(res => {
        // console.log(res.data.mvs);
        this.mvArray = res.data.mvs;
      });
    }
  },
  mounted() {
    this.getSingerMV();
  }
};
</script>
<style lang="stylus" scoped>
.items
  width 100%
  .one-item
    width 100%
    height 45px
    line-height 45px
    background-color white
    border-bottom 1px solid #eee
    .index
      width 15%
      text-align center
      float left
    .name
      float left
      width 60%
      text-align left
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
</style>
