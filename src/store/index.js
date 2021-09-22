import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {
    setEdit(state, edit) {
      state.editable = edit;
    },
    setFireUser(state, fu) {
      state.fireUser = fu;
    },
  },
  actions: {},
  modules: {},
});