import Vue from "vue";
import Vuex from "vuex";
// import sql from 'mssql'
// import ASD from "../DB/db_config" 

//var test = require("./node_modules/mssql");

Vue.use(Vuex);

//console.log(test)

export default new Vuex.Store({
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false
  },
  mutations: {
    // 로그인이 성공했을 때
    loginSuccess(state){   // payload : actions에서 로그인 성공 시 , 해당 유저의 정보를 담고있는 변수
      state.isLogin = true
      state.isLoginError = false
      //state.userInfo = payload
    },
    // 로그인이 실패했을 때
    
    loginError(state){
      state.isLogin = false
      state.isLoginError = true
    },
  },
  actions: {},
  modules: {}
});
