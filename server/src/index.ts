import { Hono } from 'hono';
import { cors } from 'hono/cors';
import api from './route/api';
import adminapi from './route/adminapi';
import { jwt } from 'hono/jwt';
import { Context } from './types';
import { adminJwtAuth } from './midleware/adminJwtAuth';
import { apiSignCheck } from './midleware/apiSignCheck';

const app = new Hono<Context>();

// 允许跨域
app.use(
  '/*',
  cors({
    origin: ['http://localhost:3000'],
    exposeHeaders: ['Rtoken'],
    credentials: true,
  })
);

app.route('/api', api);

// jwt解析
app.use('/adminapi/*', (c, next) => {
  const jwtMiddleware = adminJwtAuth({
    secret: c.env.ADMAPI_JWT_SECRET,
    notAuthPaths: ['/adminapi/base/login', '/adminapi/base/uploadImage'],
  });
  return jwtMiddleware(c, next);
});

// 验证接口sign签名
app.use(
  '/adminapi/*',
  apiSignCheck({
    signKey: '34af1db6083ff6f395a0f',
    // signKey: '',
  })
);

app.route('/adminapi', adminapi);

app.get('/', (c) => c.text('Hono!'));

export default app;
