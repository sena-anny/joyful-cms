import { setCookie } from '@utils/parser/cookie'
import { VercelRequest, VercelResponse } from '@vercel/node'

export default (req: VercelRequest, res: VercelResponse) => {
  if (
    process.env.ALLOW_IP &&
    req.headers['x-forwarded-for'].includes(process.env.ALLOW_IP)
  ) {
    // Calling our pure function using the `res` object, it will add the `set-cookie` header
    setCookie(res, 'x-custom-authorized', process.env.AUTH_KEY, {
      path: '/',
      maxAge: 600000, // 10 min
    })
    // Return the `set-cookie` header so we can display it in the browser and show that it works!
    res.end(res.getHeader('Set-Cookie'))
    return
  }
  setCookie(res, 'x-custom-authorized', 'false', {
    path: '/',
    maxAge: 600000, // 10 min
  })
  res.status(200).json({ message: 'Unauthorized' })
}
