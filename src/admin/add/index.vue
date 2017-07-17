<template>
  <div>
    <div class="form-item">
      <label class="form-item-l">文章标题</label>
      <div class="form-item-r">
        <i-input v-model="title"></i-input>
      </div>
    </div>
    <div class="form-item">
      <label class="form-item-l">文章标签</label>
      <div class="form-item-r">
        <Tag 
          v-for="(item, index) in tags" 
          v-bind:key="index"
          closable
          @on-close="removeTag(item)"
        >{{item.name}}</Tag>
        <div class="add-tag-wrap">
          <Button 
            icon="ios-plus-empty" 
            type="dashed" 
            size="small"
            v-show="!showSelect"
            @click="handleShow"
          >添加标签</Button>
          <i-select 
            v-model="selectedTag" 
            style="width:200px"
            v-if="showSelect"
            @on-change="selectTag"
            @blur="selectBlur"
          >
              <i-option 
                v-for="(item, index) in tagList" 
                :value="item.t_i_d" 
                :key="index"
              >{{item.name}}</i-option>
          </i-Select>
        </div>
      </div>
    </div>
    <div id="editor-container"></div>
    <div class="add-bottom-wrap">
      <Button 
        type="primary"
        @click="addSubmit"
      >提交</Button>
    </div>
  </div>
</template>

<script>
import {
  Input as IInput,
  Select as ISelect,
  Option as IOption
} from "iview"
import _ from "underscore"
import E from "wangeditor"
import xss from "xss"

export default {
  name: "add-article",
  components: {
    IInput,
    ISelect,
    IOption
  },
  data () {
    return {
      title: "",
      tags: [],
      tagList: [],
      selectedTag: "",
      showSelect: false,
      editorContent: ""
    }
  },
  mounted () {
    var editor = new E("#editor-container")
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
      this.editorText = editor.txt.text()
    }
    editor.customConfig.zIndex = 800
    editor.create()
    this.queryTags()
  },
  methods: {
    removeTag (item) {
      this.tags = _.filter(this.tags, (tag) => {
        return tag.t_i_d !== item.t_i_d
      })
    },
    selectTag (e) {
      this.showSelect = false
      const addedTag = _.find(this.tags, item => {
        return item.t_i_d === this.selectedTag
      })
      if (addedTag) {
        this.$Message.error("不能选择相同tag")
        return
      }
      this.tags.push(this.filterTag(this.selectedTag))
    },
    filterTag (id) {
      return _.find(this.tagList, item => {
        return id === item.t_i_d
      })
    },
    handleShow () {
      this.selectedTag = ""
      this.showSelect = true
    },
    selectBlur () {
      this.showSelect = false
    },
    addSubmit () {
      const tagIds = this.tags.map(item => {
        return item.t_i_d
      })
      this.$http.post("/api/admin/addArticle", {
        title: this.title,
        content: xss(this.editorContent),
        txt: this.editorText,
        css: "",
        tags: tagIds
      }).then(res => {
        const { code } = res.body
        if (code === 1) {
          this.$Message.success("发布成功")
        } else {
          this.$Message.error("发布失败")
        }
      })
    },
    queryTags () {
      this.$http.get("/api/admin/tagList").then(res => {
        const { data, code } = res.body
        if (code === 1) {
          this.tagList = data.List
          this.total = data.TotalCount
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .form-item-l{
    width: 100px;
    float: left;
    line-height: 32px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 20px;
  }
  .form-item-r{
    margin-left: 100px;
    position: relative;
    line-height: 32px;
    font-size: 12px;
  }
  .add-tag-wrap{
    display: inline-block;
  }
  #editor-container{
    margin-top: 16px;
  }
  .add-bottom-wrap{
    text-align: center;
    padding: 32px;
  }
</style>

