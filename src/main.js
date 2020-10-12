import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import BoardList from "./components/BoardList"
import BoardRegister from "./components/BoardRegister"
import BoardDetail from "./components/BoardDetail"

// 전역 컴포넌트 등록
Vue.component('BoardList', BoardList)
Vue.component('BoardRegister', BoardRegister)
Vue.component('BoardDetail', BoardDetail)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
