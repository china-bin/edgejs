import { user } from '../../db/schema';
import { DrizzleDB } from '../../utils/helpers';

async function index(db: DrizzleDB) {
  db.insert(user).values({
    email: 'xxx',
    password: 'fffffff',
  });
  const userList = await db.select().from(user);
  return userList;
}

function login(db: DrizzleDB, body: any) {
  const oauthType = ~~body['oauthType'];
  const code = body['code'];
  const client_id = body['client_id'];
  const redirect_uri = body['redirect_uri'];
}

export default {
  index,
  login,
};
