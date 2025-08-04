import { ref, readonly, onMounted, onUnmounted } from 'vue'
import { createLiveRegion, announceLive, announceThemeChange, announceLanguageChange, announceNavigationChange } from '~/utils/accessibility'

export interface ScreenReaderOptions {
  enableThemeAnnouncements?: boolean
  enableLanguageAnnouncements?: boolean
  enableNavigationAnnouncements?: boolean
  enableStatusAnnouncements?: boolean
}

export const useScreenReader = (options: ScreenReaderOptions = {}) => {
  const {
    enableThemeAnnouncements = true,
    enableLanguageAnnouncements = true,
    enableNavigationAnnouncements = true,
    enableStatusAnnouncements = true
  } = options

  const isInitialized = ref(false)

  // Initialize live regions on client side
  const initializeLiveRegions = () => {
    if (process.client && !isInitialized.value) {
      // Create live regions for different types of announcements
      createLiveRegion('theme-announcements', 'polite')
      createLiveRegion('language-announcements', 'polite')
      createLiveRegion('navigation-announcements', 'polite')
      createLiveRegion('status-announcements', 'assertive')
      createLiveRegion('default-live-region', 'polite')
      
      isInitialized.value = true
    }
  }

  // Announce theme changes
  const announceTheme = (themeName: string, themeLabel: string) => {
    if (enableThemeAnnouncements && process.client) {
      announceThemeChange(themeName, themeLabel)
    }
  }

  // Announce language changes
  const announceLanguage = (languageCode: string, languageName: string) => {
    if (enableLanguageAnnouncements && process.client) {
      announceLanguageChange(languageCode, languageName)
    }
  }

  // Announce navigation changes
  const announceNavigation = (sectionName: string) => {
    if (enableNavigationAnnouncements && process.client) {
      announceNavigationChange(sectionName)
    }
  }

  // Announce status changes
  const announceStatus = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (enableStatusAnnouncements && process.client) {
      const regionId = priority === 'assertive' ? 'status-announcements' : 'default-live-region'
      announceLive(message, regionId)
    }
  }

  // Generic announcement function
  const announce = (message: string, regionId?: string) => {
    if (process.client) {
      announceLive(message, regionId)
    }
  }

  onMounted(() => {
    initializeLiveRegions()
  })

  return {
    isInitialized: readonly(isInitialized),
    announceTheme,
    announceLanguage,
    announceNavigation,
    announceStatus,
    announce,
    initializeLiveRegions
  }
}