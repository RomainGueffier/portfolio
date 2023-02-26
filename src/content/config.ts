import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    alt: z.string().optional(),
    publishedAt: z.date(),
    description: z.string(),
  }),
})

export const collections = {
  blog: blogCollection,
}
