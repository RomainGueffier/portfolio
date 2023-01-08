import { Mailer } from '../src/libs/ssr/mailer'
import allowCors from '../src/libs/ssr/cors'
import type { VercelRequest, VercelResponse } from '@vercel/node'

async function handler(request: VercelRequest, response: VercelResponse) {
  const data = await request.body
  const result = await Mailer.sendContactEmail(data)
  console.log(result)
  response.status(200).json('success')
}

export default allowCors(handler)
