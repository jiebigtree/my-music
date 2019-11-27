<template>
  <div class="one-song">
    <div @click="choose" class="line-container">
      <div class="left-con">
        <span class="index">{{ index + 1 }}</span>
      </div>
      <div class="center-con">
        <span class="song-name">{{ name }}</span>
        <span class="al-name">{{ alName }}</span>
      </div>
    </div>
  </div>
</template>
<script>
// import scroll from "@/components/publicComponents/scroll.vue";
import axios from "axios";
export default {
  name: "one-song",
  components: {
    // scroll
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ""
    },
    alName: {
      type: String,
      default: ""
    },
    picUrl: {
      type: String,
      default: ""
    },
    singerName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      url: ""
    };
  },
  methods: {
    choose() {
      this.$emit("choose", this.url, this.index);
    }
  },
  mounted() {
    let url = "http://localhost:3000/song/url?id=" + this.id;
    axios.get(url).then(res => {
      // console.log(res.data.data[0].url);
      this.url = res.data.data[0].url;
      this.$emit(
        "songslist",
        this.url,
        this.index,
        this.name,
        this.id,
        this.picUrl,
        this.singerName
      );
    });
  }
};
</script>
<style lang="stylus" scoped>
.one-song
  background-color white
  .line-container
    display flex
    .left-con
      line-height 40px
      width 10%
      text-align center
    .center-con
      margin-left 10px
      .song-name
        display block
        height 28px;
        line-height 28px
      .al-name
        display block
        height 15px
        line-height 15px
        font-size 12px
        color #999
</style>
