import type { APIRoute } from 'astro'

export const post: APIRoute = async ({ request }) => {
  const data = await request.json()
  return new Response(JSON.stringify(data), { status: 200 })
}
