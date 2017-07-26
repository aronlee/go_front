import Vue from "vue"
import VueResource from "vue-resource"
import VueRouter from "vue-router"
import routes from "./routes.js"
import IView from "iview"
import "iview/dist/styles/iview.css"
import "./index.css"

Vue.use(VueRouter)
Vue.use(IView)
Vue.use(VueResource)

const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach((to, from, next) => {
  IView.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  IView.LoadingBar.finish()
})

new Vue({
  router
}).$mount("#app")

Vue.http.interceptors.push((request, next) => {
//   const host = "http://127.0.0.1:8080/"
//   if(request.url){
//     request.url = host + request.url.replace(/^\//,"")
//   }
  next((response) => {
    return response
  })
})
