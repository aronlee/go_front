<template>
  <div class="wrap">
    <div class="nav-wrap">
      <div class="nav">
        <div class="blog-name">Aron's Blog</div>
        <div class="nav-search-wrap">
          <iv-input
            class="nav-search-ipt"
            icon="ios-search"
          ></iv-input>
        </div>
        <iv-menu 
          class="nav-menu" 
          mode="horizontal" 
          theme="primary" 
          active-name="1"
        >
          <iv-menu-item name="1">
              首页
          </iv-menu-item>
          <iv-menu-item name="2">
              blog
          </iv-menu-item>
        </iv-menu>
      </div>
    </div>
    <div class="wrapper-container">
      <div class="article">
        <div class="art-item" v-for="(article, index) in articles" :key="index">
          <p class="title">{{article.title}}</p>
          <Row class="ft">
            <i-col span="18" class="tags-wrap">
              <Tag>angularjs</Tag>
              <Tag>javascript</Tag>
              <Tag>css</Tag>
              <Tag>html</Tag>
            </i-col>
            <i-col span="6" class="ft-r">
              <span>{{article.username}}</span>
              发布于
              <span>{{article.update_time}}</span>
            </i-col>
          </Row>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-inner">
        <div class="copyright"> ©2017 Created by Aron Lee</div>
      </div>
    </div>
  </div>
</template>
  
<script>
import {
  Menu as IvMenu,
  Submenu,
  MenuItem as IvMenuItem,
  RadioGroup,
  Radio,
  Input as IvInput,
  Icon,
  Tag,
  Row,
  Col as ICol
} from "iview"

export default {
  name: "home",
  data () {
    return {
      theme1: "light",
      articles: [],
      total: 0,
      current: 1,
      pageSize: 10
    }
  },
  components: {
    IvMenu,
    Submenu,
    IvMenuItem,
    RadioGroup,
    Radio,
    IvInput,
    Icon,
    Tag,
    Row,
    ICol
  },
  mounted() {
    this.getArticleList(1, 10)
  },
  methods: {
    getArticleList(pageNo, pageSize) {
      this.$http.get("/api/home/articleList", {
        params: {
          pageNo,
          pageSize
        }
      }).then(res => {
        const { code, data } = res.body
        if (code === 1) {
          this.articles = data.List
          this.total = data.TotalCount
        } else {
          this.$Message.error("查询文章失败")
        }
      }).catch(err => {
        if (err) this.$Message.error("查询文章失败")
      })
    }
  }
}
</script>

<style scoped lang="sass">
  $container: 90%;
  .nav-wrap{
    background: #2d8cf0;
    .nav{
      width: $container;
      margin-right: auto;
      margin-left: auto;
      &:after{
        content: "";
        display: block;
        clear: both;
      }
    }
    .blog-name{
      float: left;
      color: #fff;
      font-size: 20px;
      line-height: 60px;
    }
    .nav-menu{
      float: right;
    }
  }
  .wrap{
    background-color: #f1f1f1;
  }
  .wrapper-container{
    width: $container;
    min-height: 200px;
    margin: 30px auto 20px;
    overflow: hidden;
    border-radius: 4px;
  }
  .article{
    background: #fff;
  }
  .footer{
    background-color: #fff;
    .copyright{
      padding-top: 20px;
      padding-bottom: 30px;
    }
  }
  .footer-inner{
    width: $container;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  .nav-search-wrap{
    float:left;
    margin-left: 48px;
    padding-top: 16px;
    width: 400px;
  }
  .art-item{
    padding: 16px;
    .title{
      font-size: 20px;
      font-weight: 700;
      line-height: 30px;
    }
    border-bottom: 1px solid #eee;
  }
</style>
