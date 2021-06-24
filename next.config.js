module.exports = {
  async rewrites() {
    if (!process.env.VERCEL_ENV) return {}
    return [
      {
        source: '/posts/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-for',
            value: process.env.ALLOW_IP,
          },
        ],
        destination: '/posts/:path*',
      },
      {
        source: '/users/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-for',
            value: process.env.ALLOW_IP,
          },
        ],
        destination: '/users/:path*',
      },
      {
        source: '/posts/:path*',
        destination: '/',
      },
      {
        source: '/users/:path*',
        destination: '/',
      },
    ]
  },
}
