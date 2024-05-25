import { Hono } from 'hono';
import { Context } from '../../types';
import { getDB } from '../../utils/helpers';
import { respFail, respSuccess } from '../../utils/resp';
import baseLogic from '../logic/baseLogic';

const app = new Hono<Context>();

app.post('/login', async (c) => {
  const result = await baseLogic.login(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }

  return respSuccess(c, result.data);
});

app.get('/userInfo', async (c) => {
  const payload = c.get('jwtPayload');
  return respSuccess(c, {
    name: 'admin',
    avatar:
      'https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
    permissions: [],
    payload
  });
});

app.get('/index', async (c) => {
  return respSuccess(c, {}, 'adminapi');
});

export default app;
