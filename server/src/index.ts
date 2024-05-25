import { Hono } from 'hono';
import { cors } from 'hono/cors';
import api from './route/api';
import adminapi from './route/adminapi';
import { jwt } from 'hono/jwt';
import { Context } from './types';

const app = new Hono<Context>();

// 允许跨域
app.use(
  '/*',
  cors({
    origin: ['http://localhost:3000'],
    // exposeHeaders: ['Rtoken'],
    credentials: true,
  })
);

app.route('/api', api);

// app.use('/adminapi/*', (c, next) => {
//   const jwtMiddleware = jwt({
//     secret: c.env.ADMAPI_JWT_SECRET,
//   });
//   return jwtMiddleware(c, next);
// });
app.route('/adminapi', adminapi);

app.get('/', (c) => c.text('Hono!'));

export default app;
