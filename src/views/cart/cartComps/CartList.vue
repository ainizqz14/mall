<template>
  <div class="cart-list">
    <scroll ref="scroll" class="content">
    <cart-list-item v-for="(item, index) in list" :key="index" :itemInfo = 'item'></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import { mapGetters } from 'vuex'

import CartListItem from './CartListItem'
export default {
  data () {
    return {
      msg: ''
      
    }
  },
  components:{
    Scroll,
    CartListItem

  },
  methods: {

  },
  activated() {
    this.$refs.scroll.refresh()
    // console.log(this.$refs.scroll.refresh);
  },
  computed:{
    ...mapGetters({
      list:'cartList'
    })
  }
}
</script>

<style scoped>
.cart-list{
  height:calc( 100% - 44px - 49px - 40px);
}
.content{
  height:100%;
  overflow: hidden;
}
</style>
