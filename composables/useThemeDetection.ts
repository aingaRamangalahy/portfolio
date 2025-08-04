export interface ThemeDetectionOptions {
  respectSystemPreference: boolean
  storageKey: string
  fallbackTheme: string
}

export interface ThemeDetectionState {
  systemTheme: 'light' | 'dark'
  userPreference: string | null
  autoDetectionEnabled: boolean
}

export const useThemeDetection = (options: Partial<ThemeDetectionOptions> = {}) => {
  const defaultOptions: ThemeDetectionOptions = {
    respectSystemPreference: true,
    storageKey: 'portfolio-theme-mode',
    fallbackTheme: 'current',
    ...options
  }

  // System theme detection
  const systemTheme = ref<'light' | 'dark'>('light')
  const userPreference = useCookie<string | null>(defaultOptions.storageKey, {
    default: () => null,
    sameSite: 'lax'
  })
  const autoDetectionEnabled = useCookie<boolean>('portfolio-auto-theme', {
    default: () => defaultOptions.respectSystemPreference,
    sameSite: 'lax'
  })

  // Detect system theme preference
  const detectSystemTheme = () => {
    if (import.meta.client && window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
      systemTheme.value = darkModeQuery.matches ? 'dark' : 'light'
      return systemTheme.value
    }
    return 'light'
  }

  // Get the appropriate theme name based on system preference and user settings
  const getThemeForMode = (baseTheme: string, mode: 'light' | 'dark'): string => {
    if (mode === 'dark') {
      return `${baseTheme}-dark`
    }
    return baseTheme
  }

  // Get the current effective theme
  const getEffectiveTheme = (baseTheme: string): string => {
    if (!autoDetectionEnabled.value || userPreference.value) {
      // User has disabled auto-detection or has a manual preference
      return userPreference.value || baseTheme
    }

    // Auto-detection is enabled, use system preference
    const currentSystemTheme = detectSystemTheme()
    return getThemeForMode(baseTheme, currentSystemTheme)
  }

  // Set user preference (overrides auto-detection)
  const setUserPreference = (theme: string | null) => {
    userPreference.value = theme
    if (theme) {
      // User set a manual preference, disable auto-detection
      autoDetectionEnabled.value = false
    }
  }

  // Enable/disable auto-detection
  const setAutoDetection = (enabled: boolean) => {
    autoDetectionEnabled.value = enabled
    if (enabled) {
      // Clear user preference when enabling auto-detection
      userPreference.value = null
    }
  }

  // Listen for system theme changes
  const setupSystemThemeListener = () => {
    if (import.meta.client && window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleThemeChange = (e: MediaQueryListEvent) => {
        systemTheme.value = e.matches ? 'dark' : 'light'
        
        // Announce theme change to screen readers if auto-detection is enabled
        if (autoDetectionEnabled.value) {
          import('~/utils/accessibility').then(({ announceSystemThemeChange }) => {
            announceSystemThemeChange(systemTheme.value)
          })
        }
      }

      // Modern browsers
      if (darkModeQuery.addEventListener) {
        darkModeQuery.addEventListener('change', handleThemeChange)
      } else {
        // Legacy browsers
        darkModeQuery.addListener(handleThemeChange)
      }

      // Initial detection
      detectSystemTheme()

      // Cleanup function
      return () => {
        if (darkModeQuery.removeEventListener) {
          darkModeQuery.removeEventListener('change', handleThemeChange)
        } else {
          darkModeQuery.removeListener(handleThemeChange)
        }
      }
    }
  }

  // Initialize theme detection
  const initializeThemeDetection = () => {
    if (import.meta.client) {
      detectSystemTheme()
      return setupSystemThemeListener()
    }
  }

  // Computed properties for reactive state
  const state = computed<ThemeDetectionState>(() => ({
    systemTheme: systemTheme.value,
    userPreference: userPreference.value,
    autoDetectionEnabled: autoDetectionEnabled.value
  }))

  // Check if current theme is dark mode
  const isDarkMode = computed(() => {
    if (userPreference.value) {
      return userPreference.value.includes('-dark')
    }
    return autoDetectionEnabled.value && systemTheme.value === 'dark'
  })

  // Get base theme name (without -dark suffix)
  const getBaseTheme = (themeName: string): string => {
    return themeName.replace('-dark', '')
  }

  // Toggle between light and dark mode for current theme
  const toggleDarkMode = (currentTheme: string) => {
    const baseTheme = getBaseTheme(currentTheme)
    const isDark = currentTheme.includes('-dark')
    
    if (isDark) {
      setUserPreference(baseTheme)
    } else {
      setUserPreference(`${baseTheme}-dark`)
    }
  }

  return {
    // State
    state: readonly(state),
    systemTheme: readonly(systemTheme),
    userPreference: readonly(userPreference),
    autoDetectionEnabled: readonly(autoDetectionEnabled),
    isDarkMode: readonly(isDarkMode),

    // Methods
    detectSystemTheme,
    getThemeForMode,
    getEffectiveTheme,
    setUserPreference,
    setAutoDetection,
    initializeThemeDetection,
    getBaseTheme,
    toggleDarkMode
  }
}