import { md5 } from "js-md5";
import config from "./config";
import { getPlatform } from "./cutil";

function formatGetUri(obj: Record<string, string>) {
  const params: string[] = [];
  Object.keys(obj).forEach((key) => {
    let value = obj[key] + "";
    if (typeof value !== "undefined" || value !== null) {
      params.push([key, encodeURIComponent(value)].join("="));
    }
  });
  return "?" + params.join("&");
}

function sortByKey(array: any[], key: string) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

function requestMd5Params(params: any) {
  params = Object.assign({}, params, {
    // @ts-ignore
    timestrap: parseInt(Date.now() / 1000),
    version: config.version,
    platform: getPlatform(),
  });

  console.log("requestMd5Params", params);

  const keys = Object.keys(params);
  const keysArray: any[] = [];
  keys.forEach((item) => {
    if (params[item] !== undefined) {
      keysArray.push({
        label: item,
        value: params[item],
      });
    }
  });

  const sortKeysArray = sortByKey(keysArray, "label");
  var hashStrs = "";
  sortKeysArray.forEach((item) => {
    hashStrs += item.label + item.value;
  });
  var hash = md5(hashStrs + config.appkey);
  params.sign = hash;
  return params;
}

export default {
  formatGetUri,
  requestMd5Params,
};
