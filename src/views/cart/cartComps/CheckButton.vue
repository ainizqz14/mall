<template>
  <div class="check-button" :class="{check:isCheck}" >
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      }
  },
  props:{
isCheck:{
  type:Boolean,
  default(){
    return false
  }
}
  },
  methods: {

  }
}
</script>

<style scoped>
.check-button{
  /* background-color: red;
   */
   border: 2px solid #aaa;
   border-radius: 50%;
}
.check{
  background-color: red;
   border: 2px solid red;

}
</style>
