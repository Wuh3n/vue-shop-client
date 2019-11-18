<template>
  <div>
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="item in imgList" :key="item.id">
        <img v-lazy="item.img" />
      </van-swipe-item>
    </van-swipe>
    <van-row>
      <van-col @click="newslist" span="8"><img src="../../assets/images/menu1.png" alt="" /><span>新闻资讯</span></van-col>
      <van-col @click="photo" span="8"><img src="../../assets/images/menu2.png" alt="" /><span>图片分享</span></van-col>
      <van-col @click="goods" span="8"><img src="../../assets/images/menu3.png" alt="" /><span>商品购买</span></van-col>
    </van-row>
    <van-row>
      <van-col span="8"><img src="../../assets/images/menu4.png" alt="" /><span>留言反馈</span></van-col>
      <van-col span="8"><img src="../../assets/images/menu5.png" alt="" /><span>视频专区</span></van-col>
      <van-col span="8"><img src="../../assets/images/menu6.png" alt="" /><span>联系我们</span></van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: []
    }
  },
  created() {
    this.getImgList()
  },
  methods: {
    async getImgList() {
      const { data: res } = await this.$http.get(`/api/getlunbo`, {
        params: {}
      })
      this.imgList = res.message
    },
    newslist() {
      this.$router.push('/newslist')
    },
    photo() {
      this.$router.push('/photo')
    },
    goods() {
      this.$router.push('/goods')
    }
  }
}
</script>

<style lang="less" scoped>
.van-swipe {
  width: 100%;
  height: 200px;
  .van-swipe-item {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 100%;
      min-height: 200px;
    }
  }
}
.van-col {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  img {
    width: 60px;
  }
  span {
    margin: 15px;
    font-size: 14px;
  }
}
</style>
