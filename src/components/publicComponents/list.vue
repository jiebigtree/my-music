<template>
  <div class="list-big-container">
    <scroll :nofooter="true">
      <div class="list-container" slot="list">
        <slot name="song-list">
          <ul>
            <li v-for="(one, index) in listArray" :key="index" class="one-song">
              <div class="index">{{ index + 1 }}</div>
              <div class="name-container">
                <h1 class="name-one">{{ one.bigName }}</h1>
                <span class="name-two"
                  >{{ one.detailOne }}-{{ one.detailTwo }}</span
                >
              </div>
              <div class="more">.</div>
            </li>
          </ul>
        </slot>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import scroll from "@/components/publicComponents/scroll.vue";
export default {
  name:'list',
  components:{
      scroll
  },
  props: {
  },
  data(){
      return{
        listArray:[
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
            {bigName:'比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'}
        ]
      }
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style lang="stylus" scoped>
.list-big-container
    .one-song
        height 50px
        .index,.name-container
            float left
        .more
            float right
</style>
