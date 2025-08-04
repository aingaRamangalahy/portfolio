import { nextTick, computed, readonly, onMounted, onUnmounted, watch } from 'vue'

export interface Theme {
  name: string
  label: string
  icon: string
  preview: string
  darkPreview?: string
}

export type ThemeName = 'current' | 'ghibli' | 'slack' | 'claude' | 'current-dark' | 'ghibli-dark' | 'slack-dark' | 'claude-dark'

const themes: Record<ThemeName, Theme> = {
  current: {
    name: 'current',
    label: 'Modern Minimal',
    icon: '✨',
    preview: 'linear-gradient(135deg, oklch(0.98 0 0) 0%, oklch(0.94 0 0) 100%)',
    darkPreview: 'linear-gradient(135deg, oklch(0.12 0.03 270) 0%, oklch(0.08 0.02 270) 100%)'
  },
  'current-dark': {
    name: 'current-dark',
    label: 'Modern Minimal Dark',
    icon: '✨',
    preview: 'linear-gradient(135deg, oklch(0.12 0.03 270) 0%, oklch(0.08 0.02 270) 100%)'
  },
  ghibli: {
    name: 'ghibli',
    label: 'Ghibli Studio',
    icon: '🌱',
    preview: 'linear-gradient(135deg, oklch(0.95 0.02 120) 0%, oklch(0.88 0.03 120) 100%)',
    darkPreview: 'linear-gradient(135deg, oklch(0.12 0.04 140) 0%, oklch(0.08 0.03 140) 100%)'
  },
  'ghibli-dark': {
    name: 'ghibli-dark',
    label: 'Ghibli Studio Dark',
    icon: '🌱',
    preview: 'linear-gradient(135deg, oklch(0.12 0.04 140) 0%, oklch(0.08 0.03 140) 100%)'
  },
  slack: {
    name: 'slack',
    label: 'Slack',
    icon: '💼',
    preview: 'linear-gradient(135deg, oklch(0.96 0.01 320) 0%, oklch(0.90 0.02 320) 100%)',
    darkPreview: 'linear-gradient(135deg, oklch(0.12 0.03 320) 0%, oklch(0.08 0.02 320) 100%)'
  },
  'slack-dark': {
    name: 'slack-dark',
    label: 'Slack Dark',
    icon: '💼',
    preview: 'linear-gradient(135deg, oklch(0.12 0.03 320) 0%, oklch(0.08 0.02 320) 100%)'
  },
  claude: {
    name: 'claude',
    label: 'Claude AI',
    icon: '🎨',
    preview: 'linear-gradient(135deg, oklch(0.98 0.01 93.48) 0%, oklch(0.97 0.01 93.49) 100%)',
    darkPreview: 'linear-gradient(135deg, oklch(0.12 0.03 93.49) 0%, oklch(0.08 0.02 94.42) 100%)'
  },
  'claude-dark': {
    name: 'claude-dark',
    label: 'Claude AI Dark',
    icon: '🎨',
    preview: 'linear-gradient(135deg, oklch(0.12 0.03 93.49) 0%, oklch(0.08 0.02 94.42) 100%)'
  }
}

