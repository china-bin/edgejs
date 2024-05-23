import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
  id: integer('id').primaryKey(),
  email: text('email'),
  username: text('username'),
  password: text('password'),
  appType: text('app_type'),
  headImg: text('head_img'),
  oauthType: integer('oauth_type').default(0), //  1=google用户
  openid: text('openid'),
  country: text('country'), // 国家
  city: text('city'), // 城市
  latitude: text('latitude'),
  longitude: text('longitude'),
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
  root: integer('root').default(0), // 是否超级管理员 0-否 1-是
  username: text('username'),
  password: text('password'),
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
