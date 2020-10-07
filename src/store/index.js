import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';
// import sql from 'mssql'
// import ASD from "../DB/db_config" 

//var test = require("./node_modules/mssql");

Vue.use(Vuex);

//console.log(test)

export default new Vuex.Store({
  // 새로고침시 vuex의 값들이 초기화가 안되게 하는 플러그인(모든 store값들이 다 localstorage에 저장. 나중에 고쳐야 됨.)
  plugins: [
    createPersistedState()
  ],
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false
  },
  mutations: {
    // 로그인이 성공했을 때
    loginSuccess(state, payload){   // payload : actions에서 로그인 성공 시 , 해당 유저의 정보를 담고있는 변수
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
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
