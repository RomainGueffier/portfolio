import type { APIRoute } from 'astro'
import { Mailer } from '../../libs/ssr/mailer'

export const post: APIRoute = async ({ request }) => {
  const data = await request.json()
  const sent = await Mailer.sendContactEmail(data)
  return new Response(JSON.stringify(sent), { status: 200 })
}
