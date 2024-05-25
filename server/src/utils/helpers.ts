import { Context as _HonoContext } from 'hono';
import { Context } from '../types';
import { DrizzleD1Database, drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';

export type DrizzleDB = DrizzleD1Database<typeof schema>;

export type HonoContext = _HonoContext<Context>;

export const getDB = (context: HonoContext) => {
  return drizzle<typeof schema>(context.env.DB, { schema });
};
