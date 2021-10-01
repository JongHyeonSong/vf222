import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/firebase";
import "./plugins/editor";
import "./error";
import "./plugins/moment";
// Vue.config.productionTip = false;

// Vue.config.errorHandler = (err) => {
//   console.log("handler@@@", err);
// };
// Vue.config.errorHandler(new Error(), Vue, "hi");

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
