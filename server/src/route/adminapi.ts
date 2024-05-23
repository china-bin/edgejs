import { Hono } from 'hono';
import { Context } from '../types';
import baseController from '../adminapi/controller/baseController';

const app = new Hono<{ Bindings: Context }>();

app.route('/base', baseController);

export default app
