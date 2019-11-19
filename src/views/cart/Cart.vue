<template>
  <div>
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" @click-left="onClickLeft" left-arrow left-text="返回" />
    <div class="info">
      <img src="http://47.94.247.66/img/cart_empty.9f725555.png" alt="" />
      <p>购物车空空如也~</p>
      <van-button type="info" to="/goods">去逛逛</van-button>
    </div>
    <van-submit-bar :price="total" button-text="提交订单" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 50000
    }
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-flow: column;
  img {
    width: 100px;
    height: 100px;
  }
  p {
    color: #ccc;
  }
  .van-button {
    font-size: 10px;
    height: 20px;
    line-height: 20px;
  }
}
</style>
