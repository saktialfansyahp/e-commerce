import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import AboutView from "../views/AboutView.vue";
import AddProductView from "../views/adminpage/AddProductView.vue";
import EditProductView from "../views/adminpage/EditProductView.vue";
import ProductView from "../views/ProductView.vue";
import store from "../store";
import jwt_decode from "jwt-decode";
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
    path: "/signup",
    name: "Sign Up",
    component: SignUp,
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: {
      breadcrumb: "Home",
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: {
      breadcrumb: "About",
      requiresAuth: true,
    },
  },
  {
    path: "/about/addproduct",
    name: "Add Product",
    component: AddProductView,
    meta: {
      breadcrumb: "Add Product",
      requiresAuth: true,
    },
  },
  {
    path: "/about/editproduct/:id",
    name: "Edit Product",
    component: EditProductView,
    meta: {
      breadcrumb: "Edit Product",
      requiresAuth: true,
    },
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
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  const requiresUser = to.matched.some((record) => record.meta.requiresUser);

  if (requiresAuth && !store.state.isLoggedIn && store.state.role == null) {
    if (to.name !== "signin") {
      next("/signin");
    } else {
      next();
    }
  } else if (requiresAdmin && store.state.role === "admin") {
    next();
  } else if (requiresUser && store.state.role === "user") {
    next();
  } else {
    next();
  }
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const expirationDate = new Date(decodedToken.exp * 1000);
  if (expirationDate <= new Date()) {
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('user');
    localStorage.clear();
    this.$router.push("/signin");
  } else {
    next();
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
