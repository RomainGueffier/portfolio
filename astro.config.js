import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from "astro-icon"

// https://astro.build/config
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
  output: 'server',
  adapter: vercel(),
  markdown: {
    shikiConfig: {
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'github-dark',
      wrap: true,
    },
  },
})
