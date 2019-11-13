import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Vant from "vant";
import "vant/lib/index.css";
import topHeader from "./components/publicComponents/topHeader.vue";
import "@/icons";

import "./assets/stylus/index.styl";

Vue.use(Vant);
Vue.component("topHeader", topHeader);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
