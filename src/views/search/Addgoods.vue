<template>
  <div>
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" @click-left="onClickLeft" left-arrow left-text="返回" />
    <div class="content">
      <van-cell-group>
        <van-field v-model="value" placeholder="请输入商品名称" />
      </van-cell-group>
      <van-button type="info" size="large" @click="addGoods">添加商品</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async addGoods() {
      if (this.value.trim() === '') {
        this.$notify('请输入商品名称')
        return
      }
      const { data: res } = await this.$http.post(`/api/addproduct`, {
        name: this.value
      })
      console.log(res)
      if (res.status === 0) {
        this.$notify({ type: 'success', message: '添加成功' })
        this.$router.push('/search')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 0 10px;

  .van-button {
    margin-top: 50px;
  }
}
</style>
