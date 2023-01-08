import sendContactEmail from '../src/libs/ssr/mailer'
import allowCors from '../src/libs/ssr/cors'
import type { VercelRequest, VercelResponse } from '@vercel/node'

async function handler(request: VercelRequest, response: VercelResponse) {
  const data = await request.body
  response.status(200).json(await sendContactEmail(data))
}

export default allowCors(handler)
