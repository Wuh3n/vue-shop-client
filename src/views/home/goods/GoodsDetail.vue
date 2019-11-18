<template>
  <div>
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" @click-left="onClickLeft" left-arrow left-text="返回" />
    <div class="info">
      <div class="top"></div>
      <div class="center"></div>
      <div class="botton"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsId: 0
    }
  },
  created() {
    this.getGoodsId()
    this.getImgList()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    getGoodsId() {
      this.goodsId = location.hash.split('/')[location.hash.split('/').length - 1]
      console.log(this.goodsId)
    },
    async getImgList() {
      const { data: res } = await this.$http.get(`/api/getthumimages/90`, {
        params: {}
      })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped></style>
