<template>
  <div>
    <!-- 头部区域-->
    <van-nav-bar title="黑马程序员.vant" @click-left="onClickLeft" left-arrow left-text="返回" right-text="添加" @click-right="onClickRight" />
    <form action="/">
      <van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch" @cancel="onCancel" />
    </form>

    <div class="center">
      <van-cell-group v-if="historyList.length !== 0">
        <van-cell v-for="item in historyList" :key="item.id" :title="item.name" :value="item.ctime.split('T')[0]" />
      </van-cell-group>
    </div>
    <div class="history" v-if="historyList.length === 0">
      <div class="top"><span>搜索历史</span><van-icon name="delete" @click="deleteHistory" /></div>
      <div class="bottom">
        <span :class="arr.length !== 0 ? 'none' : 'block'"> <van-divider>暂无搜索历史</van-divider></span>
        <div class="tag">
          <van-tag size="medium" v-for="(item, index) in arr" :key="index">{{ item }}</van-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      arr: [],
      historyList: [],
      localArr: []
    }
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async onClickRight() {
      this.$router.push('/addgoods')
    },
    onSearch() {
      if (this.value.trim() === '') {
        console.log(1)
        this.$toast({
          message: '请输入搜索关键词'
        })
        return
      }
      this.getHistoryList()
      const bool = this.arr.some(item => {
        return item === this.value
      })
      if (!bool) {
        this.arr.unshift(this.value)
      }
    },
    onCancel() {
      console.log('取消')
      this.historyList = []
    },
    deleteHistory() {
      this.arr = []
    },
    async getHistoryList() {
      const { data: res } = await this.$http.get(`/api/getprodlist`, {
        params: {}
      })
      this.historyList = res.message
      console.log(this.historyList)
    }
  }
}
</script>

<style lang="less" scoped>
.history {
  padding: 10px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bottom {
    margin-top: 20px;
    .none {
      display: none;
    }
    .block {
      display: block;
    }
    .van-tag {
      margin: 6px;
    }
  }
}
</style>
