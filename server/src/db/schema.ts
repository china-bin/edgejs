import { isNull, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// 用户
export const user = sqliteTable('user', {
  id: integer('id').primaryKey(),
  uid: text('uid').unique(), // 用户uid
  email: text('email'), // 邮件账号
  avatar: text('avatar'), // 头像地址
  username: text('username'),
  password: text('password'),
  apptype: text('apptype'),
  oauthType: integer('oauth_type').default(0), //  1=google用户
  openid: text('openid'), // oauth登录的唯一标识
  country: text('country'), // 国家
  city: text('city'), // 城市
  region: text('region'), // 地区
  latitude: text('latitude'), // 纬度
  longitude: text('longitude'), // 经度
  timezone: text('timezone'), // 时区
  postalCode: text('postal_code'), // 邮编
  remark: text('remark'), // 备注
  mobile: text('mobile'), // 手机号
  platform: text('platform'), // 系统平台 android ios window mac unknow
  createAt: text('create_at').default(sql`(CURRENT_TIMESTAMP)`),
});

export const apptype = sqliteTable('apptype', {
  id: integer('id').primaryKey(),
  name: text('name'), // 产品名称
  apptypeKey: text('apptype_key').unique(), // 产品key
  createAt: text('create_at').default(sql`(CURRENT_TIMESTAMP)`),
});

// 菜单表
export const systemMenu = sqliteTable('system_menu', {
  id: integer('id').primaryKey(),
  pid: integer('pid').default(0),
  type: integer('type').default(0), //权限类型: 1=目录 2=菜单 3=按钮
  name: text('name'), // 菜单名称
  icon: text('icon'), // 菜单图标
  sort: integer('sort'), // 菜单排序
  perms: text('perms'), // 权限标识
  paths: text('paths'), // 路由地址
  isShow: integer('is_show'), // 是否显示: 0=否, 1=是
  isDisable: integer('is_disable'), // 是否禁用: 0=否, 1=是
  createAt: text('create_at').default(sql`(CURRENT_TIMESTAMP)`),
});

// 管理员表
export const admin = sqliteTable('admin', {
  id: integer('id').primaryKey(),
  uid: text('uid').unique(), // 用户uid
  root: integer('root').default(0), // 是否超级管理员 0-否 1-是
  username: text('username'),
  password: text('password'),
  nickname: text('nickname'), // 昵称
  avatar: text('avatar'),
  email: text('email'), // 邮件账号
  mobile: text('mobile'), // 手机号
  country: text('country'), // 国家
  createAt: text('create_at').default(sql`(CURRENT_TIMESTAMP)`),
});

// 角色表
export const role = sqliteTable('role', {
  id: integer('id').primaryKey(),
  name: text('name'), // 角色名称
  desc: text('desc'),
});

// 管理员-角色关联表
export const adminToRole = sqliteTable('admin_to_role', {
  adminId: integer('admin_id')
    .notNull()
    .references(() => admin.id),
  roleId: integer('role_id')
    .notNull()
    .references(() => role.id),
});
