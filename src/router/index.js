import Vue from "vue"
import VueRouter from "vue-router"
// import Home from "../views/Home.vue";
import Main from "../views/Main.vue"
import store from "../store"


Vue.use(VueRouter)

// 가드함수(redirect)
const OnlyAuthUser = (to, from, next) => {
  if(store.state.isLogin === false){
    // 아직 로그인이 안된 유저면 로그인 화면으로 리다이렉트 시킴
    alert('로그인을 해주세요.')
    next('/')
  }else{
    next()
  }
}


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
      import(/* webpackChunkName: "about" */ "../views/boards/notice/Notice.vue")
      // ,
      // children:[
      //   {
      //     path: "noticeDetail",
      //     name: "NoticeDetail",
      //     component: () =>
      //       import(/* webpackChunkName: "about" */ "../components/Notice/NoticeDetail.vue")
      //   }
      // ]
  },

  {
    path: "/noticeDetail",
    name: "NoticeDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/boards/notice/NoticeDetail.vue")
  },

  {
    path: "/companyHistory",
    name: "CompanyHistory",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/boards/companyhistory/CompanyHistory.vue")
  },
  {
    path: "/archievement",
    name: "Archievement",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Archievement.vue")
      
      // ,
      // children:[
      //   {
      //     path: "/archievement/Archievement",
      //     name: "ArchievementDetail",
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
  // {
  //   path: "/register",
  //   name: "Register",
  //   beforeEnter : OnlyAuthUser,
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../components/Register.vue")
  // },
  {
    path: "/register",
    name: "NoticeRegister",
    beforeEnter : OnlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/boards/notice/NoticeRegister.vue")
  },
  {
    path: "/update",
    name: "Update",
    beforeEnter : OnlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Update.vue")
  },
  {
    path: "/test",
    name: "Test",
    beforeEnter : OnlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TEST.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
