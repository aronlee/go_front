<template>
  <div class="comment-child">
    <p>
      <a class="comment-name2">{{comment.name}}</a>： 
      <span class="comment-content" v-html="comment.content"></span>
    </p>
    <p>
      <span class="comment-child-time">{{formatDate(comment.createTime)}}</span>
      <span class="comment-child-comment" @click="showReply"><Icon type="ios-chatbubble-outline"></Icon>回复</span>
    </p>
  </div>
</template>

<script>
import moment from "moment"

export default {
  name: "comment-child",
  props: {
    comment: {
      type: Object,
      require: true,
      default: {}
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm")
    },
    showReply() {
      this.$emit("show-reply")
    }
  }
}
</script>

<style lang="scss">
  .comment-child{
    padding-top: 8px;
    padding-bottom: 8px;
    .comment-content > a {
      margin-right: 4px;
    }
  }
  .comment-name2{
    // color: blue;
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
</style>
