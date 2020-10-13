import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  // 새로고침시 vuex의 값들이 초기화가 안되게 하는 플러그인(모든 store값들이 다 localstorage에 저장. 나중에 고쳐야 됨.)
  plugins: [
    createPersistedState()
  ],

  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false,
    years : [
      '2020','2019','2018','2017','2016','2015'
    ],
    month : [
      '01','02','03','04','05','06','07','08','09','10','11','12'
    ],
    boardName : null,
    boardCurrentPageNum : 0,

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

    // 로그아웃 버튼 클릭 시 동작
    logout(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
    },

    // 현재 유저가 보고있는 게시판 이름
    currentBoardName(state, payload){
      state.boardName = payload
    },

    // 현재 게시판 페이지 번호
    currentBoardPageNum(state, payload){
      state.boardCurrentPageNum = payload
    }
  },

  actions: {},
  modules: {}
});
