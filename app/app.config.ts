export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'neutral'
    },
    carousel: {
      variants: {
        active: {
          true: {
            dot: 'data-[state=active]:bg-primary'
          }
        }
      }
    },
    colorMode: {
      icons: {
        light: 'material-symbols:light-mode',
        dark: 'material-symbols:dark-mode'
      }
    }
  }
})