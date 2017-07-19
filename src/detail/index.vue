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
    <div class="me-comment">
      <div class="comment-box">
        <div class="left">
          <img src="../assets/default-photo.png" alt="">
        </div>
        <div class="right">
          <Input class="ipt-content" type="textarea" :autosize="{minRows: 5, maxRows: 5}" placeholder="写下你的评论"></Input>
          <div class="btns-comment">
            <Button type="ghost">取消</Button>
            <Button type="primary">发送</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="comment">
      <Tabs value="name1">
        <Tab-pane :label="`评论(${detail.comment_num})`" name="name1"></Tab-pane>
      </Tabs>
      <div class="comment-list">
        <div class="comment-item">
          <div class="clearfix comment-header">
            <div class="pull-left left">
              <img class="photo" src="../assets/default-photo.png" alt="">
            </div>
            <div class="pull-left right">
              <p class="comment-name1">诸司马技</p>
              <p class="comment-name1-bot">2楼 · 2017.07.18 13:32</p>
            </div>
          </div>
          <div class="comment-des">随便什么防狼产品，也顶不过一张艾滋病检验单。</div>
          <div class="comment-bot">
            <div class="comment-bot-item">
              <Icon type="thumbsup"></Icon>11人赞
            </div>
            <div class="comment-bot-item">
              <Icon type="ios-chatbubble-outline"></Icon>回复
            </div>
          </div>
          <div class="comment-children">
            <div class="comment-child-item">
              <p>
                <a class="comment-name2">Graceland</a>： 
                <a class="comment-name3">@诸司马技</a>在旅游的时候戴戴 平时不用戴
              </p>
              <p>
                <span class="comment-child-time">2017.07.18 13:48</span>
                <span class="comment-child-comment"><Icon type="ios-chatbubble-outline"></Icon>回复</span>
              </p>
            </div>
            <div class="comment-child-item">
              <p>
                <a class="comment-name2">Graceland</a>： 
                <a class="comment-name3">@诸司马技</a>在旅游的时候戴戴 平时不用戴
              </p>
              <p>
                <span class="comment-child-time">2017.07.18 13:48</span>
                <span class="comment-child-comment"><Icon type="ios-chatbubble-outline"></Icon>回复</span>
              </p>
            </div>
            <div class="comment-child-item">
              <p>
                <a class="comment-name2">Graceland</a>： 
                <a class="comment-name3">@诸司马技</a>在旅游的时候戴戴 平时不用戴
              </p>
              <p>
                <span class="comment-child-time">2017.07.18 13:48</span>
                <span class="comment-child-comment"><Icon type="ios-chatbubble-outline"></Icon>回复</span>
              </p>
            </div>
            <div class="comment-child-item">
              <p>
                <a class="comment-name2">Graceland</a>： 
                <a class="comment-name3">@诸司马技</a>在旅游的时候戴戴 平时不用戴
              </p>
              <p>
                <span class="comment-child-time">2017.07.18 13:48</span>
                <span class="comment-child-comment"><Icon type="ios-chatbubble-outline"></Icon>回复</span>
              </p>
            </div>
            <comment-ipt-wrap :show="true"></comment-ipt-wrap>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Icon,
  Tag
} from "iview"
import CommentIptWrap from "./components/comment-ipt-wrap.vue"
import moment from "moment"

export default {
  name: "detail",
  components: {
    Icon,
    Tag,
    CommentIptWrap
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
  padding: 24px;
  background-color: #fff;
  .title {
    margin-bottom: 16px;
  }
  .title-bot {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .nums-wrap {
    width: 160px;
    display: flex;
    justify-content: space-between;
    .nums-item {
      cursor: pointer;
    }
  }
  .des {
    margin-bottom: 24px;
  }
  .comment {
    .title {
      border-bottom: 1px solid #bcbcbc;
    }
  }
  .comment-box {
    width: 100%;
    display: flex;
    .left {
      >img {
        width: 64px;
        height: 64px;
      }
      padding-right: 16px;
    }
    .right {
      flex: 1;
    }
  }
  .ipt-content {
    width: 100%;
    textarea {
      resize: none;
    }
  }
  .btns-comment {
    padding-top: 16px;
    padding-bottom: 16px;
    text-align: right;
  }
}
.comment-header{
  .photo{
    width: 48px;
    height: 48px;
  }
  .right{
    margin-left: 16px;
  }
}
.comment{
  .comment-item{
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px dotted #f1f1f1;
  }
  .comment-des{
    font-size: 14px;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .comment-bot{
    margin-bottom: 16px;
  }
  .comment-children{
    border-left: 2px solid #e1e1e1;
    padding-left: 24px;
  }
  .comment-child-item{
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .comment-bot-item{
    display: inline-block;
    margin-right: 8px;
    cursor: pointer;
    .ivu-icon{
      margin-right: 4px;
    }
  }
  .comment-name1{
    font-size: 16px;
    margin-bottom: 4px;
    color: #212121;
  }
  .comment-name1-bot{
    font-size: 12px;
    color: #757575;
  }
  .comment-name2{
    // color: blue;
  }
  .comment-name3{
    // color: blue;
    
    margin-right: 4px;
  }
  .comment-child-time{
    font-size: 12px;
    color: #757575;
    margin-right: 12px;
  }
  .comment-child-comment{
    cursor: pointer;
    .ivu-icon{
      margin-right: 4px;
    }
  }
}
</style>
