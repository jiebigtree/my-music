<template>
  <div>
    <div style="width:200px;height:200px;border:1px solid red">
      <div v-for="(one, index) in mvArray" :key="index">
        {{ one.name }}
      </div>
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
