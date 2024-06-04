# LaynelCMS
基于midway实现一个CMS系统


## 框架选型
- 开发框架：midwayjs
- Sql数据库：mysql + redis
- ORM框架：Prisma
- 注册登录认证： JWT
- 角色权限控制：RBAC
- 模板引擎：midway-ejs

## 数据库更新

```
$ npx prisma migrate dev --name init #初始化迁移历史
$ npx prisma migrate deploy  # 将迁移脚本应用到数据库

```