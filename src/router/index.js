import Vue from "vue"
import VueRouter from "vue-router"
// import Home from "../views/Home.vue";
import Main from "../views/Main.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
  },
  {
    path: "/notice",
    name: "Notice",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Notice.vue")
  },
  {
    path: "/notice/noticeDetail",
    name: "NoticeDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Notice/NoticeDetail.vue")
  },
  {
    path: "/companyHistory",
    name: "CompanyHistory",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CompanyHistory.vue")
  },
  {
    path: "/archievement",
    name: "Archievement",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Archievement.vue")
      
      // ,
      // children:[
      //   {
      //     path: "/devResult/devResultDetail",
      //     name: "DevResultDetail",
      //     component: () =>
      //       import(/* webpackChunkName: "about" */ "../components/DevResult/DevResultDetail.vue")
      //   }
      // ]
    
  }
  ,
  {
    path: "/archievement/archievementDetail",
    name: "ArchievementDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Archievement/ArchievementDetail.vue")
  },
  {
    path: "/companyHistory/companyHistoryDetail",
    name: "CompanyHistoryDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/CompanyHistory/CompanyHistoryDetail.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Register.vue")
  },
  {
    path: "/update",
    name: "Update",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Update.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
