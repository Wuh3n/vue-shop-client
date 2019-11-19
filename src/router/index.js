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
import Goodsdesc from '../views/home/goods/Goodsdesc.vue'
import Goodscomments from '../views/home/goods/Goodscomments.vue'
import Addgoods from '../views/search/Addgoods.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 路由匹配规则
    { path: '/', redirect: '/home' }, // redirect重定向
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '/home',
          component: Home,
          meta: {
            index: 0
          }
        },
        {
          path: '/member',
          component: Member,
          meta: {
            index: 2
          }
        },
        {
          path: '/search',
          component: Search,
          meta: {
            index: 3
          }
        },
        {
          path: '/newslist',
          component: NewsList,
          meta: {
            index: 4
          }
        },
        {
          path: '/photo',
          component: PhotoList,
          meta: {
            index: 5
          }
        },
        {
          path: '/goods',
          component: GoodsList,
          meta: {
            index: 6
          }
        },
        {
          path: '/news/detail/:id',
          component: NewsDetail,
          meta: {
            index: 7
          }
        },
        {
          path: '/photo/Info/:id',
          component: PhotoInfo,
          meta: {
            index: 8
          }
        },
        {
          path: '/goodsdesc/:id',
          component: Goodsdesc,
          meta: {
            index: 9
          }
        },
        {
          path: '/goodscomments/:id',
          component: Goodscomments,
          meta: {
            index: 10
          }
        },
        {
          path: '/addgoods',
          component: Addgoods,
          meta: {
            index: 11
          }
        }
      ]
    },
    { path: '/cart', component: Cart },
    { path: '/goods/detail/:id', component: GoodsDetail }
  ],
  linkActiveClass: '自定义选中router-link时高亮类名'
})
// 必须将创建好的router路由 router 注册到 new Vue()中

export default router
