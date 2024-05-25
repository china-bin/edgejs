import { eq } from 'drizzle-orm';
import { admin, user } from '../../db/schema';
import { DrizzleDB, HonoContext, getCfProp, getDB } from '../../utils/helpers';
import { respSuccess } from '../../utils/resp';
import { Context, LogicResponse } from '../../types';
import { sign } from 'hono/jwt';
import { genAdminJwtToken } from '../../midleware/adminJwtAuth';
import { SQLiteSelect } from 'drizzle-orm/sqlite-core';

function withPagination<T extends SQLiteSelect>(qb: T, page: number, pageSize: number = 10) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}

async function list(c: HonoContext): LogicResponse {
  const params = c.req.query();

  const page = ~~params['page'];
  const pageSize = ~~params['pageSize'];

  const db = getDB(c);

  const dynamicQuery = db
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
    .$dynamic();

  const list = await withPagination(dynamicQuery, page, pageSize);

  return {
    state: true,
    msg: '',
    data: {
      list: list,
      total: 10,
      params,
    },
  };
}

async function add(c: HonoContext): LogicResponse {
  const body = await c.req.json();
  const username = body['username'];
  const email = body['email'];

  const country = getCfProp(c, 'country');
  const city = getCfProp(c, 'city');
  const latitude = getCfProp(c, 'latitude');
  const longitude = getCfProp(c, 'longitude');
  const region = getCfProp(c, 'region');
  const timezone = getCfProp(c, 'timezone');
  const postalCode = getCfProp(c, 'postalCode');

  const db = getDB(c);

  await db.insert(user).values({
    username,
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
  return {
    state: true,
    msg: '',
  };
}

export default {
  list,
  add,
  detail,
};
