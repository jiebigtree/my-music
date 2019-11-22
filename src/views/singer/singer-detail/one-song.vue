<template>
  <div class="one-song">
    <div @click="choose">
      <span>{{ index + 1 }}</span
      ><span>{{ name }}</span>
      <span>{{ alName }}</span>
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
<style lang="stylus" scoped></style>
