<template>
  <div>
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" @click-left="onClickLeft" left-arrow left-text="返回" />
    <div id="info" :class="GoodsList.length === 0 ? 'block' : 'none'">
      <img src="http://47.94.247.66/img/cart_empty.9f725555.png" alt="" />
      <p>购物车空空如也~</p>
      <van-button type="info" to="/goods">去逛逛</van-button>
    </div>
    <van-card v-for="item in GoodsList" :key="item.id" :num="item.value" :price="item.sell_price" :title="item.title" :thumb="item.img">
      <div slot="footer">
        <van-stepper v-model="item.value" @change="changeNum" />
      </div>
    </van-card>
    <van-submit-bar :price="total" button-text="提交订单" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 50000,
      GoodsList: [],
      sum: 0
    }
  },
  created() {
    this.getGoodsList()
    this.changeNum()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    getGoodsList() {
      if (window.localStorage.getItem('cart') === null) {
        this.GoodsList = []
      } else {
        this.GoodsList = JSON.parse(window.localStorage.getItem('cart'))
      }
      console.log(this.GoodsList.length)
    },
    changeNum() {
      this.sum = 0
      this.GoodsList.forEach((item, i) => {
        this.sum += item.value * item.sell_price
      })
      console.log(this.sum)
      this.total = this.sum * 100
      window.localStorage.removeItem('cart')
      window.localStorage.setItem('cart', JSON.stringify(this.GoodsList))
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
#info {
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
.none {
  display: none !important;
}
.block {
  display: flex !important;
}
</style>
