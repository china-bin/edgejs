import { Context } from 'hono'

export const respSuccess = (c: Context, data?: any, msg = '') => {
  return c.json({
    code: 200,
    msg,
    data,
  })
}

export const respFail = (c: Context, msg: string, code = 500) => {
  return c.json({
    code,
    msg,
  })
}

export const respUnauth = (c: Context, msg: string = '') => {
  return c.json({
    code: 401,
    msg,
  })
}
