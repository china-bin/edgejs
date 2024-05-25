import { eq } from 'drizzle-orm';
import { admin, user } from '../../db/schema';
import { DrizzleDB, HonoContext, getDB } from '../../utils/helpers';
import { respSuccess } from '../../utils/resp';
import { Context, LogicResponse } from '../../types';
import { sign } from 'hono/jwt';
import { genAdminJwtToken } from '../../midleware/adminJwtAuth';

async function list(c: HonoContext): LogicResponse {
  const params = c.req.query();
  return {
    state: true,
    msg: '',
    data: {
      list: [],
      total: 0,
      params,
    },
  };
}

async function add(c: HonoContext): LogicResponse {
  return {
    state: true,
    msg: '',
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
