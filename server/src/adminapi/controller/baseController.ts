import { Hono } from 'hono';
import { Context } from '../../types';
import { getDB } from '../../utils/helpers';
import { respFail, respSuccess } from '../../utils/resp';
import baseLogic from '../logic/baseLogic';
import { arrayBufferToBase64, genUUID, getDate, getFileExt } from '../../utils/ctuil';

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

// 上传图片
app.post('/uploadImage', async (c) => {
  const result = await baseLogic.uploadImage(c);
  if (!result.state) {
    return respFail(c, result.msg);
  }
  return respSuccess(c, result.data);
});

// 访问图片
app.get('/image', async (c) => {
  const params = c.req.query();
  const name = params['name'];

  const object = await c.env.MY_BUCKET.get(name);

  if (object === null) {
    return respFail(c, 'Object Not Found', 404);
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);

  return new Response(object.body, {
    headers,
  });
});

app.get('/index', async (c) => {
  return respSuccess(c, {}, 'adminapi');
});

export default app;
