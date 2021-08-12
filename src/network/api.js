import { request_2 } from "@/network/request";

// 用户登录
export function loginAxios(params) {
  return request_2({
    url: "/login.php",
    params,
  });
}
