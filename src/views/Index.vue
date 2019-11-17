<template>
  <div>
    <!-- 头部区域 -->
    <van-nav-bar title="黑马程序员.vant" left-arrow />

    <!-- 主体区域 -->
    <router-view></router-view>

    <!-- 底部导航 -->
    <van-tabbar v-model="active">
      <van-tabbar-item to="/index/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/index/member" icon="manager-o">会员</van-tabbar-item>
      <van-tabbar-item to="/index/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/index/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  height: 40px;
}
.van-nav-bar {
  background-color: #1989fa;
}
.van-nav-bar__title {
  color: #fff !important;
  font-size: 14px;
}
</style>
