<template>
  <div class="wrapper" ref="wrapper" :class="{ nofooter: nofooter }">
    <slot name="list">
      <ul>
        <li>
          <slot name="list-info"> </slot>
        </li>
      </ul>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  props: {
    data: {
      type: Array,
      default: null,
      scroll:''
    },
    nofooter:{
      type:Boolean,
      default:false
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
}
</script>

<style lang="stylus" scoped>

.wrapper
  overflow: hidden;
  position: absolute;
  top: 60px;
  bottom 40px
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
  top: 60px;
  left: 0;
  right: 0;
  bottom 0
</style>
