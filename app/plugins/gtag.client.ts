export default defineNuxtPlugin(() => {
  const CONSENT_KEY = 'cookie_consent_v1'
  const config = useRuntimeConfig()
  const measurementId = config.public?.gtagId

  if (!process.client || !measurementId) return

  function initGtag() {
    const w = window as any
    if (!w.dataLayer) {
      w.dataLayer = []
    }
    w.gtag = function() { w.dataLayer.push(arguments) }
    w.gtag('js', new Date())
    w.gtag('config', measurementId)

    const existing = document.querySelector(`script[src^="https://www.googletagmanager.com/gtag/js?id="]`)
    if (!existing) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
      document.head.appendChild(script)
    }
  }

  const saved = localStorage.getItem(CONSENT_KEY)
  if (saved === 'accepted') {
    initGtag()
  }

  window.addEventListener('cookie-consent-accepted', () => {
    initGtag()
  })
})

