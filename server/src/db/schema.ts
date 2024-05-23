import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: integer('id').primaryKey(),
  email: text('email'),
  username: text('username'),
  password: text('password'),
  appType: text('app_type'),
  headImg: text('head_img'),
  oauthType: integer('oauth_type').default(0), //  1 google用户
  openid: text('openid'),
  country: text('country'), // 国家
  city: text('city'), // 城市
  latitude: text('latitude'),
  longitude: text('longitude'),
  createAt: text('create_at').default(sql`(CURRENT_TIMESTAMP)`),
})
