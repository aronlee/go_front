<template>
  <div class="wrap">
    <div class="nav-wrap">
      <div class="nav">
        <div class="blog-name">Aron's Blog</div>
        <!-- 搜索 -->
        <div class="nav-search-wrap">
          <!-- <iv-input class="nav-search-ipt" icon="ios-search"></iv-input> -->
        </div>
        <!-- 菜单 -->
        <iv-menu class="nav-menu" mode="horizontal" theme="primary" :active-name="selectedMenu" @on-select="selectMenu">
          <iv-menu-item v-for="(item, index) in menuData" :key="index" :name="item.pathName">
            <Icon v-if="item.icon" :type="item.icon"></Icon>
            {{item.name}}
          </iv-menu-item>
        </iv-menu>
      </div>
    </div>
    <div class="wrapper-container">
      <Row class="home-content" :gutter="32">
        <i-col span="16">
          <!-- 文章列表 -->
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
                <div class="link-item" v-for="(item, index) in categories" :key="index">
                  <!-- <a href="">{{`${item.name}（${item.count}）`}}</a> -->
                  <router-link :to="{ name: 'category', params: { id: item.id } }">
                    {{`${item.name}（${item.count}）`}}
                  </router-link>
                </div>
              </div>
            </div>
            <div class="home-card">
              <div class="title">
                <Icon type="archive"></Icon>
                文章归档
              </div>
              <div class="des">
                <div class="link-item" v-for="(item, index) in archives" :key="index">
                  <router-link :to="{ name: 'archive', params: { date: item.id } }">
                    {{item.date}}
                  </router-link>
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
import menuData from "./menu"

export default {
  name: "main",
  data() {
    const { name } = this.$route
    // this.selectedMenu = name
    console.log(name)
    return {
      theme1: "light",
      selectedMenu: name || 1,
      menuData,
      categories: [
        {
          id: 1,
          name: "数据库",
          count: 6
        },
        {
          id: 2,
          name: "前端",
          count: 5
        },
        {
          id: 3,
          name: "构建工具",
          count: 22
        },
        {
          id: 4,
          name: "学习笔记",
          count: 15
        },
        {
          id: 5,
          name: "数据处理",
          count: 12
        },
        {
          id: 6,
          name: "深度学习",
          count: 7
        }
      ],
      archives: [
        {
          id: "201707",
          date: "2017年7月"
        },
        {
          id: "201706",
          date: "2017年6月"
        },
        {
          id: "201705",
          date: "2017年5月"
        },
        {
          id: "201704",
          date: "2017年4月"
        },
        {
          id: "201703",
          date: "2017年3月"
        }
      ]
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
    const { name } = this.$route
    this.selectedMenu = name
  },
  methods: {
    selectMenu(name) {
      this.$router.push({
        name
      })
      // for (let i = 0; i < menuData.length; i++) {
      //   if (menuData[i].key === name) {
      //     this.$router.push({
      //       name: menuData[i].pathName
      //     })
      //     break
      //   }
      // }
    }
  }
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
