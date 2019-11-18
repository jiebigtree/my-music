<template>
  <div class="wrapper" ref="wrapper">
    <slot name="list">
      <ul>
        <li
          v-for="(item, index) in data"
          :key="index"
          @click="conso(item.id)"
          class="list-one"
        >
          <img :src="item.picUrl" alt="" class="singer-pic" />
          <span class="singer-name">{{ item.name }}</span>
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
  left: 0;
  bottom: 50px;
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
</style>
