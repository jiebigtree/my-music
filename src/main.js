import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Cube from "cube-ui";
import topHeader from './components/publicComponents/topHeader.vue'

import './assets/stylus/index.styl'

Vue.use(Cube);
Vue.component("topHeader",topHeader)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
