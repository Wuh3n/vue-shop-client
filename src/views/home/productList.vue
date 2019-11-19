<template>
  <div>
    <van-grid :column-num="2" :gutter="8" :border="false">
      <van-grid-item v-for="item in getlist" :key="item.id" class="vanitem">
        <div class="goodsie">
          <van-image :src="item.img_url" />
          <p class="spanfont">{{ item.title }}</p>
          <div class="divId">
            <p class="p-span">
              <span>￥{{ item.sell_price }}</span
              ><em>{{ item.market_price }}</em>
            </p>
            <p class="p-span1"><span>热卖中</span><em>剩下60件</em></p>
          </div>
        </div>
      </van-grid-item>
      <div class="footer"><span>没有更多了</span></div>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getlist: []
    }
  },
  created() {
    this.getgoodslist()
  },
  methods: {
    async getgoodslist() {
      const { data: res } = await this.$http.get('/api/getgoods?pageindex=1', { params: {} })
      this.getlist = res.message
      // console.log(this.getlist)
      // for (let i = 0; i < this.getlist.length; i++) {
      //   if (this.getlist.length === 8) {
      //     this.getlist[i].push() = this.getlist.splid()
      //   }
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.van-grid {
  margin-top: 10px;
  padding-left: 0 !important;
}
.van-grid-item__content {
  padding: 10px !important;
}
.vanitem {
  padding: 0 !important;
}
.van-image {
  width: 100%;
}
.van-grid-item__content {
  padding: 5px 8px !important;
}
.spanfont {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
}
.goodsie {
  border: 1px solid #ccc;
}
.footer {
  margin-bottom: 100px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #ccc;
}
.divId {
  width: 100%;
  background-color: #eee;
}
.p-span {
  span {
    color: red;
    margin-right: 10px;
  }
  em {
    text-decoration: line-through;
  }
}
.p-span1 {
  font-size: 14px;
  margin-bottom: 0;
  > em {
    float: right;
  }
}
</style>
