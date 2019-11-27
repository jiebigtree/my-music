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
      <div ref="content">
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
    },
    loading:{
      type:Boolean,
      default:false
    },
    tabFix:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:'',
      scrollY:'',
      isScroll:false,
      timeoutflag : null,
      scrollFalse:''
    }
  },
  mounted() {
    setTimeout(()=>{
      this.initScroll()
    },600)
  },
  methods: {
      initScroll(){
        this.listScroll = new BScroll(this.$refs.wrapper,{
          probeType: 3,
          scrollY: true,
          click: true,
          useTransition:false,  // 防止iphone微信滑动卡顿
          bounce:true,
          momentumLimitDistance: 5
        });
        this.listScroll.on('scroll', (pos) => {
          // console.log(this.scrollY)

          // console.log(this.$refs.content.offsetHeight - this.$refs.wrapper.offsetHeight )
          // const tops = this.$refs.wrapper.offsetTop;
          // 使用abs绝对值（否则 pos.y拿到值是负数）
          this.scrollFalse = Math.round(pos.y)
          this.scrollY = Math.abs(Math.round(pos.y));

          // if(this.scrollY >= tops) {
          //     this.isScroll = true;
          // }else {
          //     this.isScroll = false;
          // }
          if(this.loading){
            const jz = this.$refs.content.offsetHeight - this.$refs.wrapper.offsetHeight
            if(this.scrollY >= jz){
              let that = this
              if(this.timeoutflag != null){
                clearTimeout(this.timeoutflag);
              }
                this.timeoutflag=setTimeout(function(){
                  // console.log('loading')
                  that.$emit('load')
                },200);
          }
          }
          if(this.tabFix){
            if(this.scrollFalse>0&&this.scrollFalse<20){
              this.$emit('big',this.scrollFalse)
            }else{
              if(this.scrollY >= 200){
                this.$emit('fixer',true)
              }else{
                this.$emit('fixer',false)
              }
            }
          }

          })
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
