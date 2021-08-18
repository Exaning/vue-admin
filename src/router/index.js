import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      let token = window.localStorage.getItem("token");
      if (token) {
        return next("/home");
      } else {
        return next("/login");
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/Home.vue"),
    children: [
      {
        path: "/welcome",
        name: "Welcome",
        component: () => import("@/components/welcome/Welcome.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

// 导航守卫
// 注意：next() 之前必须写 return
router.beforeEach((to, from, next) => {
  // 如果用户在地址栏手动输入 login
  if (to.path == "/login") {
    return next();
  }

  // token 验证
  let token = window.localStorage.getItem("token");
  if (!token) {
    return next({ path: "/login" });
  } else {
    return next();
  }
});

export default router;
