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
  const result = await baseLogic.userInfo(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }
  return respSuccess(c, result.data);
});

// 修改个人用户信息
app.post('/editUser', async (c) => {
  const result = await baseLogic.editUser(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }
  return respSuccess(c, result.data);
});

app.get('/index', async (c) => {
  return respSuccess(c, {}, 'adminapi');
});

export default app;
