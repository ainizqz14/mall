<template>
<div > 
  <div class="toast" v-show="isShow">
    {{mes}}
  </div>
  </div>
 
</template>

<script>
export default {
  data () {
    return {
      mes:'',
      isShow:false
    }
  },
  methods: {
    show (msg , duration = 2000) {
      this.isShow = true
      this.mes = msg
      setTimeout(() => {
        this.isShow = false
        this.msg = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  transform: translate(50%, 50%);
  z-index: 999;
  right: 50%;
  /* left: 50%; */
  top: 50%;
  padding: 8px 10px;
  background-color:rgba(0, 0, 0, .7);
  color: white;
  border-radius: 6px;
}
</style>
