<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 增加tabControl的吸顶效果 -->
    <tab-control
      class="tab-control"
      ref="tabControlUp"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabControlClick"
      v-show="tabControlShow"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <!-- 轮播图底下四图 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 一整张图 -->
      <feature-view></feature-view>
      <!-- 底下的导航栏 -->
      <tab-control
        ref="tabControlDown"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabControlClick"
      ></tab-control>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./ChildComps/HomeSwiper";
import RecommendView from "./ChildComps/RecommendView";
import FeatureView from "./ChildComps/FeatureView";

import TabControl from "components/content/tabControl/TabControl";
import NavBar from "components/common/navbar/NavBar";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import {itemImgListenerMixin, backTopMixin} from 'common/mixin'

export default {
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // isShowBackTop: false,
      offsetTop: 0,
      tabControlShow: false,
      saveY: 0,
      
    };
  },
  mixins:[itemImgListenerMixin, backTopMixin],
  
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
    // console.log('jiazai1');
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrolly();
    // console.log(this.$refs.scroll.getScrolly());
    this.$bus.$off("itemImageLoad", this.itemImgListener)
  },
  created() {
    this.HomeMultidata(),
      //掉三次数据
      this.HomeGoods("pop");
    this.HomeGoods("new");
    this.HomeGoods("sell");
  },
  mounted() {
    
  },
  computed: {
    //展示商列表
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    //监听小圆点返回首页
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0);
    // },
    //事件监听相关
    tabControlClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControlUp.currentIndex = index;
      this.$refs.tabControlDown.currentIndex = index;
    },

    //监听滚动
    contentScroll(position) {
      // console.log(position);
      //跳转首页小圆点隐藏
      this.isShowBackTop = -position.y > 1000;
      //控制tabControl是否吸顶
      this.tabControlShow = -position.y > this.offsetTop;
    },

    //上拉加载更多
    loadMore() {
      // console.log('上拉加载更多');
      this.HomeGoods(this.currentType);
    },

    //监听banner图片加载
    swiperImageLoad() {
      // console.log('swiperImageLoad');
      //获取tabcontrol的offsetTop

      this.offsetTop = this.$refs.tabControlDown.$el.offsetTop;
    },

    //网络请求
    HomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    HomeGoods(type) {
      // 请求商品数据
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
  background-color: #fff;

}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;

  /* position: fixed;
  left: 0;
  right: 0;
  z-index: 9;
  top: 0; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
