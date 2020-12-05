<template>
  <div class="cart-bar ignore" >
    <div class="all-choice">
      <check-button class="check-all" :is-check='isCheckAll' @click.native='allChoice'></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      <span>合计：¥</span>{{allPrice}}
    </div>
    <div class="buy-btn" @click="buyBtn">
      <span>去结算（{{length}}）</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { mapGetters } from 'vuex'

export default {
  name:'CartButtonBar',
  data() {
    return {
      msg: ""
    };
  },

  components: {
    CheckButton,
  },
  computed:{
    allPrice(){
      return this.list.filter(item => item.check).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    ...mapGetters({
      list:'cartList'
    }),
    length () {
      return this.list.filter(item => item.check).reduce((preValue, item) => {
        return preValue + item.count
      }, 0)
    },
    isCheckAll(){
      if (this.list.length === 0) return false
      for (let item of this.list) {
        if (!item.check) {
          return false
        }
      }
      return true
    }
  },
  methods: {
   allChoice(){
     if (this.isCheckAll){
       return this.list.forEach(item => item.check = false);
     }else{
       return this.list.forEach(item => item.check = true)
     }
   },
   buyBtn () {
     
   }
  }
};
</script>

<style scoped>
.cart-bar {
  height: 40px;
  background-color: #eee;
  display: flex;
}
.all-choice{
  display: flex;
  align-content: center;
  align-items: center;
  width: 80px;
}
.check-all {
  height: 20px;
  width: 20px;
  margin-left: 10px;
}
.all-choice span{
  margin-left: 5px;
  font-size: 14px;
}
.price{
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  flex: 1;
}
.buy-btn{
  font-size: 14px;
  line-height: 40px;
  width: 80px;
  background-color: orange;
  color: #fff;
  text-align: center;

}
</style>
