import { Hono } from 'hono'
import { Context } from '../types'
import baseController from '../api/controller/baseController'


const app = new Hono<{ Bindings: Context }>()

app.route('/base', baseController)


export default app
