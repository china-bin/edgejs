import { Context as _HonoContext } from 'hono';
import { Context } from '../types';
import { DrizzleD1Database, drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';

export type DrizzleDB = DrizzleD1Database<typeof schema>;

export type HonoContext = _HonoContext<Context>;

export const getDB = (context: HonoContext) => {
  return drizzle<typeof schema>(context.env.DB, { schema });
};

// 获取cloudflare通过req传来的参数, 字段文档: https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties
export const getCfProp = (c: HonoContext, prop: string): string => {
  const cf = c.req.raw.cf;
  if (cf) {
    return cf[prop] as string;
  } else {
    return '';
  }
};
