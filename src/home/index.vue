<template>
  <div class="home">
    <div class="article">
      <div class="art-item" v-for="(article, index) in articles" :key="index">
        <p class="title">
          <a href="#/detail">{{article.title}}</a>
        </p>
        <p class="date">
          <Icon type="calendar"></Icon>
          {{formatDate(article.update_time)}}
        </p>
        <p class="summary" v-html="article.content"></p>
        <Row class="ft">
          <i-col span="18" class="tags-wrap">
            <Tag v-for="(tag, index) in article.tags" :key="index">
              <Icon type="pricetag"></Icon>
              {{tag.name}}
            </Tag>
          </i-col>
          <i-col span="6" class="ft-r">
            <div class="nums-wrap">
              <div class="nums-item">
                <Icon type="eye"></Icon>
                {{112}}
              </div>
              <div class="nums-item">
                <Icon type="chatbubble-working"></Icon>
                {{15}}
              </div>
              <div class="nums-item">
                <Icon type="thumbsup"></Icon>
                {{112}}
              </div>
            </div>
          </i-col>
        </Row>
      </div>
    </div>
    <div class="pagination-wrap">
      <Page class="page" :current="current" :total="total" :page-size="pageSize" show-total show-elevator show-sizer :page-size-opts="[5, 10, 20, 30, 40, 100]" @on-change="handlePageChange" @on-page-size-change="handlePageSizeChange"></Page>
    </div>
  </div>
</template>

<script>
import {
  Icon,
  Tag,
  Row,
  Col as ICol
} from "iview"
import moment from "moment"

export default {
  name: "home",
  components: {
    Icon,
    Tag,
    Row,
    ICol
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
      this.$http.get("/api/home/articleList", {
        params: {
          pageNo,
          pageSize
        }
      }).then(res => {
        const { code, data } = res.body
        if (code === 1) {
          this.articles = data.List
          this.total = data.TotalCount
        } else {
          this.$Message.error("查询文章失败")
        }
      }).catch(err => {
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

<style lang="scss">
.article {
  background: #fff;
}

.art-item {
  padding: 16px;
  .title {
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .date {
    margin-bottom: 8px;
  }
  .summary {
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100px;
    margin-bottom: 8px;
  }
  border-bottom: 1px solid #eee;
}

.pagination-wrap {
  padding-top: 16px;
  padding-bottom: 16px;
}

.nums-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
