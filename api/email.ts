import sendContactEmail from '../src/libs/ssr/mailer'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const data = await request.body
  response.status(200).json(await sendContactEmail(data))
}
