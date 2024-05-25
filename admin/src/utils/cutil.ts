import { storeGetItem } from "./useStorage";
// 仅用于线上预览，实际使用中可以将此逻辑删除
import qs from "query-string";

export type ParamsType = Record<string, any>;

export function changeTheme(theme) {
  if (theme === "dark") {
    document.body.setAttribute("arco-theme", "dark");
  } else {
    document.body.removeAttribute("arco-theme");
  }
}

export function checkLogin() {
  return storeGetItem("token") ? true : false;
}

export function getUrlParams(): ParamsType {
  const params = qs.parseUrl(window.location.href).query;
  const returnParams: ParamsType = {};
  Object.keys(params).forEach((p) => {
    if (params[p] === "true") {
      returnParams[p] = true;
    }
    if (params[p] === "false") {
      returnParams[p] = false;
    }
  });
  return returnParams;
}

export function isArray(val): boolean {
  return Object.prototype.toString.call(val) === "[object Array]";
}
export function isObject(val): boolean {
  return Object.prototype.toString.call(val) === "[object Object]";
}
export function isString(val): boolean {
  return Object.prototype.toString.call(val) === "[object String]";
}
