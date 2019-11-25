<template>
  <div class="progress-container" ref="progressBar" @click="progressClick">
        <div class="progress" ref="progress"></div>
        <div class="dot" ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
        ></div>
    </div>
</template>

<script>
const progressBtnWidth = 10
export default {
  name: "progresser",
  props:{
      percent:{
          type:Number,
          default:0
      }
  },
  watch:{
      percent(newPercent){
          if(newPercent >= 0 && !this.touch.initiated){
              const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
              const offsetWidth = newPercent * barWidth
              this._offset(offsetWidth)
          }
      }
  },
  data() {
    return {

    };
  },
  methods: {
      progressTouchStart(e){
          this.touch.initiated = true
          this.touch.startX = e.touches[0].pageX
          this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e){
          if(!this.touch.initiated){
              return
          }
          const delaX = e.touches[0].pageX - this.touch.startX
          const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,this.touch.left + delaX))
          this._offset(offsetWidth)
      },
      progressTouchEnd(e){
          this.touch.initiated = false
          this.changePercent()
      },
      progressClick(e){
          this._offset(e.offsetX)
          this.changePercent()
      },
      _offset(offsetWidth){
           this.$refs.progress.style.width = `${offsetWidth}px`
           this.$refs.progressBtn.style.left =  `${offsetWidth}px`
      },
      changePercent(){
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const percent = this.$refs.progress.clientWidth / barWidth
          this.$emit('percentChange',percent)
      }
  },
  created() {
      this.touch = {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.progress-container
    width 100%
    height 4px
    border 1px solid rgba(100,100,100,.4)
    border-radius:4px
    position relative
    .dot
        width 10px
        height 10px
        background-color rgba(150,150,150,1)
        position absolute
        top 50%
        margin-top -5px
        border-radius 50%
    .progress
        background-color rgba(100,100,100,.4)
        height 4px
</style>
