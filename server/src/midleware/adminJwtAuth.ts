import { Context, MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { sign, verify } from 'hono/jwt';
import { HonoContext, onHttpExpcetion } from '../utils/helpers';

export type AdminPayload = {
  userId: number;
  expbuf: number;
  exp: number;
};

function noTokenLogic(ctx: Context, notAuthPaths: string[]) {
  const reqPath = ctx.req.path;
  console.log('reqPath', reqPath);
  if (notAuthPaths.includes(reqPath)) {
    // 未登录用户也可以访问
  } else {
    // no authorization included in request
    return onHttpExpcetion(401, 'Unauthorized');
  }
}

export const adminJwtAuth = (options: {
  secret: string;
  cookie?: string;
  notAuthPaths: string[];
}): MiddlewareHandler => {
  return async function jwt(ctx, next) {
    const credentials = ctx.req.raw.headers.get('Authorization');

    let token;
    if (credentials) {
      const parts = credentials.split(/\s+/);
      if (parts.length !== 2) {
        // invalid credentials structure'
        return onHttpExpcetion(401, 'Unauthorized');
      } else {
        token = parts[1];
      }
    } else if (options.cookie) {
      token = getCookie(ctx)[options.cookie];
    }

    if (token) {
      let payload: any;
      let cause;
      try {
        console.log('token', token);
        payload = await verify(token, options.secret, 'HS256');
      } catch (e) {
        cause = e;
      }

      if (!payload) {
        // token verification failure
        return onHttpExpcetion(401, 'Unauthorized');
      }

      // 到达缓存时间通过响应头刷新token
      const now = Math.floor(Date.now() / 1000);
      if (payload.expbuf && payload.expbuf <= now) {
        const token = await genAdminJwtToken(ctx, payload.userId);
        ctx.header('Rtoken', token);
      }

      ctx.set('jwtPayload', payload);
    } else {
      noTokenLogic(ctx, options.notAuthPaths);
    }

    await next();
  };
};
export async function genAdminJwtToken(c: HonoContext, userId: number) {
  // 多少天之后token失效
  const expTime = 30 * (24 * 60 * 60 * 1000);
  // 多少小时后会重新刷新token
  const buffTime = 8 * (60 * 60 * 1000);
  const payload = {
    userId: userId,
    expbuf: Math.floor((Date.now() + buffTime) / 1000),
    exp: Math.floor((Date.now() + expTime) / 1000),
  };
  const token = await sign(payload, c.env.ADMAPI_JWT_SECRET, 'HS256');
  return token;
}
