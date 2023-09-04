import Vuex from "vuex";
import localStoragePlugin from "../plugins/localStoragePlugins";
import axios from "axios";

const store = new Vuex.Store({
  plugins: [localStoragePlugin],
  state: {
    isDesktop: false,
    role: null,
    token: null,
    isLoggedIn: false,
    openModals: false,
  },
  mutations: {
    setIsDesktop(state, isDesktop) {
      state.isDesktop = isDesktop;
    },
    setModals(state, value) {
      state.openModals = value;
    },
    setLoggedIn(state, newValue) {
      state.isLoggedIn = newValue;
    },
    setRole(state, newRole) {
      state.role = newRole;
    },
    setToken(state, newToken) {
      state.token = newToken;
    },
  },
  actions: {
    updateIsDesktop({ commit }) {
      const width = window.innerWidth;
      const isDesktop = width >= 1280;
      commit("setIsDesktop", isDesktop);
    },
    initializeFromLocalStorage(context) {
      if (localStorage.getItem("isLoggedIn")) {
        context.commit("setLoggedIn", localStorage.getItem("isLoggedIn"));
      }
      if (localStorage.getItem("role")) {
        context.commit("setRole", localStorage.getItem("role"));
      }
    },
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        // Lakukan permintaan HTTP menggunakan Axios
        axios
          .post("http://localhost:8080/login", credentials)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.data.Role.name);
            localStorage.setItem("isLoggedIn", true);
            commit("setLoggedIn", true);
            commit("setRole", response.data.data.Role.name);
            console.log(response);
            resolve();
          })
          .catch((error) => {
            commit("setModals", true);
            reject(error);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:8080/logout")
          .then((response) => {
            commit("setLoggedIn", false);
            commit("setRole", null);
            localStorage.clear();
            console.log(response);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export default store;
