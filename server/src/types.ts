import { DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from './db/schema';
// export type DrizzleDB = DrizzleD1Database<typeof schema>

export type Context = {
  Bindings: {
    DB: D1Database;
    MY_BUCKET: R2Bucket;
    ADMAPI_JWT_SECRET: string;
    API_JWT_SECRET: string;
  };
};


type Response = {
  state: Boolean;
  msg?: string;
  data?: Record<string, any>;
};

export type LogicResponse = Promise<Response>;