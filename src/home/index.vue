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
            <Icon type="social-javascript"></Icon>
              技术
          </iv-menu-item>
          <iv-menu-item name="3">
            <Icon type="compose"></Icon>
              笔记
          </iv-menu-item>
          <iv-menu-item name="4">
            <Icon type="ios-calendar"></Icon>
              归档
          </iv-menu-item>
          <iv-menu-item name="5">
            <Icon type="social-rss"></Icon>
              订阅
          </iv-menu-item>
        </iv-menu>
      </div>
    </div>
    <div class="wrapper-container">
      <Row class="home-content" :gutter="32">
        <i-col span="16">
          <div class="article">
            <div class="art-item" v-for="(article, index) in articles" :key="index">
              <p class="title">{{article.title}}</p>
              <Row class="ft">
                <i-col span="18" class="tags-wrap">
                  <Tag v-for="(tag, index) in article.tags" :key="index">{{tag.name}}</Tag>
                </i-col>
                <i-col span="6" class="ft-r">
                  <span>{{article.username}}</span>
                  发布于
                  <span>{{article.update_time}}</span>
                </i-col>
              </Row>
            </div>
          </div>
          <div class="pagination-wrap">
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
        </i-col>
        <i-col span="8">
          <div class="right">
            <Card class="article-card article-classification" shadow>
              <p slot="title">
                <Icon type="document-text"></Icon>
                分类
              </p>
              <div class="item">
                <a href="">数据库（6）</a>
              </div>
              <div class="item">
                <a href="">前端（5）</a>
              </div>
              <div class="item">
                <a href="">构建工具（22）</a>
              </div>
              <div class="item">
                <a href="">数据处理（12）</a>
              </div>
              <div class="item">
                <a href="">深度学习（7）</a>
              </div>
            </Card>
            <Card class="article-card article-tags" shadow>
              <p slot="title">
                <Icon type="pricetags"></Icon>
                标签
              </p>
              <Tag>nodejs</Tag>
              <Tag>java</Tag>
              <Tag>c++</Tag>
              <Tag>ruby</Tag>
              <Tag>mysql</Tag>
              <Tag>angularjs</Tag>
              <Tag>react</Tag>
              <Tag>c#</Tag>
            </Card>
            <Card class="article-card article-archive" shadow>
              <p slot="title">
                <Icon type="pricetags"></Icon>
                文章归档
              </p>
              <p>2017年7月</p>
              <p>2017年6月</p>
              <p>2017年5月</p>
              <p>2017年4月</p>
              <p>2017年3月</p>
              <p>...</p>
            </Card>
            <Card class="article-card about-me" shadow>
              <p slot="title">
                <Icon type="pricetags"></Icon>
                关于博主
              </p>
              <p>新浪微博</p>
              <p>qq</p>
              <p>微信</p>
            </Card>
          </div>
        </i-col>
      </Row>
      
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
    },
    handlePageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.getArticleList(this.current, pageSize)
    },
    handlePageChange (pageNo) {
      this.getArticleList(pageNo, this.pageSize)
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
  .pagination-wrap{
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .home-content{
    // .right{
    //   background-color: #fff;
    //   font-size:14px;
    // }
    // .newest-article{
    //   padding:16px;
    // }
    .article-card{
      margin-bottom: 24px;
    }
  }
</style>