export const useTheme = () => {
  // Initialize theme detection
  const themeDetection = useThemeDetection()
  
  // Base theme selection (without dark/light mode)
  const baseThemeName = useCookie<string>('portfolio-base-theme', {
    default: () => 'claude',
    sameSite: 'lax'
  })

  // Get the effective theme name (with auto-detection applied)
  const currentThemeName = computed<ThemeName>(() => {
    const effectiveTheme = themeDetection.getEffectiveTheme(baseThemeName.value)
    return effectiveTheme as ThemeName
  })

  const currentTheme = computed(() => themes[currentThemeName.value])

  // Get base themes (without dark variants) for theme selection UI
  const baseThemes = computed(() => {
    const baseThemeNames = ['current', 'ghibli', 'slack', 'claude'] as const
    return baseThemeNames.reduce((acc, name) => {
      acc[name] = themes[name]
      return acc
    }, {} as Record<string, Theme>)
  })

  const setTheme = (themeName: ThemeName) => {
    const previousTheme = currentThemeName.value
    
    // If it's a dark theme, extract the base theme and set user preference
    if (themeName.includes('-dark')) {
      const baseTheme = themeName.replace('-dark', '')
      baseThemeName.value = baseTheme
      themeDetection.setUserPreference(themeName)
    } else {
      // Light theme - set base theme and user preference
      baseThemeName.value = themeName
      themeDetection.setUserPreference(themeName)
    }
    
    // Theme will be applied automatically by the watcher
    
    // Announce theme change to screen readers if theme actually changed
    if (import.meta.client && previousTheme !== currentThemeName.value) {
      // Import dynamically to avoid SSR issues
      import('~/utils/accessibility').then(({ announceThemeChange }) => {
        announceThemeChange(currentThemeName.value, themes[currentThemeName.value].label)
      })
    }
  }

  // Set base theme (maintains current dark/light mode preference)
  const setBaseTheme = (baseTheme: string) => {
    const previousTheme = currentThemeName.value
    const wasDarkMode = isDarkMode.value
    
    baseThemeName.value = baseTheme
    
    // Maintain dark mode preference when switching themes
    if (wasDarkMode) {
      themeDetection.setUserPreference(`${baseTheme}-dark`)
    } else {
      themeDetection.setUserPreference(baseTheme)
    }
    
    // Force immediate theme application
    nextTick(() => {
      const newThemeName = currentThemeName.value
      applyTheme(themes[newThemeName])
      
      // Announce theme change to screen readers if theme actually changed
      if (import.meta.client && previousTheme !== newThemeName) {
        import('~/utils/accessibility').then(({ announceThemeChange }) => {
          announceThemeChange(newThemeName, themes[newThemeName].label)
        })
      }
    })
  }

  // Toggle dark mode for current base theme
  const toggleDarkMode = () => {
    const currentTheme = currentThemeName.value
    themeDetection.toggleDarkMode(currentTheme)
    
    // Force immediate theme application
    nextTick(() => {
      const newThemeName = currentThemeName.value
      applyTheme(themes[newThemeName])
    })
  }

  // Enable/disable auto-detection
  const setAutoDetection = (enabled: boolean) => {
    themeDetection.setAutoDetection(enabled)
    // Theme will be applied automatically by the watcher
  }

  const applyTheme = (theme: Theme) => {
    if (import.meta.client) {
      const root = document.documentElement

      // Remove any existing theme classes and data attributes
      Object.keys(themes).forEach(name => {
        root.classList.remove(`theme-${name}`)
      })
      
      // Remove existing theme data attribute
      root.removeAttribute('data-theme')

      // Get base theme and dark mode status
      const baseTheme = getBaseTheme(theme.name)
      const isDark = theme.name.includes('-dark')
      
      // Apply dark class if needed
      if (isDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      
      // Set the theme data attribute - this will trigger the CSS theme rules
      root.setAttribute('data-theme', baseTheme)
      
      // Add the theme class for any additional styling
      root.classList.add(`theme-${theme.name}`)
    }
  }

  const loadSavedTheme = () => {
    if (import.meta.client) {
      applyTheme(themes[currentThemeName.value])
    }
  }

  // Get base theme name (without -dark suffix)
  const getBaseTheme = (themeName: string): string => {
    return themeDetection.getBaseTheme(themeName)
  }

  // Check if current theme is dark mode
  const isDarkMode = computed(() => {
    return themeDetection.isDarkMode.value
  })

  // Auto-apply theme on client side and setup listeners
  let cleanupThemeListener: (() => void) | undefined

  onMounted(() => {
    loadSavedTheme()
    cleanupThemeListener = themeDetection.initializeThemeDetection()
    
    // Watch for system theme changes - the currentThemeName watcher will handle the application
    watch(
      () => themeDetection.systemTheme.value,
      () => {
        // The theme will be applied automatically by the currentThemeName watcher
        // since the computed currentThemeName will change when system theme changes
      }
    )
    
    // Watch for theme name changes and apply them
    watch(
      currentThemeName,
      (newTheme) => {
        applyTheme(themes[newTheme])
      },
      { immediate: false }
    )
  })

  onUnmounted(() => {
    if (cleanupThemeListener) {
      cleanupThemeListener()
    }
  })

  return {
    themes,
    baseThemes,
    currentTheme,
    currentThemeName: readonly(currentThemeName),
    baseThemeName: readonly(baseThemeName),
    isDarkMode: readonly(isDarkMode),
    
    // Theme detection state
    systemTheme: themeDetection.systemTheme,
    autoDetectionEnabled: themeDetection.autoDetectionEnabled,
    userPreference: themeDetection.userPreference,
    
    // Methods
    setTheme,
    setBaseTheme,
    toggleDarkMode,
    setAutoDetection,
    loadSavedTheme,
    getBaseTheme
  }
}