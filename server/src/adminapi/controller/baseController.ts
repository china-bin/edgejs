import { Hono } from 'hono';
import { Context } from '../../types';
import { getDB } from '../../utils/helpers';
import { respFail, respSuccess } from '../../utils/resp';
import baseLogic from '../logic/baseLogic';
import { arrayBufferToBase64, getFileExt } from '../../utils/ctuil';

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
  const body = await c.req.parseBody();
  const file = body['file'];

  if (file instanceof File) {
    console.log('file', file);
    // @ts-ignore
    const buffer = await file.arrayBuffer();
    const base64 = arrayBufferToBase64(buffer);

    const fileName = file.name;
    const fileExt = getFileExt(fileName);

    const allowImgExt = ['png', 'jpg', 'jpeg'];
    if (!allowImgExt.includes(fileExt)) {
      return respFail(c, '不支持的图片后缀:' + fileExt);
    }

    return respSuccess(c, {
      fileName,
      fileExt,
      base64: `data:image/${fileExt};base64,` + base64,
    });
  } else {
    return respFail(c, '不是文件');
  }
});

app.get('/index', async (c) => {
  return respSuccess(c, {}, 'adminapi');
});

export default app;
