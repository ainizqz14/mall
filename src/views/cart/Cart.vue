<template>
  <div class="cart">
    <nav-bar class="top"><div slot="center">购物车（{{length}}）</div></nav-bar>
    <cart-list class="list-cart"></cart-list>
    <cart-button-bar></cart-button-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './cartComps/CartList'
import CartButtonBar from './cartComps/CartButtonBar'



import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      msg: ''
    }
  },
  components:{
    NavBar,
    CartList,
    CartButtonBar
  },
  computed:{
    ...mapGetters({
      length:'getLength'
    })
  },
  methods: {

  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.top{
  background-color: var(--color-tint);
  color: #fff;
}
/* .list-cart{
height: 100vh;
} */
</style>
