<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    //创建bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    //监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
        this.scroll.refresh();
      });
    }
    //监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },

  methods: {
    //跳转到x，y
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    //上拉加载更多
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    //刷新better-scroll
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    //保存y
    getScrolly(){
      return this.scroll ? this.scroll.y : 0
    }
  },
};
</script>

<style scoped></style>
