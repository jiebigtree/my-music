<template>
  <div id="app">
    <router-view></router-view>
    <tab></tab>
  </div>
</template>
<script>
import axios from 'axios'
import Tab from "./components/tab/tab.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  created() {},
  components: {
    Tab
  },
  created(){
      axios.get('http://localhost:3000/login/cellphone?phone=18846914587&password=netmusic4587').then(res => {
        console.log(res.data.playlist)
        this.allData = res.data.playlist
      })
    
  }
};
</script>

<style lang="stylus">
#app
    width 100%
    height 100%
    background-color $bgc
</style>
