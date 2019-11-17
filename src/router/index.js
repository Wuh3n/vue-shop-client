import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/home/Home.vue'
import Cart from '../views/cart/Cart.vue'
import Member from '../views/member/Member.vue'
import Search from '../views/search/Search.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 路由匹配规则
    { path: '/', redirect: '/home' }, // redirect重定向
    {
      path: '/index',
      component: Index,
      children: [
        { path: '/home', component: Home },
        { path: '/cart', component: Cart },
        { path: '/member', component: Member },
        { path: '/search', component: Search }
      ]
    }
  ],
  linkActiveClass: '自定义选中router-link时高亮类名'
})
// 必须将创建好的router路由 router 注册到 new Vue()中

export default router
