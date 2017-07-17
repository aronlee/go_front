// components
import Login from "./login/index.vue"
import Home from "./home/index.vue"
import Admin from "./admin/index.vue"
import AdminHome from "./admin/index/index.vue"
import ArticleList from "./admin/list/index.vue"
import AddArticle from "./admin/add/index.vue"
import Tags from "./admin/tags/index.vue"
import Technology from "./technology/index.vue"
import Detail from "./detail/index.vue"
import Note from "./note/index.vue"
import Archive from "./archive/index.vue"

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/",
    component: Home
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
  },
  { // 详情页
    path: "/detail",
    component: Detail
  },
  { // 技术类
    path: "/technology",
    component: Technology
  },
  { // 笔记类
    path: "/note",
    component: Note
  },
  { // 归档
    path: "/archive",
    component: Archive
  }
]

export default routes
