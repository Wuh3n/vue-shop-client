<template>
  <div>
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" @click-left="onClickLeft" left-arrow left-text="返回" />
    商品列表页
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped></style>
