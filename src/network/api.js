import { request, request_2 } from "@/network/request";

// 用户登录
export function loginAxios(params) {
  return request_2({
    url: "/login.php",
    params,
  });
}

// 天气数据
export function weatherData(params) {
  return request({
    url: "/tianqi3day.php",
  });
}

// 意向客户数据
export function allUsers(params) {
  return request({
    url: "/yxList.php",
    params,
  });
}
