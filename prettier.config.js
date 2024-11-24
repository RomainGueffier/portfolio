export default {
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  useTabs: false,
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss'
  ],
  overrides: [
    {
      files: '*.css',
      options: {
        singleQuote: false
      }
    },
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
}
