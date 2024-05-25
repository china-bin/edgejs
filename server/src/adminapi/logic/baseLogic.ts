import { eq } from 'drizzle-orm';
import { admin, user } from '../../db/schema';
import { DrizzleDB, HonoContext, getDB } from '../../utils/helpers';
import { respSuccess } from '../../utils/resp';
import { Context } from '../../types';
import { sign } from 'hono/jwt';
import { genAdminJwtToken } from '../../midleware/adminJwtAuth';



async function login(c: HonoContext) {
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
        msg: '',
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

export default {
  login,
};
