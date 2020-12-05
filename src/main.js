import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import LazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(toast)
Vue.use(LazyLoad,{})

//事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  toast,
  render: h => h(App)
}).$mount('#app')


