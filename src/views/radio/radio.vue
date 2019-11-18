<template>
  <div>
    <topHeader>
      <input type="text" slot="center-search" />
      <svg-icon
        iconClass="playing"
        slot="right-icon"
        style="fill:white;width:20px;height:20px"
      ></svg-icon>
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
      pulldown: true
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      // requestData().then(res => {
      //   this.data = res.data.concat(this.data);
      // });
      axios.get("http://localhost:3000/personalized?limit=50").then(res => {
        this.data = [...res.data.result];
        console.log(this.data);
      });
    }
  }
};
</script>
