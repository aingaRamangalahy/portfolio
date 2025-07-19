export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-07-17',
  ssr: true, // Enable SSR for better SEO and performance

  // CSS & Styling
  css: ['~/assets/css/main.css'],

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@vueuse/nuxt'
  ],

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: false // Disable type checking during build to avoid issues
  },

  // App configuration
  app: {
    head: {
      title: 'Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional portfolio showcasing my work and experience' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }
      ]
    }
  },

  // i18n configuration
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'portfolio-locale',
      redirectOn: 'root',
      alwaysRedirect: false
    },
    compilation: {
      strictMessage: false // Allow HTML in messages
    }
  },

  // Tailwind configuration
  tailwindcss: {
    configPath: '~/tailwind.config.js'
  },

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    }
  },

  // Nitro configuration for static generation
  nitro: {
    prerender: {
      routes: ['/']
    }
  },

  // Vite configuration to handle compatibility issues
  vite: {
    optimizeDeps: {
      exclude: ['oxc-parser']
    }
  }
})