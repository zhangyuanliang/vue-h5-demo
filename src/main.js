import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';

// 导入样式 
import './styles/common.scss'

import './utils/rem'

Vue.config.productionTip = false
Vue.use(Vant)
// options 为可选参数，无则不传
Vue.use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
