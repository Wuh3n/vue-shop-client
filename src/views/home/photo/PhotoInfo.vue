<template>
  <div class="infoAll">
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" @click-left="onClickLeft" left-arrow left-text="返回" />
    <div class="info" v-for="item in photoInfo" :key="item.id">
      <h4>{{ item.title }}</h4>
      <p>
        <span>发布时间：{{ item.add_time }}</span
        ><span>点击：{{ item.click }}</span>
      </p>
      <hr />
      <ul>
        <li v-for="(item, i) in photoImg" :key="item.id" @click="clickImg(item)">
          <img :src="item.src" alt="" />
        </li>
      </ul>
      <div class="content" v-html="item.content"></div>
    </div>
    <div class="comment">
      <h4>发表评论</h4>
      <hr />
      <van-cell-group>
        <van-field v-model="content" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
      </van-cell-group>
      <van-button type="info" size="large" @click="submitComment" class="submitComment">发表评论</van-button>
      <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
        <van-cell v-for="(item, i) in commentList" :key="i">
          <div class="comment-list">
            <span>第{{ i + 1 }}楼</span><span>用户：{{ item.user_name }}</span
            ><span>发表时间：{{ item.add_time.split('T')[0] }}</span>
          </div>
          <div>{{ item.content }}</div>
        </van-cell>
      </van-list>
      <!-- <van-button color="#ffc2c2" @click="onLoad" size="large" plain>加载更多</van-button> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)
export default {
  data() {
    return {
      photoId: 0,
      photoInfo: [],
      photoImg: [],
      content: '',
      loading: false,
      finished: false,
      commentList: [],
      pagenum: 1
    }
  },
  created() {
    this.getPhotoId()
    this.getPhotoInfo()
    this.getPhotoImg()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    getPhotoId() {
      this.photoId = location.hash.split('/')[location.hash.split('/').length - 1]
    },
    async getPhotoInfo() {
      const { data: res } = await this.$http.get(`/api/getimageInfo/${this.photoId}`, {
        params: {}
      })
      console.log(res.message)
      this.photoInfo = res.message
    },
    async getPhotoImg() {
      const { data: res } = await this.$http.get(`/api/getthumimages/${this.photoId}`, {
        params: {}
      })
      console.log(res.message)
      this.photoImg = res.message
    },
    async newCommentList() {
      const { data: res } = await this.$http.get(`/api/getcomments/${this.photoId}?pageindex=${this.pagenum}`, {
        params: {}
      })
      console.log(res.message)
      this.commentList = res.message
    },
    async submitComment() {
      if (this.content.trim() === '') {
        this.$toast('留言不能为空')
        return
      }
      const { data: res } = await this.$http.post(`/api/postcomment/${this.photoId}`, { content: this.content })
      console.log(res)
      if (res.status === 0) {
        this.content = ''
        this.$toast('提交成功')
      }
      this.newCommentList()
    },
    onLoad() {
      // 异步更新数据
      setTimeout(async () => {
        this.pagenum++
        const { data: res } = await this.$http.get(`/api/getcomments/${this.photoId}?pageindex=${this.pagenum}`, {
          params: {}
        })
        this.commentList.push(...res.message)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.commentList.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    clickImg(data) {
      const newArr = []
      this.photoImg.forEach(item => {
        if (item.src !== data.src) {
          newArr.push(item.src)
        }
      })
      console.log(newArr)
      ImagePreview([data.src, ...newArr])
    }
  }
}
</script>

<style lang="less" scoped>
.infoAll {
  &::after {
    content: '';
    height: 50px;
    display: block;
  }
}
.info {
  padding: 0 10px;
  h4 {
    text-align: center;
    color: #26a2ff;
    font-size: 15px;
  }
  > p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: #8f8f94;
  }
  ul {
    list-style: none;
    margin: 10px 0;
    padding: 0 5px;
    overflow: hidden;
    li {
      float: left;
      width: 33.3333%;
      padding: 5px;
      box-sizing: border-box;
      img {
        width: 100%;
        box-shadow: 1px 0 8px 1px rgba(0, 0, 0, 0.3);
      }
    }
  }
}
.comment {
  padding: 0 10px;
  .van-cell-group {
    border: 1px #ccc solid;
  }
  .submitComment {
    margin-top: 10px;
  }
  .comment-list {
    font-size: 12px;
    background-color: #ccc;
    span {
      margin-right: 10px;
    }
  }
  .van-cell {
    padding: 16px 0;
  }
}
</style>
