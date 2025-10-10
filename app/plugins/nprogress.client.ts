import NProgress from 'nprogress'

export default defineNuxtPlugin((nuxtApp) => {
  // Configure NProgress
  NProgress.configure({ 
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.1
  })

  nuxtApp.hook('page:start', () => {
    NProgress.start()
  })

  nuxtApp.hook('page:finish', () => {
    NProgress.done()
  })

  nuxtApp.hook('page:transition:finish', () => {
    NProgress.done()
  })
})
