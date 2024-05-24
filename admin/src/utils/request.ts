import axios from "axios";
import config from "./config";
import cache from "./cache";
import reqUtils from "./reqUtils";
import { Message } from "@arco-design/web-react";

function getToken() {
  return cache.get("token");
}
const service = axios.create({
  // withCredentials: true,
  baseURL: config.baseUrl,
  timeout: config.timeout,
});

service.interceptors.request.use(
  (config) => {
    if (config.method?.toUpperCase() == "GET") {
      var paramsGet = reqUtils.requestMd5Params(config.params);
      config.params = paramsGet;
    } else {
      var paramsPost = reqUtils.requestMd5Params({});
      config.params = paramsPost;
    }

    const token = getToken();
    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code == 200) {
      return res.data;
    } else if (res.code == 401) {
      console.log("退出登录逻辑---");
      return Promise.reject(res.msg || "Error");
    } else {
      Message.info(res.message);
      return Promise.reject(res.msg || "Error");
    }
  },
  (error) => {
    console.log("err" + error);
    Message.info(error.message);
    return Promise.reject(error.message);
  }
);

export default service;
