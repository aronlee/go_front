<template>
  <div class="home">
    <div class="article">
      <transition-group
        name="art-item"
        tag="div"
      >
        <div class="art-item" v-for="article in articles" :key="article.a_i_d" :data-index="index">
          <p class="title">
            <router-link :to="{ name: 'detail', params: { id: article.a_i_d } }">
              {{article.title}}
            </router-link>
          </p>
          <p class="date">
            <i-icon type="calendar"></i-icon>
            {{formatDate(article.update_time)}}
          </p>
          <p class="summary" v-html="article.content"></p>
          <i-row class="ft">
            <i-col span="18" class="tags-wrap">
              <i-tag v-for="(tag, index) in article.tags" :key="index">
                <i-icon type="pricetag"></i-icon>
                {{tag.name}}
              </i-tag>
            </i-col>
            <i-col span="6" class="ft-r">
              <div class="nums-wrap">
                <div class="nums-item">
                  <i-icon type="eye"></i-icon>
                  {{112}}
                </div>
                <div class="nums-item">
                  <i-icon type="chatbubble-working"></i-icon>
                  {{15}}
                </div>
                <div class="nums-item">
                  <i-icon type="thumbsup"></i-icon>
                  {{112}}
                </div>
              </div>
            </i-col>
          </i-row>
        </div>
      </transition-group>
    </div>
    <div class="pagination-wrap">
      <Page class="page" :current="current" :total="total" :page-size="pageSize" show-total show-elevator show-sizer :page-size-opts="[5, 10, 20, 30, 40, 100]" @on-change="handlePageChange" @on-page-size-change="handlePageSizeChange"></Page>
    </div>
  </div>
</template>

<script>
import {
  Icon as IIcon,
  Tag as ITag,
  Row as IRow
} from "iview"
import moment from "moment"
import Velocity from "velocity-animate"

export default {
  name: "home",
  components: {
    IIcon,
    ITag,
    IRow
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
    },
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
      console.log("beforeEnter")
    },
    enter(el, done) {
      console.log(el.dataset.index)
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: 234 },
          { complete: done }
        )
      }, delay)
      console.log("enter")
    },
    leave(el, done) {
      console.log(el.dataset.index)
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
      console.log("leave")
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
  transition: all .8s;
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
.art-item-enter, .art-item-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.art-item-leave-active {
  position: absolute;
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
