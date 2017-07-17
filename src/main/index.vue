<template>
  <div class="wrap">
    <div class="nav-wrap">
      <div class="nav">
        <div class="blog-name">Aron's Blog</div>
        <div class="nav-search-wrap">
          <!-- <iv-input class="nav-search-ipt" icon="ios-search"></iv-input> -->
        </div>
        <iv-menu class="nav-menu" mode="horizontal" theme="primary" active-name="1">
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
          <router-view></router-view>
        </i-col>
        <i-col span="8">
          <div class="right">
            <div class="home-card">
              <div class="title">
                <Icon type="document-text"></Icon>
                分类
              </div>
              <div class="des">
                <div class="link-item">
                  <a href="">数据库（6）</a>
                </div>
                <div class="link-item">
                  <a href="">前端（5）</a>
                </div>
                <div class="link-item">
                  <a href="">构建工具（22）</a>
                </div>
                <div class="link-item">
                  <a href="">数据处理（12）</a>
                </div>
                <div class="link-item">
                  <a href="">深度学习（7）</a>
                </div>
              </div>
            </div>
            <div class="home-card">
              <div class="title">
                <Icon type="archive"></Icon>
                文章归档
              </div>
              <div class="des">
                <div class="link-item">
                  <a href="">2017年7月</a>
                </div>
                <div class="link-item">
                  <a href="">2017年6月</a>
                </div>
                <div class="link-item">
                  <a href="">2017年5月</a>
                </div>
                <div class="link-item">
                  <a href="">2017年4月</a>
                </div>
                <div class="link-item">
                  <a href="">2017年3月</a>
                </div>
              </div>
            </div>
            <div class="home-card">
              <div class="title">
                <Icon type="male"></Icon>
                关于博主
              </div>
              <div class="des clearfix">
                <div class="about">
                  <div class="">
                    <p>Aron Lee</p>
                    <p>不知名钱端攻城狮</p>
                    <p>pahuu.com</p>
                    <p>三人行，其必有我师焉</p>
                  </div>
                  <div class="photo-wrap">
                    <img src="../assets/dog_m.jpg" alt="">
                  </div>
                </div>
              </div>
            </div>
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
  name: "main",
  data() {
    return {
      theme1: "light"
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
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
$container: 90%;
.nav-wrap {
  background: #2d8cf0;
  .nav {
    width: $container;
    margin-right: auto;
    margin-left: auto;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
  }
  .blog-name {
    float: left;
    color: #fff;
    font-size: 20px;
    line-height: 60px;
  }
  .nav-menu {
    float: right;
  }
}

.wrap {
  background-color: #f1f1f1;
}

.wrapper-container {
  width: $container;
  min-height: 200px;
  margin: 30px auto 20px;
  overflow: hidden;
  border-radius: 4px;
}

.footer {
  background-color: #fff;
  .copyright {
    padding-top: 20px;
    padding-bottom: 30px;
  }
}

.footer-inner {
  width: $container;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.nav-search-wrap {
  float: left;
  margin-left: 48px;
  padding-top: 16px;
  width: 400px;
}

.home-content {
  // .right{
  //   background-color: #fff;
  //   font-size:14px;
  // }
  // .newest-article{
  //   padding:16px;
  // }
  .article-card {
    margin-bottom: 24px;
  }
}
.home-card{
  background-color: #fff;
  margin-bottom: 8px;
  .title{
    padding: 8px 16px;
    border-bottom: 1px solid #e9eaec;
    font-size: 16px;
  }
  .des{
    padding: 8px 16px;
  }
  .link-item{
    &:not(:last-child){
      margin-bottom: 4px;
    }
    &:hover{
      > a {
        text-decoration: underline;
      }
    }
  }
  .photo-wrap{
    width: 92px;
    height: 92px;
    float: right;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .about{
    display: flex;
    justify-content: space-between;
  }
}

</style>
