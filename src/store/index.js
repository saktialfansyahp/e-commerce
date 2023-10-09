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
    history: null,
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
    setHistory(state, value) {
      state.history = value;
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
      if (localStorage.getItem("history")) {
        context.commit("setHistory", localStorage.getItem("history"));
      }
    },
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        // Lakukan permintaan HTTP menggunakan Axios
        axios
          .post("/login", credentials)
          .then((response) => {
            commit("setToken", response.data.token);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${this.state.token}`;
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
    register({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        // Lakukan permintaan HTTP menggunakan Axios
        axios
          .post("/register", credentials)
          .then((response) => {
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
          .get("/logout")
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
