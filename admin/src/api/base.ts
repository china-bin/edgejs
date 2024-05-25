import { http } from "@/utils/request";

// 登录
function login(data) {
  return http.post("adminapi/base/login", data);
}

function userInfo(params) {
  return http.get("adminapi/base/userInfo", params);
}

export default {
  login,
  userInfo,
};
