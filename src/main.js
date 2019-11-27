import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Vant from "vant";
import "vant/lib/index.css";
import topHeader from "./components/publicComponents/topHeader.vue";
import list from "./components/publicComponents/list.vue";
import "@/icons";

import "./assets/stylus/index.styl";
import "./assets/stylus/font.styl";

Vue.use(Vant);
Vue.component("topHeader", topHeader);
Vue.component("list", list);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
