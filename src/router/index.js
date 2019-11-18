import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/home/Home.vue'
import Cart from '../views/cart/Cart.vue'
import Member from '../views/member/Member.vue'
import Search from '../views/search/Search.vue'
import NewsList from '../views/home/news/NewsList.vue'
import PhotoList from '../views/home/photo/PhotoList.vue'
import GoodsList from '../views/home/goods/GoodsList.vue'
import NewsDetail from '../views/home/news/NewsDetail.vue'
import PhotoInfo from '../views/home/photo/PhotoInfo.vue'
import GoodsDetail from '../views/home/goods/GoodsDetail.vue'
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
        { path: '/search', component: Search },
        { path: '/newslist', component: NewsList },
        { path: '/photo', component: PhotoList },
        { path: '/goods', component: GoodsList },
        { path: '/news/detail/:id', component: NewsDetail },
        { path: '/photo/Info/:id', component: PhotoInfo },
        { path: '/goods/detail/:id', component: GoodsDetail }
      ]
    }
  ],
  linkActiveClass: '自定义选中router-link时高亮类名'
})
// 必须将创建好的router路由 router 注册到 new Vue()中

export default router
