<template>
  <div>
    <div class="tags-add-wrap">
      <Button icon="plus" @click="showAdd" v-show="!show">增加</Button>
      <div class="tags-ipt-wrap" v-show="show">
        <i-input v-model="inputTag" @on-enter="submitAdd" @on-blur="blurAdd"></i-input>
      </div>
    </div>
    <Table :columns="columns1" :data="tagList">
    </Table>
    <div class="page-wrap">
      <Page class="page" :current="current" :total="total" :page-size="pageSize" show-total show-elevator show-sizer :page-size-opts="[5, 10, 20, 30, 40, 100]" @on-change="handlePageChange" @on-page-size-change="handlePageSizeChange"></Page>
    </div>
  </div>
</template>

<script>
export default {
  name: "list-article",
  data () {
    return {
      columns1: [
        {
          title: "id",
          key: "t_i_d"
        },
        {
          title: "tag名",
          key: "name"
        },
        {
          title: "创建人id",
          key: "u_i_d"
        },
        {
          title: "创建时间",
          key: "create_time"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Button", {
                props: {
                  type: "error",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.deleteTag(params.row, params.index)
                  }
                }
              }, "删除")
            ])
          }
        }
      ],
      tagList: [],
      current: 1,
      pageSize: 5,
      total: 0,
      show: false,
      inputTag: ""
    }
  },
  created () {
    this.queryTags(1, this.pageSize)
  },
  methods: {
    showAdd () {
      this.show = true
    },
    submitAdd () {
      const params = {
        name: this.inputTag
      }
      this.$http.post("/api/admin/addTag", params)
        .then(res => {
          switch (res.body.code) {
          case 1:
            this.$Message.success("添加成功")
            this.show = false
            this.inputTag = ""
            this.tagList.push(res.body.data)
            this.total++
            break
          case 1001:
            this.$Message.error("添加失败")
            break
          default:
            break
          }
        })
        .catch(err => {
          if (err) {
            this.$Message.error("修改失败")
          }
        })
    },
    blurAdd () {
      this.inputTag = ""
      this.show = false
    },
    queryTags (pageNo, pageSize) {
      this.$http.get("/api/admin/tagList", {
        params: {
          pageNo,
          pageSize
        }
      }).then(res => {
        const { data, code } = res.body
        if (code === 1) {
          this.tagList = data.List
          this.total = data.TotalCount
        }
      })
    },
    deleteTag (tag, index) {
      if (!tag || !tag.t_i_d) return
      this.$http.post("/api/admin/deleteTag", {
        id: tag.t_i_d
      }).then(res => {
        const { code } = res.body
        if (code === 1) {
          this.tagList.splice(index, 1)
          this.$Message.success("删除成功")
        }
      }).catch(err => {
        if (err) {
          this.$Message.error("删除失败")
        }
      })
    },
    handlePageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.queryTags(this.current, pageSize)
    },
    handlePageChange (pageNo) {
      this.queryTags(pageNo, this.pageSize)
    }
  }
}
</script>

<style scoped lang="sass">
  .tags-add-wrap{
    text-align: right;
    padding: 16px 0;
    &:after{
      content: "";
      display: block;
      clear: both;
    }
  }
  .tags-ipt-wrap{
    width: 100px;
    float: right;
  }
  .page{
    width: 572px;
    float: right;
  }
  .page-wrap{
    padding: 16px 0;
    &:after{
      content: "";
      display: block;
      clear: both;
    }
  }
</style>

