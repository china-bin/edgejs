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

app.get('/index', async (c) => {
  return respSuccess(c, {}, 'adminapi');
});

export default app;
