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
