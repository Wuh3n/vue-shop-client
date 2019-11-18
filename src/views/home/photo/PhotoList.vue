<template>
  <div>
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" @click-left="onClickLeft" left-arrow left-text="返回" />
    <van-tabs swipeable @change="changeTabs">
      <van-tab v-for="item in photoSort" :key="item.id" :title="item.title" :name="item.id">
        <!-- <van-grid :border="false" :column-num="1">
          <van-grid-item v-for="item in getPhoto" :key="item.id">
            <van-image lazy-load :src="item.img_url" />
            <div class="info">123</div>
          </van-grid-item>
        </van-grid> -->
        <ul>
          <li v-for="item in getPhoto" :key="item.id" @click="goPhotoDetails(item.id)">
            <van-image lazy-load :src="item.img_url" />
            <div class="info">
              <p>{{ item.title }}</p>
              <p>{{ item.zhaiyao }}</p>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photoSort: [],
      photoId: 0,
      getPhoto: []
    }
  },
  created() {
    this.getPhotoSort()
    this.getPhotoList()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async getPhotoSort() {
      const { data: res } = await this.$http.get(`/api/getimgcategory`, {
        params: {}
      })
      this.photoSort = res.message
      this.photoSort.unshift({ id: 0, title: '全部' })
    },
    changeTabs(name) {
      this.photoId = name
      this.getPhotoList()
    },
    async getPhotoList() {
      const { data: res } = await this.$http.get(`/api/getimages/${this.photoId}`, {
        params: {}
      })
      console.log(res)
      this.getPhoto = res.message
    },
    goPhotoDetails(id) {
      this.$router.push('./photo/Info/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  &::after {
    content: '';
    height: 50px;
    display: block;
  }
}
ul {
  padding: 10px;
  li {
    width: 100%;
    height: 300px;
    border-radius: 10px;
    margin-bottom: 15px;
    overflow: hidden;
    position: relative;
    .van-image {
      width: 100%;
      height: 100%;
    }
    .info {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      height: 75px;
      p {
        font-size: 12px;
        margin: 0;
        margin-top: 5px;
      }
    }
  }
}
.van-grid-item__content {
  overflow: hidden;
}
</style>
