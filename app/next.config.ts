import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  async rewrites() {
    // This is an example of how to proxy API requests to a different server.映射到其他服务器的API请求的例子
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/:path*',
      },
    ];
  },
};

export default nextConfig;