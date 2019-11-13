<template>
  <div class="new-music">
    我的
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: "mine",
  data() {
    return {
      allData: []
    };
  },
  methods: {
    getMyInfor() {
      // axios.get('http://localhost:3000/user/playlist?uid=1786358465').then(res => {
      //   console.log(res.data.playlist)
      //   this.allData = res.data.playlist
      // })
    }
  },
  created() {
    // this.getMyInfor()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped></style>
