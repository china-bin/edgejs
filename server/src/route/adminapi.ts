import { Hono } from 'hono';
import { Context } from '../types';
import baseController from '../adminapi/controller/baseController';
import userController from '../adminapi/controller/userController';
import apptypeController from '../adminapi/controller/apptypeController';

const app = new Hono<{ Bindings: Context }>();

app.route('/base', baseController);
app.route('/user', userController);
app.route('/apptype', apptypeController);

export default app;
