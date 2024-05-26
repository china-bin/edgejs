import { storeGetItem } from "../hooks/useStorage";
// 仅用于线上预览，实际使用中可以将此逻辑删除
import qs from "query-string";

export type ParamsType = Record<string, any>;

export function isArray(val): boolean {
  return Object.prototype.toString.call(val) === "[object Array]";
}
export function isObject(val): boolean {
  return Object.prototype.toString.call(val) === "[object Object]";
}
export function isString(val): boolean {
  return Object.prototype.toString.call(val) === "[object String]";
}

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

export function getPlatform() {
  var agent = navigator.userAgent.toLowerCase();
  // @ts-ignore
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
   // @ts-ignore
  var MAC = /macintosh|mac os x/i.test(navigator.userAgent) && !window.MSStream;
   // @ts-ignore
  var android = /Android/.test(navigator.userAgent) && !window.MSStream;

  if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
    return "window"; // 此处根据需求调整
  }
  if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
    return "window"; // 此处根据需求调整
  }
  if (iOS) {
    return "ios";
  }
  if (MAC) {
    return "mac";
  }
  if (android) {
    return "andriod";
  }
  return "unknow";
}
