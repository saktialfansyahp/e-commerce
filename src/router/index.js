import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignIn from "../views/SignIn.vue";
import AboutView from "../views/AboutView.vue";
import ProductView from "../views/ProductView.vue";
import store from "../store";
// import AdminView from "../views/AdminView.vue";
// import UserView from "../views/UserView.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/home",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signin",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/product",
    name: "Product",
    component: ProductView,
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   path: "/admin",
  //   name: "Admin",
  //   component: AdminView,
  //   meta: { requiresAdmin: true }, // Menandai rute yang memerlukan hak admin
  // },
  // {
  //   path: "/user",
  //   name: "User",
  //   component: UserView,
  //   meta: { requiresUser: true }, // Menandai rute yang memerlukan hak user
  // },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // Jika rute memerlukan otentikasi dan pengguna belum login
  if (requiresAuth && !store.state.isLoggedIn && store.state.role == "") {
    if (to.name !== "signin") {
      next("/signin"); // Arahkan ke halaman login hanya jika bukan halaman login itu sendiri
    } else {
      next(); // Izinkan navigasi jika halaman yang dituju adalah halaman login
    }
  } else {
    next(); // Izinkan navigasi untuk kondisi lain
  }
});
// router.beforeEach((to, from, next) => {
//   // const token = localStorage.getItem("access_token");
//   // const user = localStorage.getItem("user");
//   if (
//     to.matched.some((record) => record.meta.requiresAuth) &&
//     store.state.role == "" &&
//     store.state.isLoggedIn == false
//   ) {
//     // Jika rute yang dituju memerlukan otentikasi dan tidak ada akses token,
//     // maka batalkan navigasi dan arahkan ke halaman login
//     next("/signin");
//   } else {
//     // Jika akses token ada atau rute yang dituju tidak memerlukan otentikasi,
//     // maka izinkan navigasi ke rute yang dituju
//     next();
//   }

//   // const decodedToken = jwt_decode(token);
//   // const expirationDate = new Date(decodedToken.exp * 1000);
//   // if (expirationDate <= new Date()) {
//   //   // localStorage.removeItem('access_token');
//   //   // localStorage.removeItem('user');
//   //   localStorage.clear();
//   //   this.$router.push("/signin");
//   // } else {
//   //   next();
//   // }
// });
export default router;
