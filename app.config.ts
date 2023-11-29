export default defineAppConfig({
  ui: {
    content: {
      prose: {
        code: {
          icon: {
            c: 'devicon-plain:c',
            rust: 'devicon-plain:rust',
          },
        },
      },
    },
    icons: {
      dynamic: true,
      dark: '@dust:fa6-pro-solid:moon',
      light: '@dust:fa6-pro-solid:sun',
      search: '@dust:fa6-pro-solid:magnifying-glass',
      external: 'i-heroicons-arrow-up-right-20-solid',
      chevron: 'i-heroicons-chevron-down-20-solid',
      hash: 'i-heroicons-hashtag-20-solid',
    },
  },
})
