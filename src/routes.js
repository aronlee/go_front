
// components
import Login from "./login/index.vue"
import Home from "./home/index.vue"
import Admin from "./admin/index.vue"
import AdminHome from "./admin/index/index.vue"
import ArticleList from "./admin/list/index.vue"
import AddArticle from "./admin/add/index.vue"
import Tags from "./admin/tags/index.vue"

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
    children: [
      {
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
