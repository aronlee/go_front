// components
import Login from "./login/index.vue"

import Admin from "./admin/index.vue"
import AdminHome from "./admin/index/index.vue"
import ArticleList from "./admin/list/index.vue"
import AddArticle from "./admin/add/index.vue"
import Tags from "./admin/tags/index.vue"

import Main from "./main/index.vue"
import Home from "./home/index.vue"
import Detail from "./detail/index.vue"
import Archive from "./archive/index.vue"
import RSS from "./rss/index.vue"
// import List from "./list/index.vue"
import Category from "./category/index.vue"

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/",
    component: Main,
    children: [
      { // 首页
        path: "",
        name: "home",
        component: Home
      },
      {
        path: "category/:id",
        name: "category",
        component: Category
      },
      { // 归档
        path: "archive/:date?",
        name: "archive",
        component: Archive
      },
      { // rss订阅
        path: "rss",
        name: "rss",
        component: RSS
      },
      { // 详情页
        path: "detail/:id",
        name: "detail",
        component: Detail
      }
    ]
  },
  {
    path: "/admin",
    component: Admin,
    children: [{
      path: "",
      component: AdminHome
    },
    {
      path: "list",
      component: ArticleList
    },
    {
      path: "add",
      component: AddArticle
    },
    {
      path: "tags",
      component: Tags
    }
    ]
  }
]

export default routes
