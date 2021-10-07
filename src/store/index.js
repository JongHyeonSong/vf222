import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    a1: 1,
    a2: 2,
    hi: 33,
    user: "WOW",
  },
  mutations: {
    setEdit(state, edit) {
      state.editable = edit;
    },
    setFireUser(state, fu) {
      state.fireUser = fu;
    },
    setUser(state, user) {
      state.user = user;
    },
    setHi(state, text) {
      state.hi = "@(@(";
    },
  },
  actions: {},
  modules: {},
});
