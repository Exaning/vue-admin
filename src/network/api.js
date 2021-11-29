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
export function yxList(params) {
  return request({
    url: "/yxList.php",
    params,
  });
}

// 删除一条意向用户数据
export function yxDelRow(params) {
  return request({
    url: "/yxDelRow.php",
    params,
  });
}

// 客服数据
export function yxLoad() {
  return request({
    url: "/yxLoad.php",
  });
}

// 添加新客户
export function yxAdd(params) {
  return request({
    url: "/yxAdd.php",
    params,
  });
}

// 客户信息是否重复的验证
export function yxValidate(params) {
  return request({
    url: "/yxValidate.php",
    params,
  });
}

// 查询单个客户的数据
export function yxRow(params) {
  // console.log(params);  // {id: xxx}
  return request({
    url: "/yxRow.php",
    params, // {id: xxx}
  });
}

// 修改某一个用户的数据
export function yxUpdata(params) {
  return request({
    url: "/yxUpdata.php",
    params,
  });
}
