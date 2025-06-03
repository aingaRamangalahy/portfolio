import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'

export const LOCALE_STORAGE_KEY = 'portfolio-locale'

const getDefaultLocale = () => {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored && ['en', 'fr'].includes(stored)) {
    return stored
  }
  
  // Check browser language
  const browserLang = navigator.language.split('-')[0]
  return ['en', 'fr'].includes(browserLang) ? browserLang : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    fr
  }
})

export default i18n 