import { http } from "@/utils/request";

// 登录
function login(data) {
  return http.post("adminapi/base/login", data);
}

function userInfo(params) {
  return http.get("adminapi/base/userInfo", params);
}

function editUser(data) {
  return http.post("adminapi/base/editUser", data);
}

function uploadImage(formData) {
  return http.upload("adminapi/base/uploadImage", formData);
}

export default {
  login,
  userInfo,
  editUser,
  uploadImage,
};
