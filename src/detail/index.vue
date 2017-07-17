<template>
  <div class="detail">
    <h3 class="title">{{detail.title}}</h3>
    <p>{{formatDate(detail.create_time)}}</p>
    <div class="title-bot">
      <div>
        <Tag v-for="(tag, index) in detail.tags" :key="index">
          <Icon type="pricetag"></Icon>
          {{tag.name}}
        </Tag>
      </div>
      <div class="nums-wrap">
        <div class="nums-item">
          <Icon type="eye"></Icon>
          {{detail.view_num}}
        </div>
        <div class="nums-item">
          <Icon type="chatbubble-working"></Icon>
          {{detail.comment_num}}
        </div>
        <div class="nums-item">
          <Icon type="thumbsup"></Icon>
          {{detail.like_num}}
        </div>
      </div>
    </div>
    <div class="des">
      <div v-html="detail.content"></div>
    </div>
    <div class="comment">
      <Tabs value="name1">
        <Tab-pane label="标签一" name="name1">标签一的内容</Tab-pane>
        <Tab-pane label="标签二" name="name2">标签二的内容</Tab-pane>
        <Tab-pane label="标签三" name="name3">标签三的内容</Tab-pane>
      </Tabs>
      <div class="title">评论</div>
      <div class="me-comment">
      
      </div>
    </div>
  </div>
</template>

<script>
import {
  Icon,
  Tag
} from "iview"
import moment from "moment"

export default {
  name: "detail",
  components: {
    Icon,
    Tag
  },
  data() {
    return {
      detail: {}
    }
  },
  created() {
    this.queryDetail()
  },
  methods: {
    queryDetail() {
      const { id } = this.$route.params
      this.$http.get("/api/home/articleDetail", {
        params: {
          id
        }
      }).then(res => {
        const { code, data } = res.body
        if (code === 1) {
          this.detail = data
        }
      })
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD")
    }
  }
}
</script>

<style lang="scss">
.detail {
  padding: 16px;
  background-color: #fff;
  .title{
    margin-bottom: 16px;
  }
  .title-bot{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .nums-wrap{
    width: 160px;
    display: flex;
    justify-content: space-between;
    .nums-item{
      cursor: pointer;
    }
  }
  .des{
    margin-bottom: 24px;
  }
  .comment{
    .title{
      border-bottom: 1px solid #bcbcbc;
    }
  }
}
</style>
