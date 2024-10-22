const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';
const isDev = NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  async rewrites() {
    // This is an example of how to proxy API requests to a different server.映射到其他服务器的API请求的例子
    return [
      {
        source: '/api/:path*',
        destination: isDev ? 'http://localhost:8000/api/:path*' : '/api/:path*',
      },
      {
        source: '/docs',
        destination: isDev ? 'http://127.0.0.1:8000/docs' : 'api/docs',
      }, {
        source: '/openapi.json',
        destination: isDev ? 'http://127.0.0.1:8000/openapi.json' : 'api/openapi.json',
      }
    ];
  },
  i18n: {
    locales: ['zh', 'en-US','zh-CN','ja'],
    defaultLocale: 'zh',
    domains: [
      {
        domain: 'www.liaocaowu.cn',
        defaultLocale: 'zh-CN'
      }
    ]
  }
};

export default nextConfig;