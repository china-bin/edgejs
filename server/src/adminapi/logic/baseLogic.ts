import { eq } from 'drizzle-orm';
import { admin, user } from '../../db/schema';
import { DrizzleDB, HonoContext, getDB } from '../../utils/helpers';
import { respSuccess } from '../../utils/resp';
import { Context, LogicResponse } from '../../types';
import { sign } from 'hono/jwt';
import { genAdminJwtToken } from '../../midleware/adminJwtAuth';

async function login(c: HonoContext): LogicResponse {
  const body = await c.req.json();
  const username = body['username'];
  const password = body['password'];

  // 根据用户名查询
  const db = getDB(c);
  const adminInfo = await db.select().from(admin).where(eq(admin.username, username)).limit(1);
  console.log('adminInfo', adminInfo);

  if (adminInfo.length) {
    const info = adminInfo[0];
    if (info && info.password == password) {
      const token = await genAdminJwtToken(c, info.id);
      return {
        state: true,
        data: { token },
      };
    } else {
      return {
        state: false,
        msg: '账号或密码错误',
      };
    }
  } else {
    return {
      state: false,
      msg: '账号或密码错误',
    };
  }
}
async function userInfo(c: HonoContext): LogicResponse {
  const payload = c.get('jwtPayload');
  const userId = payload.userId;

  const db = getDB(c);
  const info = await db.query.admin.findFirst({
    columns: {
      password: false,
    },
    where: eq(admin.id, userId),
  });

  const data = {
    ...info,
    permissions: [],
  };
  return {
    state: true,
    data: data,
  };
}

async function editUser(c: HonoContext): LogicResponse {
  const payload = c.get('jwtPayload');
  const userId = payload.userId;

  const body = await c.req.json();

  const db = getDB(c);
  await db
    .update(admin)
    .set({
      email: body['email'],
      nickname: body['nickname'],
      country: body['country'],
    })
    .where(eq(admin.id, userId));

  const data = {};
  return {
    state: true,
    data: data,
  };
}

export default {
  login,
  userInfo,
  editUser,
};
