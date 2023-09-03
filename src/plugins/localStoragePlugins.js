export default (store) => {
  // Inisialisasi state Vuex dari localStorage saat aplikasi dimulai
  if (localStorage.getItem("isLoggedIn")) {
    store.commit("setLoggedIn", localStorage.getItem("isLoggedIn"));
  } else {
    store.commit("setLoggedIn", false);
  }
  if (localStorage.getItem("role")) {
    store.commit("setRole", localStorage.getItem("role"));
  } else {
    store.commit("setRole", null);
  }
};
