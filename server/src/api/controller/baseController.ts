import { Hono } from 'hono'
import { Context } from '../../types'
import { respFail, respSuccess } from '../../utils/resp'
import baseLogic from '../logic/baseLogic'
const app = new Hono<{ Bindings: Context }>()

app.post('/login', async (c) => {

  const result = baseLogic.login()
  return respFail(c, '未适配的登录类型')
})

app.get('/index', async (c) => {
  const result = baseLogic.index();
  if (result) {
    return respSuccess(c);
  }
  return respFail(c, '欢迎使用edgejs')
})

export default app;
