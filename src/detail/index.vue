<template>
  <div class="detail">
    <h3 class="title">{{detail.title}}</h3>
    <p>{{formatDate(detail.create_time)}}</p>
    <div class="title-bot">
      <div>
        <i-tag v-for="(tag, index) in detail.tags" :key="index">
          <i-icon type="pricetag"></i-icon>
          {{tag.name}}
        </i-tag>
      </div>
      <div class="nums-wrap">
        <div class="nums-item">
          <i-icon type="eye"></i-icon>
          {{detail.view_num}}
        </div>
        <div class="nums-item">
          <i-icon type="chatbubble-working"></i-icon>
          {{detail.comment_num}}
        </div>
        <div class="nums-item">
          <i-icon type="thumbsup"></i-icon>
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
        <comment-item v-for="(item, index) in comments" :key="index" :comment="item"></comment-item>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Icon as IIcon,
  Tag as ITag
} from "iview"
import moment from "moment"
import CommentItem from "./components/comment-item.vue"

export default {
  name: "detail",
  components: {
    IIcon,
    ITag,
    CommentItem
  },
  data() {
    return {
      detail: {},
      comments: [
        {
          name: "诸司马技",
          content: "随便什么防狼产品，也顶不过一张艾滋病检验单。",
          createTime: "2017-07-14 03:32:25",
          floor: 1,
          likeNum: 11,
          children: [
            {
              name: "Graceland",
              content: "<a href=''>@诸司马技</a>在旅游的时候戴戴平时不用戴",
              createTime: "2017-07-14 03:17:27"
            },
            {
              name: "Mike",
              content: "<a href=''>@诸司马技</a>测试一下",
              createTime: "2017-07-14 03:17:27"
            },
            {
              name: "Maria",
              content: "<a href=''>@Mike</a>在这里你测试啥？",
              createTime: "2017-07-14 03:17:27"
            },
            {
              name: "Graceland",
              content: "<a href=''>@Maria</a>我测试下评论啊",
              createTime: "2017-07-14 03:17:27"
            }
          ]
        },
        {
          name: "三云",
          content: "字写的不错，就是差了点力道",
          createTime: "2017-07-14 03:32:25",
          floor: 2,
          likeNum: 4,
          children: [
            {
              name: "三鹿不加糖",
              content: "<a href=''>@三云</a>确实啊",
              createTime: "2017-07-14 03:17:27"
            },
            {
              name: "领贤商业设计",
              content: "<a href=''>@三鹿不加糖</a>每次买糯米家的都退了,图片好看,实物......无法描述",
              createTime: "2017-07-14 03:17:27"
            },
            {
              name: "A浪里白条一字帅",
              content: "<a href=''>@三云</a>彼得潘大叔的裙子不只这个价格吧",
              createTime: "2017-07-14 03:17:27"
            },
            {
              name: "乔治妹妹",
              content: "<a href=''>@三云</a>糯米家的也就那样吧，今年入了两件短袖，有一件洗一水烂了个洞",
              createTime: "2017-07-14 03:17:27"
            }
          ]
        },
        {
          name: "方方芳芳",
          content: "语气模仿得好像得呀😄",
          createTime: "2017-07-14 03:32:25",
          floor: 3,
          likeNum: 6,
          children: [
            {
              name: "江昭和",
              content: "<a href=''>@方方芳芳</a>谢谢了呀。",
              createTime: "2017-07-14 03:17:27"
            }
          ]
        },
        {
          name: "逗小北",
          content: "写得真好。",
          createTime: "2017.07.18 13:32",
          floor: 4,
          likeNum: 22,
          children: []
        }
      ]
    }
  },
  created() {
    this.queryDetail()
  },
  methods: {
    queryDetail() {
      const { id } = this.$route.params
      this.$Loading.start()
      this.$http.get("/api/home/articleDetail", {
        params: {
          id
        }
      }).then(res => {
        this.$Loading.finish()
        const { code, data } = res.body
        if (code === 1) {
          this.detail = data
        }
      }).catch(() => {
        this.$Loading.error()
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

.comment-header {
  .photo {
    width: 48px;
    height: 48px;
  }
  .right {
    margin-left: 16px;
  }
}

.comment {
  .comment-item {
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px dotted #f1f1f1;
  }
  .comment-des {
    font-size: 14px;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .comment-bot {
    margin-bottom: 16px;
  }
  .comment-children {
    border-left: 2px solid #e1e1e1;
    padding-left: 24px;
  }
  .comment-bot-item {
    display: inline-block;
    margin-right: 8px;
    cursor: pointer;
    .ivu-icon {
      margin-right: 4px;
    }
  }
  .comment-name1 {
    font-size: 16px;
    margin-bottom: 4px;
    color: #212121;
  }
  .comment-name1-bot {
    font-size: 12px;
    color: #757575;
  }
}
</style>
