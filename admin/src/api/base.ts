import request from "@/utils/request";

// 登录
function login(data) {
  return request({
    url: "adminapi/base/login",
    method: "post",
    data,
  });
}

function userInfo(params) {
  return request({
    url: "adminapi/base/userInfo",
    method: "get",
    params,
  });
}

export default {
  login,
  userInfo,
};
