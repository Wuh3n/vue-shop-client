<template>
  <div>
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" @click-left="onClickLeft" left-arrow left-text="返回" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-grid :gutter="10" :column-num="2">
        <van-grid-item v-for="item in goodsList" :key="item.id" default :to="`/goods/detail/${item.id}`">
          <van-image :src="item.img_url" />
          <div class="botton-box">
            <span>{{ item.title }}</span>
            <div>
              <span class="span1"
                >￥{{ item.sell_price }}<s>￥{{ item.market_price }}</s></span
              >
              <div>
                <span>热卖中</span><span>剩余{{ item.stock_quantity }}件</span>
              </div>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      goodsList: [],
      number: 1
    }
  },
  created() {
    this.getGoodsList()
    this.getGoodsList1()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.goodsList = []
        this.getGoodsList()
        this.getGoodsList1()
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    // 请求商品列表数据
    async getGoodsList() {
      const { data: res } = await this.$http.get(`/api/getgoods?pageindex=1`, {
        params: {}
      })
      this.goodsList = res.message
      // console.log(this.goodsList)
    },
    async getGoodsList1() {
      // this.number++
      const { data: res } = await this.$http.get(`/api/getgoods?pageindex=2`, {
        params: {}
      })
      this.goodsList.push(...res.message)
      console.log(this.goodsList)
    }
  }
}
</script>

<style lang="less" scoped>
.van-grid-item {
  position: relative;
  height: 350px;
  .van-image {
    position: absolute;
    top: 0;
  }
  .botton-box {
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    > span {
      display: block;
      height: 40px;
      font-size: 14px;
      color: #000;
      padding-left: 10px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-emphasis: ellipsis;
      display: -webkit-box;
      line-clamp: 2;
      box-orient: vertical;
    }
    > div {
      background-color: #eeeeee;
      height: 60px;
      display: flex;
      flex-flow: column;
      .span1 {
        line-height: 30px;
        color: red;
        margin-left: 10px;
        s {
          color: #323233;
          font-size: 14px;
          margin-left: 20px;
        }
      }
      > div {
        margin: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
      }
    }
  }
}
.van-grid {
  margin-top: 10px;
}
.van-grid-item__content {
  border: 1px solid #000;
}
</style>
