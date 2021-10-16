import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/firebase";
import "./plugins/editor";
import "./error";
import "./plugins/moment";
import "./plugins/toast";
import "./plugins/sweet";
import VueCompositionAPI from "@vue/composition-api";

// Vue.config.productionTip = false;

Vue.config.errorHandler = (err) => {
  console.error("handler@@@", err);
  Vue.prototype.$toasted.global.error(err.message);
};
// Vue.config.errorHandler(new Error(), Vue, "hi");

Vue.use(VueCompositionAPI);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
