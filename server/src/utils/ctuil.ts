import { customAlphabet } from 'nanoid';

// ISO8601字符串格式（即 YYYY-MM-DD HH:MM:SS.SSS）存储日期和时间。这种格式易于阅读和排序，同时兼容SQLite的日期和时间函数。
export function getCurDateStr() {
  let now = new Date().toISOString();
  return now;
}

export function genUUID() {
  const nanoid = customAlphabet(
    '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    11
  );
  const uuid = nanoid();

  return uuid;
}

// 字符串数组转换成number数组
export function parseStrToNumArr(str: string): number[] {
  if (str) {
    let arr = str.split(',');
    let numArr = arr.map((val) => {
      return ~~val;
    });
    return numArr;
  } else {
    return [];
  }
}

// ArrayBuffer 转 base64
export function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  // 对二进制字符串进行base64编码
  return btoa(binary);
}

//  获取文件后缀
export function getFileExt(fileName: string) {
  const parts = fileName.split('.');
  const extStr = parts.pop() || '';
  return extStr.toLocaleLowerCase();
}

// 不足10补0
const _zeroize = (x: any) => (~~x > 9 ? x : '0' + x);
/**
 * 获取任意时间
 */
export function getDate(date?: any, AddDayCount = 0) {
  if (!date) {
    date = new Date();
  }
  const dd = new Date(date);

  dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

  const y = dd.getFullYear(); // 年
  const m = _zeroize(dd.getMonth() + 1); // 月
  const d = _zeroize(dd.getDate()); // 日

  const hh = _zeroize(dd.getHours()); // 时
  const mm = _zeroize(dd.getMinutes()); // 分
  const ss = _zeroize(dd.getSeconds()); // 秒
  return {
    fullDateTime: `${y}-${m}-${d} ${hh}:${mm}:${ss}`, // 比如: 2021-1-2 11:18:33
    ymdDir: `${y}${m}${d}`,
  };
}
