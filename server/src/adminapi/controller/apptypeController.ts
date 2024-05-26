import { Hono } from 'hono';
import { Context } from '../../types';
import { getDB } from '../../utils/helpers';
import { respFail, respSuccess } from '../../utils/resp';
import apptypeLogic from '../logic/apptypeLogic';

const app = new Hono<Context>();

app.get('/list', async (c) => {
  const result = await apptypeLogic.list(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }

  return respSuccess(c, result.data);
});

app.post('/add', async (c) => {
  const result = await apptypeLogic.add(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }

  return respSuccess(c, result.data);
});

app.get('/detail', async (c) => {
  const result = await apptypeLogic.add(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }

  return respSuccess(c, result.data);
});

export default app;
