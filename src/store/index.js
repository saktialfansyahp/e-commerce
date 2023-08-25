import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    isDesktop: false,
    role: "",
    isLoggedIn: false,
  },
  mutations: {
    setIsDesktop(state, isDesktop) {
      state.isDesktop = isDesktop;
    },
    setLoggedIn(state, newValue) {
      state.isLoggedIn = newValue;
    },
    setRole(state, newRole) {
      state.role = newRole;
    },
  },
  actions: {
    updateIsDesktop({ commit }) {
      const width = window.innerWidth;
      const isDesktop = width >= 1280;
      commit("setIsDesktop", isDesktop);
    },
  },
});

export default store;
