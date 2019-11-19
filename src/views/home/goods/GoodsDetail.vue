<template>
  <div>
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" @click-left="onClickLeft" left-arrow left-text="返回" />
    <div class="info" v-for="item in info" :key="item.id">
      <div class="top">
        <van-swipe :autoplay="2000">
          <van-swipe-item v-for="(item, index) in imgList" :key="index">
            <img v-lazy="item" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="center">
        <div class="title">
          <span>{{ item.title }}</span>
        </div>
        <div class="price">
          <span
            >市场价：<s>￥{{ item.market_price }}</s></span
          ><span class="span1"
            >销售价：<b>￥{{ item.sell_price }}</b></span
          >
        </div>
        <div class="num">购买数量：<van-stepper v-model="value" /></div>
        <div class="btn">
          <van-button color="#1989fa">立即购买</van-button>
          <van-button color="#ff4444" @click="addCart">加入购物车</van-button>
        </div>
      </div>
      <div class="botton">
        <div class="parameter">商品参数</div>
        <div class="botton-info">
          <p>商品货号：{{ item.goods_no }}</p>
          <p>库存情况：{{ item.stock_quantity }}</p>
          <p>上架时间：{{ item.add_time.split('T')[0] }}</p>
        </div>
        <div class="btn">
          <van-button plain hairline type="info" size="large" :to="'/goodsdesc/' + goodsId">图文介绍</van-button>
          <van-button plain hairline type="warning" size="large" :to="'/goodscomments/' + goodsId">商品评论</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsId: 0,
      imgList: [],
      info: [],
      value: 1,
      purchaseList: [],
      addCartList: {}
    }
  },
  created() {
    this.getGoodsId()
    this.getImgList()
    this.getInfo()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    getGoodsId() {
      this.goodsId = location.hash.split('/')[location.hash.split('/').length - 1]
    },
    async getImgList() {
      const { data: res } = await this.$http.get(`/api/getthumimages/${this.goodsId}`, {
        params: {}
      })
      this.imgList = res.message
    },
    async getInfo() {
      const { data: res } = await this.$http.get(`/api/goods/getinfo/${this.goodsId}`, {
        params: {}
      })
      this.info = res.message
    },
    addCart() {
      // const addCartList = {}
      this.addCartList.id = this.info[0].id
      this.addCartList.sell_price = this.info[0].sell_price
      this.addCartList.value = this.value
      this.addCartList.title = this.info[0].title
      this.addCartList.img = this.imgList[0].src

      this.purchaseList.push(this.addCartList)
      if (window.localStorage.getItem('cart') === null) {
        window.localStorage.setItem('cart', JSON.stringify(this.purchaseList))
      } else {
        let data = JSON.parse(window.localStorage.getItem('cart'))
        window.localStorage.removeItem('cart')
        // console.log(data)
        data.forEach(item => {
          if (item.id === this.addCartList.id) {
            item.value += this.addCartList.value
            window.localStorage.setItem('cart', JSON.stringify(data))
          } else {
            console.log(...this.purchaseList)
            data.push(...this.purchaseList)
            window.localStorage.setItem('cart', JSON.stringify(data))
          }
        })
      }
      // console.log(window.localStorage.getItem('cart'))

      // console.log(this.purchaseList)
      // console.log(window.localStorage.getItem('cart'))
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  &::after {
    content: '';
    height: 50px;
    display: block;
  }
  padding: 10px;
  .top {
    height: 230px;
    border: 1px solid #dedede;
    border-radius: 5px;
    .van-swipe {
      height: 200px;
      img {
        height: 200px;
      }
    }
    .van-swipe-item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .center {
    border: 1px solid #dedede;
    border-radius: 5px;
    margin: 10px 0;
    .title {
      text-align: center;
      margin-top: 15px;
      > span {
        border-bottom: 1px solid #dedede;
      }
    }
    .price {
      margin: 15px 0;
      margin-left: 30px;
      font-size: 14px;
      .span1 {
        margin-left: 15px;
      }
      color: #8f8f94;
      b {
        color: red;
      }
    }
    .num {
      display: flex;
      margin-left: 30px;
      color: #8f8f94;
    }
    .btn {
      margin-left: 30px;
      margin-top: 15px;
      margin-bottom: 20px;
      .van-button {
        height: 33px;
        line-height: 33px;
        margin-right: 10px;
      }
    }
  }
  .botton {
    border: 1px solid #dedede;
    border-radius: 5px;
    margin-top: 10px;
    padding: 0 30px;
    .parameter {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #dedede;
    }
    .botton-info {
      border-bottom: 1px solid #dedede;
    }
    .btn {
      .van-button {
        margin-top: 15px;
        &:nth-child(2) {
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>
