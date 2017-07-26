<template>
  <div class="archive">
    <i-timeline>
      <i-timeline-item class="archive-item" v-for="(item, index) in articles" :key="index">
        <div class="time"><i-icon type="calendar"></i-icon>{{formatDate(item.update_time)}}</div>
        <div class="title">
          <router-link :to="{ name: 'detail', params: { id: item.a_i_d } }">
            {{item.title}}
          </router-link>
        </div>
        <div class="des" v-html="item.content"></div>
      </i-timeline-item>
    </i-timeline>
    <div class="pagination-wrap">
      <Page class="page" size="small" :current="current" :total="total" :page-size="pageSize" show-total show-elevator show-sizer :page-size-opts="[5, 10, 20, 30, 40, 100]" @on-change="handlePageChange" @on-page-size-change="handlePageSizeChange"></Page>
    </div>
  </div>
</template>

<script>
import {
  Timeline as ITimeline,
  TimelineItem as ITimelineItem,
  Icon as IIcon
} from "iview"
import moment from "moment"

export default {
  name: "archive",
  components: {
    ITimeline,
    ITimelineItem,
    IIcon
  },
  data() {
    return {
      articles: [],
      total: 0,
      current: 1,
      pageSize: 10
    }
  },
  mounted() {
    this.getArticleList(1, 10)
  },
  methods: {
    getArticleList(pageNo, pageSize) {
      this.$Loading.start()
      this.$http.get("/api/home/articleList", {
        params: {
          pageNo,
          pageSize
        }
      }).then(res => {
        this.$Loading.finish()
        const { code, data } = res.body
        if (code === 1) {
          this.articles = data.List
          this.total = data.TotalCount
        } else {
          this.$Message.error("查询文章失败")
        }
      }).catch(err => {
        this.$Loading.error()
        if (err) this.$Message.error("查询文章失败")
      })
    },
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getArticleList(this.current, pageSize)
    },
    handlePageChange(pageNo) {
      this.getArticleList(pageNo, this.pageSize)
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD")
    }
  }
}
</script>

<style scoped lang="scss">
  .archive{
    background-color: #fff;
    padding: 24px 24px;
    .pagination-wrap{
      padding-top: 16px;
    }
  }
  .archive-item{
    .time > .ivu-icon{
      margin-right: 4px;
    }
    .title{
      font-size: 16px;
      font-weight: 700;
      padding: 8px 4px;
    }
    .des{
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 100px;
      margin-bottom: 8px;
      font-size: 14px;
    }
  }
</style>
