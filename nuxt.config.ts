// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxtjs/i18n'],
  css: ['~/assets/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'de',
    detectBrowserLanguage: false,
    locales: [
      { code: 'de', iso: 'de-DE', name: 'Deutsch' },
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'ja', iso: 'ja-JP', name: '日本語' },
    ],
  },
  app: {
    pageTransition: { 
      name: 'page', 
      mode: 'out-in' 
    },
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/koudous_logo.svg' }
      ]
    }
  },

  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
  runtimeConfig: {
    public: {
      gtagId: process.env.GTAG_ID || ''
    }
  }
})