import { Hono } from 'hono';
import { Context } from '../../types';
import { getDB } from '../../utils/helpers';
import { respFail, respSuccess } from '../../utils/resp';
import baseLogic from '../logic/baseLogic';

const app = new Hono<Context>();

app.post('/login', async (c) => {
//   const body = await c.req.json();
//   const db = getDB(c);
//   const result = baseLogic.login(db, body);

  return respSuccess(c, {});
});

app.get('/index', async (c) => {
  return respSuccess(c, {}, 'adminapi');
});

export default app;
