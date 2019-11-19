import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/home/Home.vue'
import Cart from '../views/cart/Cart.vue'
import Member from '../views/member/Member.vue'
import Search from '../views/search/Search.vue'
import ProductList from '../views/home/productList.vue'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes: [
    // 路由匹配规则
    { path: '/', redirect: '/index/home' }, // redirect重定向
    {
      path: '/index',
      component: Index,
      children: [
        { path: '/index/home', component: Home },
        { path: '/index/cart', component: Cart },
        { path: '/index/member', component: Member },
        { path: '/index/search', component: Search },
        { path: '/index/home/goods', component: ProductList }
      ]
    }
  ],
  linkActiveClass: '自定义选中router-link时高亮类名'
})
// 必须将创建好的router路由 router 注册到 new Vue()中

export default router
