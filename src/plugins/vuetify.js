import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import en from "vuetify/es5/locale/en";
import ko from "vuetify/es5/locale/ko";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { en, ko },
    current: "ko",
  },
});
