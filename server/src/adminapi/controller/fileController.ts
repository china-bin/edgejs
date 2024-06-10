import { Hono } from 'hono';
import { Context } from '../../types';
import { getDB } from '../../utils/helpers';
import { respFail, respSuccess } from '../../utils/resp';
import fileLogic from '../logic/fileLogic';

const app = new Hono<Context>();

app.get('/list', async (c) => {
  const result = await fileLogic.list(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }

  return respSuccess(c, result.data);
});

app.post('/add', async (c) => {
  const result = await fileLogic.add(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }

  return respSuccess(c, result.data);
});

app.post('/edit', async (c) => {
  const result = await fileLogic.edit(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }

  return respSuccess(c, result.data);
});

export default app;
