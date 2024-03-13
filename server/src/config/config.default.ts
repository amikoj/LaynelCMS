import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1710297932440_6946',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: 'xxxxxxxxxxxxxx', // fs.readFileSync('xxxxx.key')
    sign: {
      // signOptions
      expiresIn: '2d', // https://github.com/vercel/ms
    },
    verify: {
      // verifyOptions
    },
    decode: {
      // decodeOptions
    },
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
