export default defineAppConfig({
  ui: {
    breadcrumb: {
      default: {
        divider: 'i-heroicons-chevron-right-20-solid'
      }
    },
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
    },
  },
})
