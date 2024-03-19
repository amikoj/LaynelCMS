import { MidwayConfig } from '@midwayjs/core';
import path = require('path');

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1710297932440_6946',
  koa: {
    port: 7001,
  },
  validate: {
    validationOptions: {
      allowUnknown: true, // 全局生效
    },
  },
  view: {
    // 模板引擎
    defaultExtension: '.ejs',
    defaultViewEngine: 'ejs',
    rootDir: {
      // default: path.join(__dirname, '../../theme/default'),
      anotherRoot: path.join(__dirname, '../../theme/default'),
    },
    mapping: {
      '.ejs': 'ejs',
    },
  },
  // ejs config
  ejs: {},
  staticFile: {}, // 静态托管
  jwt: {
    secret: 'laynel-cms-admin', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d', // https://github.com/vercel/ms
  },
  passport: {
    session: false,
  },
  swagger: {
    auth: {
      authType: 'bearer',
    },
    tags: [
      {
        name: 'role',
        description: '角色管理',
      },
      {
        name: 'user',
        description: '用户管理',
      },
    ],
  },
  // redis: {
  //   client: {
  //     port: 6379, // redis容器的端口
  //     host: 'redis', // 这里与docker-compose.yml文件中的redis服务名称一致
  //     password: '', //默认没有密码，请自行修改为redis容器配置的密码
  //     db: 0,
  //   },
  // },
} as MidwayConfig;
