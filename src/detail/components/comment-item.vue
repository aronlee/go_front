<template>
  <div class="comment-item">
    <div class="clearfix comment-header">
      <div class="pull-left left">
        <img class="photo" src="../../assets/default-photo.png" alt="">
      </div>
      <div class="pull-left right">
        <p class="comment-name1">{{comment.name}}</p>
        <p class="comment-name1-bot">{{`${comment.floor}楼 · ${formatDate(comment.createTime)}`}}</p>
      </div>
    </div>
    <div class="comment-des">{{comment.content}}</div>
    <div class="comment-bot">
      <div class="comment-bot-item">
        <i-icon type="thumbsup"></i-icon>{{comment.likeNum}}人赞
      </div>
      <div class="comment-bot-item" @click="showReply(comment)">
        <i-icon type="ios-chatbubble-outline"></i-icon>回复
      </div>
    </div>
    <div class="comment-children">
      <comment-child v-for="(item, index) in comment.children" :key="index" :comment="item" @show-reply="showReply(item)"></comment-child>
      <comment-ipt-wrap :showIpt="show" :repliedName="repliedName" @close-ipt="closeIpt"></comment-ipt-wrap>
    </div>
  </div>
</template>

<script>
import {
  Icon as IIcon
} from "iview"
import moment from "moment"
import CommentIptWrap from "./comment-ipt-wrap.vue"
import CommentChild from "./comment-child.vue"

export default {
  name: "comment-item",
  components: {
    IIcon,
    CommentIptWrap,
    CommentChild
  },
  props: {
    comment: {
      type: Object,
      require: true,
      default: {
        children: []
      }
    }
  },
  data() {
    return {
      show: false,
      repliedName: "",
      replies: [
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
    }
  },
  created() {
    console.log(this.show)
    this.replies = this.replies.map((item, index) => {
      return Object.assign({}, item, {
        show: false
      })
    })
  },
  methods: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm")
    },
    showReply(item) {
      this.repliedName = item.name
      this.show = true
    },
    closeIpt() {
      console.log("closeIpt")
      this.show = false
    }
  }
}
</script>

<style>
  
</style>
