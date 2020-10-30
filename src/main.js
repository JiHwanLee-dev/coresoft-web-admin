import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import BoardList from "./components/BoardList"
import BoardRegister from "./components/BoardRegister"
import BoardDetail from "./components/BoardDetail"
import BoardUpdate from "./components/BoardUpdate"
import Test2 from "./components/Test2"

export const pageNumEventBus = new Vue({
  methods : {
    getPageNumEventBus(data){
      this.$emit('getPageNumEventBus', data)
    }
  }
})

// 전역 컴포넌트 등록
Vue.component('BoardList', BoardList)
Vue.component('BoardRegister', BoardRegister)
Vue.component('BoardDetail', BoardDetail)
Vue.component('BoardUpdate', BoardUpdate)
Vue.component('Test2', Test2)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
