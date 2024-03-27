# my_midway_project

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.


[midway]: https://midwayjs.org



## Prisma orm

- 迁移数据库
```
$ npx prisma migrate dev --name init
```

- prisma图形化界面

```
$ npx prisma studio
```

- 初始模式推送到数据库

```
$ npx prisma db push
```

- 数据库重置

```
$ prisma migrate reset # # 此命令删除并重新创建数据库，或通过删除所有数据、表、索引和其他来进行重置

```

- 部署到暂存、测试和生产环境，它只运行迁移文件

```
$ npx prisma migrate deploy
```

- 将迁移标记为以应用，或回滚至目标版本

```

$ npx prisma migrate resolve 
--applied %migrateName%   # 将migrateName标为已应用，执行dev时会跳过改迁移, 
--rolled-back %migrateName%  # 回滚至migrateName版本的迁移
```
