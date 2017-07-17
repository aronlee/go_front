<template>
  <div>
    <Table :columns="columns" :data="articleList"></Table>
    <div class="page-wrap">
      <Page 
        class="page" 
        :current="current" 
        :total="total" 
        :page-size="pageSize" 
        show-total 
        show-elevator 
        show-sizer 
        :page-size-opts="[5, 10, 20, 30, 40, 100]"
        @on-change="handlePageChange" 
        @on-page-size-change="handlePageSizeChange"
      ></Page>
    </div>
  </div>
</template>

<script>
import columns from "./column"
export default {
  name: "list-article",
  data () {
    return {
      columns,
      articleList: [],
      current: 1,
      pageSize: 5,
      total: 0
    }
  },
  mounted () {
    this.getArticles(this.current, this.pageSize)
  },
  methods: {
    getArticles (pageNo, pageSize) {
      this.$http.get("/api/admin/articleList", {
        params: {
          pageNo,
          pageSize
        }
      }).then(res => {
        const { data, code } = res.body
        if (code !== 1) return
        this.articleList = data.List
        this.total = data.TotalCount
      }).catch(err => {
        if (err) {
          this.$Message.error("查询失败")
        }
      })
    },
    handlePageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.getArticles(this.current, pageSize)
    },
    handlePageChange (pageNo) {
      this.getArticles(pageNo, this.pageSize)
    }
  }
}
</script>

<style scoped lang="scss">
  .page-wrap{
    padding-top: 16px;
    padding-bottom: 16px;
  }
</style>

