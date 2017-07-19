<template>
  <div class="comment-ipt-wrap" v-if="showIt">
    <div class="left">
      <div class="img-wrap">
        <img src="../../assets/default-photo.png" alt="">
      </div>
    </div>
    <div class="right">
      <iv-input v-model="comment" class="ipt" type="textarea" :autosize="{minRows: 5, maxRows: 5}" placeholder="写下你的评论"></iv-input>
      <div class="btn-wrap">
        <iv-button type="ghost" size="small" @click="cancleComment">取消</iv-button>
        <iv-button type="primary" size="small" @click="submitComment">发送</iv-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Input as IvInput,
  Button as IvButton
} from "iview"
console.log(IvButton)

export default {
  name: "comment-ipt-wrap",
  components: {
    IvInput,
    IvButton
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      comment: "",
      showIt: this.show
    }
  },
  methods: {
    submitComment() {
      console.log("comment submit")
    },
    cancleComment() {
      this.comment = ""
      this.showIt = false
      console.log("comment cancle")
    }
  }
}
</script>

<style scoped lang="scss">
  .comment-ipt-wrap{
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    .img-wrap{
      width: 48px;
      height: 48px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .left{
      width: 48px;
      margin-right: 16px;
      // flex: 1;
    }
    .right{
      flex: 1;
    }
    .btn-wrap{
      text-align: right;
      padding-top: 12px;
    }
  }
</style>
