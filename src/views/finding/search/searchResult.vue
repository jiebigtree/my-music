<template>
  <div class="sear-result-container">
    <topHeader>
      <div slot="left-icon" @click="goBack()">
        <svg-icon iconClass="back" style="width:20px;height:20px"></svg-icon>
      </div>
      <div slot="center-search">
        <input type="text" :value="name" @click="goBack()" />
      </div>
      <div slot="right-icon" style="z-index:100"></div>
    </topHeader>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "search-result",
  data() {
    return {
      name: this.$route.params.name
    };
  },
  methods: {
    getData() {
      // let url = "http://localhost:3000/song/detail?ids=" + this.idnum;
      // axios.get(url).then(res => {
      // });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.top-header .slot-container .center-search input[data-v-1f8284bc]
  color black
</style>
