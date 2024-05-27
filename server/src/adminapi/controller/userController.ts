import { Hono } from 'hono';
import { Context } from '../../types';
import { getDB } from '../../utils/helpers';
import { respFail, respSuccess } from '../../utils/resp';
import userLogic from '../logic/userLogic';

const app = new Hono<Context>();

app.get('/list', async (c) => {
  const result = await userLogic.list(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }

  return respSuccess(c, result.data);
});

app.post('/add', async (c) => {
  const result = await userLogic.add(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }

  return respSuccess(c, result.data);
});

app.get('/detail', async (c) => {
  const result = await userLogic.detail(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }

  return respSuccess(c, result.data);
});

app.post('/edit', async (c) => {
  const result = await userLogic.edit(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }

  return respSuccess(c, result.data);
});

export default app;
