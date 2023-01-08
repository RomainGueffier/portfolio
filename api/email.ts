import sendContactEmail from '../src/libs/ssr/mailer'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const data = await request.body
  const sent = await sendContactEmail(data)
  response.status(200).send(JSON.stringify(sent))
}
