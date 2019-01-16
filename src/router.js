import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { 
        title: '首页'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { 
        title: '首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( './views/login/'),
      meta: { 
        title: '登录'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
