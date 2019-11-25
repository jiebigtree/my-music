<template>
  <div class="progress-container" ref="progressBar">
        <div class="progress" ref="progress"></div>
        <div class="dot" ref="progressBtn"></div>
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
          if(newPercent >= 0){
              const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
              const offsetWidth = newPercent * barWidth
              this.$refs.progress.style.width = `${offsetWidth}px`
              this.$refs.progressBtn.style.left =  `${offsetWidth}px`
          }
      }
  },
  data() {
    return {

    };
  },
  methods: {},
  created() {}
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
