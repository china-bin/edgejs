import { http } from "@/utils/request";

// 产品列表
function list(params) {
  return http.get("adminapi/file/list", params);
}
// 添加产品
function add(data) {
  return http.post("adminapi/file/add", data);
}

// 产品编辑
function edit(data) {
  return http.post("adminapi/file/edit", data);
}

export default {
  list,
  add,
  edit,
};
