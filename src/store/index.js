import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    activedMenuItem: "",
  },

  getters: {
    // activedMenuItem(state) {
    //   window.localStorage.setItem("activedItem", state.activedMenuItem);
    // },
  },
});
