import { user } from '../../db/schema';
import { DrizzleDB } from '../../utils/helpers';
import { respSuccess } from '../../utils/resp';


function login(db: DrizzleDB, body: any) {

  return true;
}

export default {
  login,
};
