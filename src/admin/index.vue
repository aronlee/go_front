<template>
  <div class="layout">
    <Row type="flex">
      <i-col span="5" class="layout-menu-left">
        <Menu 
          :active-name="activeName" 
          theme="dark" 
          width="auto"
          @on-select="selectMenu"
        >
          <div class="layout-logo-left"></div>
          <Menu-item
            v-for="(item, index) in menuData"
            v-bind:key="index"
            :name="item.name"
          >{{item.title}}</Menu-item>
        </Menu>
      </i-col>
      <i-col span="19">
        <div class="layout-header"></div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item href="#">首页</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
        <div class="layout-copy">
          2011-2016 &copy; TalkingData
        </div>
      </i-col>
    </Row>
  </div>
</template>
  
<script>
import {
  Row,
  Menu as IMenu,
  MenuItem as IMenuItem,
  Col as ICol
} from "iview"
import menuData from "./menu.js"
import _ from "underscore"

export default {
  name: "home",
  components: {
    Row,
    ICol,
    IMenu,
    IMenuItem
  },
  data () {
    return {
      activeName: "1",
      menuData: menuData
    }
  },
  created () {
    this.activeName = _.find(menuData, item => {
      return this.$route.path === item.path
    })["name"]
  },
  methods: {
    selectMenu (name) {
      switch (name) {
      case "1":
        this.$router.push("/admin")
        break
      case "2":
        this.$router.push("/admin/list")
        break
      case "3":
        this.$router.push("/admin/add")
        break
      case "4":
        this.$router.push("/admin/tags")
        break
      default:
        break
      }
    }
  }
}
</script>

<style>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 800px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
</style>
  