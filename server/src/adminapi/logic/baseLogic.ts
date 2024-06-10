import { eq } from 'drizzle-orm';
import { admin, user } from '../../db/schema';
import { DrizzleDB, HonoContext, getDB } from '../../utils/helpers';
import { respSuccess } from '../../utils/resp';
import { Context, LogicResponse } from '../../types';
import { sign } from 'hono/jwt';
import { genAdminJwtToken } from '../../midleware/adminJwtAuth';
import { arrayBufferToBase64, genUUID, getDate, getFileExt } from '../../utils/ctuil';
import { file as tableFile } from '../../db/schema';

async function login(c: HonoContext): LogicResponse {
  const body = await c.req.json();
  const username = body['username'];
  const password = body['password'];

  // 根据用户名查询
  const db = getDB(c);
  const adminInfo = await db.select().from(admin).where(eq(admin.username, username)).limit(1);
  console.log('adminInfo', adminInfo);

  if (adminInfo.length) {
    const info = adminInfo[0];
    if (info && info.password == password) {
      const token = await genAdminJwtToken(c, info.id);
      return {
        state: true,
        data: { token },
      };
    } else {
      return {
        state: false,
        msg: '账号或密码错误',
      };
    }
  } else {
    return {
      state: false,
      msg: '账号或密码错误',
    };
  }
}
async function userInfo(c: HonoContext): LogicResponse {
  const payload = c.get('jwtPayload');
  const userId = payload.userId;

  const db = getDB(c);
  const info = await db.query.admin.findFirst({
    columns: {
      password: false,
    },
    where: eq(admin.id, userId),
  });

  const data = {
    ...info,
    permissions: [],
  };
  return {
    state: true,
    data: data,
  };
}

async function editUser(c: HonoContext): LogicResponse {
  const payload = c.get('jwtPayload');
  const userId = payload.userId;

  const body = await c.req.json();

  const db = getDB(c);
  await db
    .update(admin)
    .set({
      email: body['email'],
      nickname: body['nickname'],
      country: body['country'],
      avatar: body['avatar'],
    })
    .where(eq(admin.id, userId));

  const data = {};
  return {
    state: true,
    data: data,
  };
}

async function uploadImage(c: HonoContext): LogicResponse {
  const body = await c.req.parseBody();
  const file = body['file'];

  if (file instanceof File) {
    // const buffer = await image.arrayBuffer();
    // const base64 = arrayBufferToBase64(buffer);
    const fileName = file.name;
    const fileExt = getFileExt(fileName);

    const allowImgExt = ['png', 'jpg', 'jpeg'];
    if (!allowImgExt.includes(fileExt)) {
      return {
        state: false,
        msg: '不支持的图片后缀:' + fileExt,
      };
    }

    const saveDir = `image/${getDate().ymdDir}/${genUUID() + '.' + fileExt}`;
    await c.env.MY_BUCKET.put(saveDir, file);

    const db = getDB(c);

    await db.insert(tableFile).values({
      name: saveDir,
    });

    return {
      state: true,
      data: {
        // saveDir,
        uri: `http://localhost:4000/adminapi/base/image?name=${saveDir}`,
        // base64: `data:image/${fileExt};base64,` + base64,
      },
    };
  } else {
    return {
      state: false,
      msg: '不是文件',
    };
  }
}

export default {
  login,
  userInfo,
  editUser,
  uploadImage,
};
