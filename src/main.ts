import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import { useTheme } from './composables/useTheme'

// Import translations
import en from './i18n/locales/en.json'
import fr from './i18n/locales/fr.json'

// Detect user's preferred language
function getInitialLocale(): string {
  // Check if there's a saved language preference
  const saved = localStorage.getItem('portfolio-locale')
  if (saved && ['en', 'fr'].includes(saved)) {
    return saved
  }
  
  // Fall back to browser language
  const browserLang = navigator.language.split('-')[0]
  return ['en', 'fr'].includes(browserLang) ? browserLang : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    fr
  }
})

const app = createApp(App)

// Initialize theme system
const { setTheme, currentTheme } = useTheme()

app.use(router)
app.use(i18n)
app.mount('#app')
