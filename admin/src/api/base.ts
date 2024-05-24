import request from "@/utils/request";

// 登录
function login(data) {
  return request.post("adminapi/base/login", data);
}

export default {
  login,
};
