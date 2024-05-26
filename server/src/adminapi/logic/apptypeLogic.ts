import { and, eq, gt, gte, inArray, like, lt, lte, or, count } from 'drizzle-orm';
import { apptype } from '../../db/schema';
import { HonoContext, getCfProp, getDB } from '../../utils/helpers';
import { LogicResponse } from '../../types';
import { SQLiteSelect } from 'drizzle-orm/sqlite-core';
import { genUUID, getCurDateStr, parseStrToNumArr } from '../../utils/ctuil';
import { md5 } from 'js-md5';

async function list(c: HonoContext): LogicResponse {
  const params = c.req.query();

  const page = ~~params['page'];
  const pageSize = ~~params['pageSize'];
  const apptypeKey = params['apptypeKey'];
  const startTime = params['startTime'];
  const endTime = params['endTime'];

  const db = getDB(c);

  const whereOptions = and(
    like(apptype.apptypeKey, `%${apptypeKey}%`).if(apptypeKey),
    and(
      gte(apptype.createAt, startTime + ' 00:00:00'),
      lte(apptype.createAt, endTime + ' 59:59:999')
    )?.if(startTime && endTime)
  );

  const list = await db
    .select({
      id: apptype.id,
      name: apptype.name,
    })
    .from(apptype)
    .where(whereOptions)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const totalObj = await db.select({ count: count() }).from(apptype).where(whereOptions);
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
  const name = body['name'];

  const db = getDB(c);

  await db.insert(apptype).values({
    name,
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
