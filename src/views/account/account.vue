<template>
  <div class="new-music">
    我的账户
    手机号：<input type="text" v-model="phone"><br>
    密码：<input type="text" v-model="psw">
    <button @click="logIn">login</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'radio',
  data () {
    return {
      allDatas: [],
      phone: '',
      psw: ''
    }
  },
  methods: {
    logIn () {
      let url = 'http://localhost:3000/login/cellphone?phone=' + this.phone + '&password=' + this.psw
      axios.get(url).then(res => {
        console.log(res.data)
      })
    },
    getMyInfor () {
      axios.get('http://localhost:3000/user/detail?uid=1786358465').then(res => {
        console.log(res.data)
      })
    }
  },
  created () {
    // this.logIn()
    // this.getMyInfor()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>
