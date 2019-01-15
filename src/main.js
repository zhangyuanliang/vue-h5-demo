import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// 导入样式
import './styles/common.scss'

import './utils/rem'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
