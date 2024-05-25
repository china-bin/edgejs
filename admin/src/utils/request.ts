import axios, { AxiosRequestConfig } from "axios";
import config from "./config";
import reqUtils from "./reqUtils";
import { Message } from "@arco-design/web-react";
import useStorage, { storeGetItem, storeSetItem } from "./useStorage";

function getToken() {
  return storeGetItem("token");
}
const service = axios.create({
  // withCredentials: true,
  baseURL: config.baseUrl,
  timeout: config.timeout,
});

// 请求拦截器
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
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    //-- 刷新token
    const rtoken = response.headers["Rtoken"];
    if (rtoken) {
      console.log("刷新token");
      storeSetItem("token", rtoken);
    }
    // --

    const res = response.data;
    if (res.code == 200) {
      return res.data;
    } else if (res.code == 401) {
      console.log("退出登录逻辑---");
      return Promise.reject(res.msg || "Error");
    } else {
      Message.error(res.msg);
      return Promise.reject(res.msg || "Error");
    }
  },
  (error) => {
    console.log("err" + error);
    Message.error(error.message);
    return Promise.reject(error.message);
  }
);

// export default service;

export const http = {
  get<T = any>(url: string, params?: object): Promise<T> {
    return service.get(url, {
      params,
    });
  },

  post<T = any>(url: string, data?: object): Promise<T> {
    return service.post(url, data);
  },
};
