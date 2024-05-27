import { http } from "@/utils/request";

// 用户列表
function list(params) {
  return http.get("adminapi/user/list", params);
}
// 添加用户
function add(data) {
  return http.post("adminapi/user/add", data);
}
// 用户详情
function detail(params) {
  return http.get("adminapi/user/detail", params);
}
// 编辑用户
function edit(data) {
  return http.post("adminapi/user/edit", data);
}

export default {
  list,
  add,
  detail,
  edit
};
