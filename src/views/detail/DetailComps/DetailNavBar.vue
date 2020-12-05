<template>
  <div class="detail-bar">
    <nav-bar>
      <div slot="left" class="back-icon" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div 
        v-for="(item, index) in title" 
        :key="index" 
        class="title-item" 
        :class="{active:currentIndex == index}"
        @click="itemClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  components: {
    NavBar,
  },
  methods: {
    itemClick(index){
      this.currentIndex = index
      this.$emit('itemClick' , index)
    },
    backClick(){
      this.$router.back()
    }
  },
};
</script>

<style scoped>
.title{
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.back-icon img{
  margin-top: 11px;
}
.detail-bar{
  background-color: #fff;
}
</style>
