<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.back-top{
  
  position: fixed;
  right: 20px;
  bottom: 60px;
  z-index: 9;

}
.back-top img{
  width: 40px;
}
</style>
