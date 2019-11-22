<template>
  <div class="scroll-container">
    <div
      class="bg-blur"
      :style="{
        backgroundImage: 'url(' + coverImgUrl + ')',
        backgroundSize: 'contain'
      }"
      v-if="coverImgUrl"
    ></div>
    <div
      class="bg-blur"
      :style="{
        backgroundImage: 'url(' + pic + ')',
        backgroundSize: 'cover'
      }"
      v-if="pic"
    ></div>
    <div class="wrapper" ref="wrapper" :class="{ nofooter: nofooter }">
      <div>
        <slot name="singer-list">
          <ul>
            <li>
              <slot name="list-info"> </slot>
            </li>
          </ul>
        </slot>
        <slot name="list"></slot>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {mapGetters} from 'vuex'
export default {
  props: {
    data: {
      type: Array,
      default: null,
    },
    nofooter:{
      type:Boolean,
      default:false
    },
    coverImgUrl:{
      type:String,
      default:''
    },
    pic:{
      type:String,
      default:''
    }
  },
  data(){
    return{
      scroll:''
    }
  },
  mounted() {
    this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.wrapper,{click:true});
      this.scroll = new BScroll(this.$refs.wrapper,{
        scrollY: true,
        click: true,
        probeType:3
})
    });
  },
  methods: {
      conso(i){
          console.log(i)
      }
  },
    computed: {
    ...mapGetters([
      "fullScreen",
      "playList",
      "currentSong",
      "playList",
      "currentIndex",
      "playing"
    ])
  },
}
</script>

<style lang="stylus" scoped>
.bg-blur
  width: 100%
  height 100%
  position fixed
  top:0
  left 0
  background-size: 100%
  background-position: center center
  filter: blur(15px);
  // background-color rgba(0,0,0,1)
  z-index: -2
  opacity 0.4
.wrapper
  overflow: hidden;
  position: absolute;
  top: 50px;
  bottom 50px
  left: 0;
  right: 0;
  .list-one
      border-bottom:1px solid rgba(200,200,200,.4)
      vertical-align middle
      height 60px
      .singer-pic
          height 50px
          border-radius:5px
          float left
          margin-top:5px
          margin-left 10px
      .singer-name
          float left
          margin-left:20px
          line-height 60px
.nofooter
  overflow: hidden;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom 0
</style>
