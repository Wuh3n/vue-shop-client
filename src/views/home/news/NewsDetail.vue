<template>
  <div>
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" @click-left="onClickLeft" left-arrow left-text="返回" />

    <div class="details" v-for="item in newsInfo" :key="item.id">
      <h3 class="title">{{ item.title }}</h3>
      <div class="info">
        <span>发布时间：{{ item.add_time.split('T')[0] }}</span
        ><span>点击次数：{{ item.click }}</span>
      </div>
      <div class="content" v-html="item.content"></div>
      <div class="comment">
        <h4>发表评论</h4>
        <hr />
        <van-cell-group>
          <van-field v-model="content" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
        </van-cell-group>
        <van-button type="info" size="large" @click="submitComment">发表评论</van-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsId: '',
      newsInfo: [],
      content: '',
      loading: false,
      finished: false,
      commentList: [],
      pagenum: 1
    }
  },
  created() {
    this.getNewsId()
    this.getNewsInfo()
    this.newCommentList()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    getNewsId() {
      this.newsId = location.hash.split('/')[location.hash.split('/').length - 1]
    },
    async getNewsInfo() {
      const { data: res } = await this.$http.get(`/api/getnew/${this.newsId}`, {
        params: {}
      })
      this.newsInfo = res.message
    },
    async newCommentList() {
      const { data: res } = await this.$http.get(`/api/getcomments/${this.newsId}?pageindex=${this.pagenum}`, {
        params: {}
      })
      console.log(res.message)
      this.commentList = res.message
    },
    onLoad() {
      // 异步更新数据
      setTimeout(async () => {
        this.pagenum++
        const { data: res } = await this.$http.get(`/api/getcomments/${this.newsId}?pageindex=${this.pagenum}`, {
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
    async submitComment() {
      const { data: res } = await this.$http.post(`/api/postcomment/${this.newsId}`, { content: this.content })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.details {
  padding: 0 10px;
  .title {
    color: #1989fa;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    margin: 0;
    padding: 5px 0;
  }
  .info {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #1989fa;
    border-bottom: 1px solid #ccc;
    padding: 7px 0;
    span {
      font-size: 13px;
      color: #1989fa;
    }
  }
  .content {
    color: #535353;
  }
  &::after {
    content: '';
    height: 50px;
    display: block;
  }
  .comment {
    .van-cell-group {
      border: 1px #ccc solid;
    }
    .van-button {
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
}
// .van-cell {
//   margin: 0;
//   padding: 0 !important;
// }
</style>
