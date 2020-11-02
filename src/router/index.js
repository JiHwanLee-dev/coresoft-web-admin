import Vue from "vue"
import VueRouter from "vue-router"
// import Home from "../views/Home.vue";
import Main from "../views/Main.vue"
import store from "../store"
import BoardDetail from "../views/boards/BoardDetail.vue"
//import BoardDetail from "../components/BoardDetail.vue"


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

// 로그인 정보가 남아있다면, Main.vue => Notice.vue 로 리다이렉트 함.
const LoginStatus = (to, from, next) => {
  if(store.state.isLogin === true){
    //alert('?')
    next('/Notice')
    store.state.boardCurrentPageNum = 1
  }else{
    next()
  }
}


const routes = [
  {
    path: "/",
    name: "Main",
    beforeEnter : LoginStatus,
    component: Main
  },
  {
    path: "/notice",
    name: "Notice",
    component: () =>
      // import(/* webpackChunkName: "about" */ "../views/boards/notice/Notice.vue")
      import(/* webpackChunkName: "about" */ "../views/boards/kinds/NoticeList.vue")


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
    path: "/companyHistory",
    name: "CompanyHistory",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/boards/kinds/CompanyHistoryList.vue")
  },
  {
    path: "/archievement",
    name: "Archievement",
    component: () =>
      //import(/* webpackChunkName: "about" */ "../views/Archievement.vue")
      import(/* webpackChunkName: "about" */ "../views/boards/kinds/ArchievementList.vue")
      
      // ,
      // children:[
      //   {
      //     path: "/archievement/Archievement",
      //     name: "ArchievementDetail",
      //     component: () =>
      //       import(/* webpackChunkName: "about" */ "../components/DevResult/DevResultDetail.vue")
      //   }
      // ]
    
  },

  {
    path: "/test2",
    name: "Test2",
    beforeEnter : OnlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/boards/kinds/Test2.vue")
  },







  {
    path: "/noticeDetail",
    name: "NoticeDetail",
    component : BoardDetail
     
  },

  {
    path: "/archievementDetail",
    name: "ArchievementDetail",
    component : BoardDetail
  },

  {
    path: "/companyHistoryDetail",
    name: "CompanyHistoryDetail",
    component : BoardDetail
  },






  // {
  //   path: "/archievement/archievementDetail",
  //   name: "ArchievementDetail",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../components/Archievement/ArchievementDetail.vue")
  // },
  // {
  //   path: "/companyHistory/companyHistoryDetail",
  //   name: "CompanyHistoryDetail",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../components/CompanyHistory/CompanyHistoryDetail.vue")
  // },


  // {
  //   path: "/register",
  //   name: "Register",
  //   beforeEnter : OnlyAuthUser,
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../components/Register.vue")
  // },
  {
    path: "/notice/register",
    name: "NoticeRegister",
    beforeEnter : OnlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/boards/BoardRegister.vue")
  },

  {
    path: "/archievement/register",
    name: "ArchievementRegister",
    beforeEnter : OnlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/boards/BoardRegister.vue")
  },

  {
    path: "/companyHistory/register",
    name: "CompanyHistoryRegister",
    beforeEnter : OnlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/boards/BoardRegister.vue")
  },

  {
    path: "/update",
    name: "Update",
    beforeEnter : OnlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/boards/BoardUpdate.vue")
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
