import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login = () => import("@/views/login/Login.vue");
const Home = () => import("@/views/home/Home.vue");
const Welcome = () => import("@/views/home/components/welcome/Welcome.vue");
const Users = () => import("@/views/home/components/users/Users.vue");
// const AddUser = () => import("@/views/home/components/addUser/AddUser.vue");
const AddUser = () =>
  import("@/views/home/components/addUser/AddUser_copy.vue");
const UserData = () => import("@/views/home/components/userData/UserData.vue");

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
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/welcome",
    component: Home,
    children: [
      {
        path: "/welcome",
        name: "Welcome",
        component: Welcome,
      },
      {
        path: "/users",
        name: "Users",
        component: Users,
      },
      {
        path: "/adduser",
        name: "AddUser",
        component: AddUser,
      },
      {
        path: "/userdata",
        name: "UserData",
        component: UserData,
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

  let token = window.localStorage.getItem("token");
  // 登录时间
  let loginTime = window.localStorage.getItem("loginTime");
  // 一天的毫秒数
  let oneDay = 1000 * 60 * 60 * 24;
  // let oneDay = 1000 * 10;
  // 时间间隔
  let timeGap = Date.now() - loginTime;
  // token 验证
  if (!token) {
    return next({ path: "/login" });
  } else if (timeGap > oneDay) {
    window.localStorage.clear();
    return next({ path: "/login" });
  } else {
    return next();
  }
});

export default router;
