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
