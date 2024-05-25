import { Hono } from 'hono';
import { Context } from '../types';
import baseController from '../adminapi/controller/baseController';
import userController from '../adminapi/controller/userController'

const app = new Hono<{ Bindings: Context }>();

app.route('/base', baseController);
app.route('/user', userController)

export default app
