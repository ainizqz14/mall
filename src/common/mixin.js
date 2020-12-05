import {debounce} from './utils'
import BackTop from "components/content/backtop/BackTop";

export const itemImgListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh:null
    }
  },
 
  mounted() {
    //图片加载完成的事件监听
    this.itemImgListener = () => {
      this.refresh();
    };
    this.refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
}

//backtop的混入
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
      
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  }
}