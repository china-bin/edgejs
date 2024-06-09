import { MiddlewareHandler } from 'hono';
import { respFail } from '../utils/resp';
import { md5 } from 'js-md5';

function sortByKey(array: any[], key: string) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

function sortToStr(params: Record<string, any>) {
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
  const sortKeysArray = sortByKey(keysArray, 'label');
  var hashStrs = '';
  sortKeysArray.forEach((item) => {
    hashStrs += item.label + item.value;
  });
  return hashStrs;
}

export const apiSignCheck = (options: {
  signKey: string;
  notCheckPaths: string[];
}): MiddlewareHandler => {
  return async function func(ctx, next) {
    const reqPath = ctx.req.path;
    if (options.notCheckPaths.includes(reqPath)) {
      // 不需要验证签名
      return await next();
    }

    const params = ctx.req.query();
    const sign = params['sign'];
    if (!sign) {
      return respFail(ctx, '缺少签名参数');
    }
    delete params.sign;
    const paramsStr = sortToStr(params);

    if (md5(paramsStr + options.signKey) != sign) {
      return respFail(ctx, '签名错误');
    }

    await next();
  };
};
