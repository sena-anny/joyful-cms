import { serialize, CookieSerializeOptions } from 'cookie'
import { VercelResponse } from '@vercel/node'

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
  res: VercelResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
): void => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}
