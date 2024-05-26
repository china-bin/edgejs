import { and, eq, gt, gte, inArray, like, lt, lte, or, count } from 'drizzle-orm';
import { admin, user } from '../../db/schema';
import { HonoContext, getCfProp, getDB } from '../../utils/helpers';
import { LogicResponse } from '../../types';
import { SQLiteSelect } from 'drizzle-orm/sqlite-core';
import { genUUID, getCurDateStr, parseStrToNumArr } from '../../utils/ctuil';
import { md5 } from 'js-md5';

function withPagination<T extends SQLiteSelect>(qb: T, page: number, pageSize: number = 10) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}

async function list(c: HonoContext): LogicResponse {
  const params = c.req.query();

  const page = ~~params['page'];
  const pageSize = ~~params['pageSize'];
  const uid = params['uid'];
  const username = params['username'];
  const startTime = params['startTime'];
  const endTime = params['endTime'];
  let oauthType = parseStrToNumArr(params['oauthType']);

  const db = getDB(c);

  const whereOptions = and(
    like(user.uid, `%${uid}%`).if(uid),
    like(user.username, `%${username}%`).if(username),
    and(
      gte(user.createAt, startTime + ' 00:00:00'),
      lte(user.createAt, endTime + ' 59:59:999')
    )?.if(startTime && endTime),
    oauthType.length ? inArray(user.oauthType, oauthType) : undefined
  );

  const list = await db
    .select({
      id: user.id,
      uid: user.uid,
      username: user.username,
      avatar: user.avatar,
      oauthType: user.oauthType,
      country: user.country,
      city: user.city,
      createAt: user.createAt,
    })
    .from(user)
    .where(whereOptions)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const totalObj = await db.select({ count: count() }).from(user).where(whereOptions);
  const totalNum = totalObj[0].count;

  return {
    state: true,
    msg: '',
    data: {
      list: list,
      total: totalNum,
      params,
    },
  };
}

async function add(c: HonoContext): LogicResponse {
  const body = await c.req.json();
  const username = body['username'];
  const password = body['password'];
  const email = body['email'];

  const country = getCfProp(c, 'country');
  const city = getCfProp(c, 'city');
  const latitude = getCfProp(c, 'latitude');
  const longitude = getCfProp(c, 'longitude');
  const region = getCfProp(c, 'region');
  const timezone = getCfProp(c, 'timezone');
  const postalCode = getCfProp(c, 'postalCode');

  const uid = genUUID();

  const db = getDB(c);

  await db.insert(user).values({
    username,
    password: md5(password),
    uid,
    email,
    country,
    city,
    latitude,
    longitude,
    region,
    timezone,
    postalCode,
  });

  return {
    state: true,
    msg: '',
    data: {
      body,
    },
  };
}

async function detail(c: HonoContext): LogicResponse {
  const params = c.req.query();

  const id = ~~params['id'];

  const db = getDB(c);

  const userInfo = await db.query.user.findFirst({
    where: eq(user.id, id),
  });

  return {
    state: true,
    msg: '',
    data: {
      info: userInfo,
    },
  };
}

export default {
  list,
  add,
  detail,
};
