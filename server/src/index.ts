import { Hono } from 'hono'
import { cors } from 'hono/cors'
import api from './route/api'

const app = new Hono()

// 允许跨域
app.use(
  '/*',
  cors({
    origin: '*',
    exposeHeaders: ['Rtoken'],
  })
)

app.route('/api', api)

app.get('/', (c) => c.text('Hono!'))

export default app
