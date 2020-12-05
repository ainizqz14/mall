<template>
  <div id="detail">
    <!-- <scroll> -->
    <!-- 导航 -->
    <detail-nav-bar
      class="nav-bar"
      @itemClick="itemClick"
      ref="nav"
    ></detail-nav-bar>

    <scroll
      class="content"
      ref="scroll"
      @pullingUp="loadMore"
      :pull-up-load="true"
      @scroll="detaiScroll"
      :probeType="3"
    >
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad">
      </detail-goods-info>
      <!-- </scroll> -->
      <detail-goods-param ref="param" :param="param"></detail-goods-param>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="list" :goods="recommends"></goods-list>
      <div class="noline" v-show="showMore"><span>我是有底线的</span></div>
    </scroll>

    <detail-bottom-bar @cartClick = 'cartClick'></detail-bottom-bar>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import DetailNavBar from "./DetailComps/DetailNavBar";
import DetailSwiper from "./DetailComps/DetailSwiper";
import DetailBaseInfo from "./DetailComps/DetailBaseInfo";
import DetailShopInfo from "./DetailComps/DetailShopInfo";
import DetailGoodsInfo from "./DetailComps/DetailGoodsInfo";
import DetailGoodsParam from "./DetailComps/DetailGoodsParam";
import DetailCommentInfo from "./DetailComps/DetailCommentInfo";
import DetailBottomBar from './DetailComps/DetailBottomBar'


import GoodsList from "components/content/goods/GoodsList";
// import BackTop from "components/content/backtop/BackTop";

import Scroll from "components/common/scroll/Scroll";
import { debounce } from "common/utils";
import { itemImgListenerMixin, backTopMixin } from "common/mixin";

import { mapActions } from 'vuex'

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      param: {},
      commentInfo: {},
      recommends: [],
      showMore: false,
      navBarY: [],
      navTopY: null,
      positionY: 0,
      currentIndex: 0,
      // isShowBackTop: false,

    };
  },
  mixins: [itemImgListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParam,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
    // BackTop
  },
  created() {
    this.iid = this.$route.params.iid;
    //  网络请求
    //请求轮播图数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //  console.log(res.result.itemInfo.topImages);
      // console.log(res);
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // console.log(this.goods);
      // console.log(this.goods.columns);
      //收到店铺信息
      this.shop = new Shop(data.shopInfo);
      // console.log(this.shop);
      //请求goodsInfo的数据
      this.detailInfo = data.detailInfo;
      // console.log(this.detailInfo);
      //获取goodsparam
      this.param = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      // console.log(this.param);
      //取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
        // console.log(this.commentInfo);
      }
    });
    //请求推荐的数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
    this.navTopY = debounce(() => {
      this.navBarY = [];
      this.navBarY.push(0);
      this.navBarY.push(this.$refs.param.$el.offsetTop);
      this.navBarY.push(this.$refs.comment.$el.offsetTop);
      this.navBarY.push(this.$refs.list.$el.offsetTop);
      this.navBarY.push(Number.MAX_VALUE);
      // console.log(this.navBarY);
    }, 500);
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(['addCart']),
    imgLoad() {
      this.refresh();
      this.navTopY();
    },
    loadMore() {
      this.showMore = true;
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.navBarY[index], 200);
    },
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0);
    // },


    //添加购物车
    cartClick(){
      // console.log('cartClick');
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realprice
      // console.log(product);
      //普通用promise来增加弹窗
      // this.$store.dispatch('addCart' , product).then(res =>{
      //   console.log(res);
      // })
      //使用映射来增加弹窗
      this.addCart(product).then(res => {
        this.$toast.show(res, 2000)
        // console.log(this.$toast);
      })

    },


    detaiScroll(position) {
      this.positionY = -position.y;
      // console.log(this.positionY);
      let length = this.navBarY.length;
      for (let i = 0; i < length - 1; i++) {
        // console.log(i);
        // this.currentIndex !== i &&
        //条件语句太多
        // if ( this.currentIndex !== i && ((i < length - 1 && this.positionY >= this.navBarY[i] && this.positionY < this.navBarY[i + 1]) || (i === length -1 && this.positionY >= this.navBarY[i]))){
        // console.log(i);

        // this.currentIndex = i;
        // console.log(this.currentIndex);
        // this.$refs.nav.currentIndex = this.currentIndex

        // }
        //对条件进行简化 在数组最后添加了一个极大值
        if (
          this.currentIndex !== i &&
          i < length - 1 &&
            this.positionY >= this.navBarY[i] &&
            this.positionY < this.navBarY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
        //backtop的显示
      this.isShowBackTop = -position.y > 1000;
        
      }
    },
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: #fff;
  position: relative;
  z-index: 100;
}
#detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
}
.content {
  position: absolute;
  top: 44px;
  right: 0;
  left: 0;
  overflow: hidden;
  bottom: 0;
  height: calc(100% - 44px - 58px);
}
.noline {
  background-color: #fff;
  text-align: center;
}
.noline span {
  display: inline-block;

  color: rgb(100, 100, 100);
  line-height: 30px;
  width: 200px;
  text-align: center;
  background-color: #f2f5f8;
  border-radius: 10px;
}
</style>
