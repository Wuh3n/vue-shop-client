<template>
  <div>
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" @click-left="onClickLeft" left-arrow left-text="返回" />

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-card @click="goNewsDetails(item.id)" v-for="item in list" :key="item.id">
        <div slot="desc" class="slot-title">
          {{ item.title }}
        </div>
        <div slot="thumb">
          <van-image :src="item.img_url" type="contain" />
        </div>
        <div slot="desc" class="slot-desc ">
          <span>发布时间：{{ item.add_time.split('T')[0] }}</span
          ><span>点击：{{ item.click }}</span>
        </div>
      </van-card>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      isLoading: false,
      id: ''
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 获取新闻资讯列表
    async getNewsList() {
      const { data: res } = await this.$http.get(`/api/getnewslist`, {
        params: {}
      })
      this.list = res.message
      console.log(this.list)
    },
    onRefresh() {
      setTimeout(() => {
        this.getNewsList()
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    goNewsDetails(id) {
      this.$router.push('./news/detail/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.van-card {
  height: 67px;
  margin: 0;
  padding: 10px 20px !important;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  .van-card__content {
    width: 42px;
    height: 42px;
  }
}
.van-card__thumb {
  div {
    width: 100%;
    height: 100%;
  }
}
.slot-title {
  font-size: 14px;
  font-weight: 700;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.slot-desc {
  color: #226aff;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
}

.van-card:not(:first-child) {
  margin: 0;
  padding: 0;
}

.van-card__thumb,
.van-image__img {
  width: 42px;
  height: 42px;
}
</style>
