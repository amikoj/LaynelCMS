
import nextTranslate from 'next-translate-plugin';

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';
const isDev = NODE_ENV === 'development';


/**
 * Next.js configuration options
 * @type {import('next').NextConfig}
 */
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
        destination: isDev ? 'http://127.0.0.1:8000/docs' : '/api/docs',
      }, {
        source: '/openapi.json',
        destination: isDev ? 'http://127.0.0.1:8000/openapi.json' : '/api/openapi.json',
      }
    ];
  },
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',    
  }
};

export default nextTranslate(nextConfig);