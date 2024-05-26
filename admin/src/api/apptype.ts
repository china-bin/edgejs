import { http } from "@/utils/request";

// 产品列表
function list(params) {
  return http.get("adminapi/apptype/list", params);
}
// 添加产品
function add(data) {
  return http.post("adminapi/apptype/add", data);
}

// 产品编辑
function edit(data) {
  return http.post("adminapi/apptype/edit", data);
}

export default {
  list,
  add,
  edit,
};
