<template>
  <div class="comment-ipt-wrap" :class="{ narrow: isNarrow }" v-if="showIpt">
    <div class="left">
      <div class="img-wrap">
        <img src="../../assets/default-photo.png" alt="">
      </div>
    </div>
    <div class="right">
      <iv-input v-model="comment" class="ipt" type="textarea" placeholder="写下你的评论" @on-blur="blurIpt" @on-focus="focusIpt"></iv-input>
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

export default {
  name: "comment-ipt-wrap",
  components: {
    IvInput,
    IvButton
  },
  props: {
    showIpt: {
      type: Boolean,
      require: true,
      default: false
    },
    repliedName: String
  },
  data() {
    return {
      comment: "",
      isNarrow: true,
      rows: 1
    }
  },
  beforeUpdate() {
  },
  watch: {
    repliedName(newValue, oldValue) {
      this.comment = `@${this.repliedName} `
    }
  },
  methods: {
    submitComment() {
      console.log("comment submit")
    },
    cancleComment() {
      this.comment = ""
      this.$emit("close-ipt")
    },
    focusIpt() {
      this.isNarrow = false
    },
    blurIpt() {
      this.isNarrow = true
    }
  }
}
</script>

<style lang="scss">
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
    textarea.ivu-input{
      resize: none;
      height: 115px;
      transition: height .2s ease-in-out,border .2s ease-in-out,background .2s ease-in-out,-webkit-box-shadow .2s ease-in-out;
    }
    &.narrow {
      .ivu-input{
        height: 31px;
      }
    }
  }
</style>
