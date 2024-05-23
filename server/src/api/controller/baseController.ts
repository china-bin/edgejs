import { Hono } from 'hono';
import { Context } from '../../types';
import { respFail, respSuccess } from '../../utils/resp';
import baseLogic from '../logic/baseLogic';
import { getDB } from '../../utils/helpers';
const app = new Hono<Context>();

app.post('/login', async (c) => {
  const body = await c.req.json();
  const db = getDB(c);
  const result = baseLogic.login(db, body);
  return respSuccess(c, body);
});

app.get('/index', async (c) => {
  const db = getDB(c);
  const result = await baseLogic.index(db);
 
  if (result && result.length) {
    return respSuccess(c, result);
  }
  return respFail(c, '欢迎使用edgejs');
});

export default app;
