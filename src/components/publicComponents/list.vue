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
              <div class="more">
                <svg-icon
                  iconClass="cloud"
                  style="width:20px;height:20px;"
                ></svg-icon>
              </div>
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
            {bigName:'比较幸福比较幸福比较幸福比较幸福比较幸福比较幸福比较幸福',detailOne:'董又霖',detailTwo:'比较幸福'},
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
        clear both
        .index,.name-container
            float left
            margin-left 20px
        .index
            margin-left 10px
            line-height 50px
            font-size 18px
            width 5%
            text-align center
        .more
            float right
            line-height 50px
            width 10%
            text-align center
        .name-container
            width 65%
            .name-one
                height 30px
                line-height 30px
                font-size 20px
            .name-two
                display inline-block
                height 20px
                line-height 20px
                font-size 10px
                color #666
                width 100%
            .name-two,.name-one
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
</style>
