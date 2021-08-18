import axios from "axios";

// 登录后的鉴权
export function request(config) {
  const instance = axios.create({
    baseURL: "https://ku.qingnian8.com/dataApi/vueadmin",
    timeout: 7000,
    headers: { "X-Token": localStorage.getItem("token") },
  });

  // 拦截处理
  // intercept(instance);

  return instance(config);
}

// 用户登陆前
export function request_2(config) {
  const instance = axios.create({
    baseURL: "https://ku.qingnian8.com/dataApi/vueadmin",
    timeout: 7000,
  });

  return instance(config);
}

// [请求 && 响应] 的拦截
function intercept(param) {
  // 拦截请求并处理
  param.interceptors.request.use((config) => {
    config.headers["X-Token"] = localStorage.getItem("token");
    return config;
  });

  // 响应拦截并处理
  param.interceptors.response.use((response) => {
    return response;
  });
}
