import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '@utils/parser/cookie'

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (
    process.env.ALLOW_IP &&
    req.headers['x-forwarded-for'].includes(process.env.ALLOW_IP)
  ) {
    // Calling our pure function using the `res` object, it will add the `set-cookie` header
    setCookie(res, 'x-custom-authorized', process.env.AUTH_KEY, {
      path: '/',
      maxAge: 1800, // 30 min
    })
    // Return the `set-cookie` header so we can display it in the browser and show that it works!
    res.end(res.getHeader('Set-Cookie'))
  }
  res.status(200).json({ message: 'Unauthorized' })
}

export default handler
