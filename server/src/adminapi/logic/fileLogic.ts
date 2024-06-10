import { and, eq, gt, gte, inArray, like, lt, lte, or, count } from 'drizzle-orm';
import { file } from '../../db/schema';
import { HonoContext, getCfProp, getDB } from '../../utils/helpers';
import { LogicResponse } from '../../types';
import { SQLiteSelect } from 'drizzle-orm/sqlite-core';
import { genUUID, getCurDateStr, parseStrToNumArr } from '../../utils/ctuil';

async function list(c: HonoContext): LogicResponse {
  const params = c.req.query();

  const page = ~~params['page'];
  const pageSize = ~~params['pageSize'];
  const name = params['name'];
  const startTime = params['startTime'];
  const endTime = params['endTime'];

  const db = getDB(c);

  const whereOptions = and(
    like(file.name, `%${name}%`).if(name),
    and(
      gte(file.createAt, startTime + ' 00:00:00'),
      lte(file.createAt, endTime + ' 59:59:999')
    )?.if(startTime && endTime)
  );

  const list = await db
    .select({
      id: file.id,
      name: file.name,
      createAt: file.createAt,
    })
    .from(file)
    .where(whereOptions)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const totalObj = await db.select({ count: count() }).from(file).where(whereOptions);
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

  await db.insert(file).values({
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

async function edit(c: HonoContext): LogicResponse {
  const body = await c.req.json();
  const id = body['id'];
  const name = body['name'];

  const db = getDB(c);
  await db
    .update(file)
    .set({
      name: name,
    })
    .where(eq(file.id, id));

  return {
    state: true,
    msg: '',
  };
}

export default {
  list,
  add,
  edit,
};
