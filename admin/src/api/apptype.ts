import { http } from "@/utils/request";

// 产品列表
function list(params) {
  return http.get("adminapi/apptype/list", params);
}
// 添加产品
function add(data) {
  return http.post("adminapi/apptype/add", data);
}

// 产品详情
function detail(params) {
  return http.get("adminapi/apptype/detail", params);
}

export default {
  list,
  add,
  detail,
};
