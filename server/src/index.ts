import { Hono } from 'hono';
import { cors } from 'hono/cors';
import api from './route/api';
import adminapi from './route/adminapi';

const app = new Hono();

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
app.route('/adminapi', adminapi);

app.get('/', (c) => c.text('Hono!'));

export default app;
