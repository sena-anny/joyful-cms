module.exports = {
  async rewrites() {
    if (!process.env.VERCEL_ENV) return {}
    return {
      // beforeFiles: [
      //   {
      //     source: '/api/:path*/',
      //     destination: '/api/:path*',
      //   },
      //   {
      //     source: '/posts/:path*',
      //     has: [
      //       {
      //         type: 'cookie',
      //         key: 'x-custom-authorized',
      //         value: process.env.AUTH_KEY,
      //       },
      //     ],
      //     destination: '/posts/:path*',
      //   },
      //   {
      //     source: '/users/:path*',
      //     has: [
      //       {
      //         type: 'cookie',
      //         key: 'x-custom-authorized',
      //         value: process.env.AUTH_KEY,
      //       },
      //     ],
      //     destination: '/users/:path*',
      //   },
      //   {
      //     source: '/posts/:path*',
      //     has: [
      //       {
      //         type: 'cookie',
      //         key: 'x-custom-authorized',
      //         value: 'false',
      //       },
      //     ],
      //     destination: '/',
      //   },
      //   {
      //     source: '/users/:path*',
      //     has: [
      //       {
      //         type: 'cookie',
      //         key: 'x-custom-authorized',
      //         value: 'false',
      //       },
      //     ],
      //     destination: '/',
      //   },
      // ],
    }
  },
}
