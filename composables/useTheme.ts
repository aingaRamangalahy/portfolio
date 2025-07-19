export interface Theme {
  name: string
  label: string
  icon: string
  preview: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    gradient: string
  }
}

export type ThemeName = 'current' | 'ghibli' | 'slack' | 'claude'

const themes: Record<ThemeName, Theme> = {
  current: {
    name: 'current',
    label: 'Modern Minimal',
    icon: '✨',
    preview: 'linear-gradient(135deg, oklch(0.98 0 0) 0%, oklch(0.94 0 0) 100%)',
    colors: {
      primary: 'oklch(0.15 0.05 270)',
      secondary: 'oklch(0.25 0.03 270)',
      accent: 'oklch(0.65 0.15 250)',
      background: 'oklch(1 0 0)',
      surface: 'oklch(0.98 0 0)',
      text: 'oklch(0.12 0.02 270)',
      textSecondary: 'oklch(0.45 0.01 270)',
      border: 'oklch(0.94 0 0)',
      gradient: 'linear-gradient(135deg, oklch(0.98 0 0) 0%, oklch(0.96 0 0) 100%)'
    }
  },
  ghibli: {
    name: 'ghibli',
    label: 'Ghibli Studio',
    icon: '🌱',
    preview: 'linear-gradient(135deg, oklch(0.95 0.02 120) 0%, oklch(0.88 0.03 120) 100%)',
    colors: {
      primary: 'oklch(0.35 0.15 140)',
      secondary: 'oklch(0.45 0.12 140)',
      accent: 'oklch(0.75 0.12 120)',
      background: 'oklch(0.98 0.01 120)',
      surface: 'oklch(0.95 0.02 120)',
      text: 'oklch(0.25 0.08 140)',
      textSecondary: 'oklch(0.50 0.06 140)',
      border: 'oklch(0.88 0.03 120)',
      gradient: 'linear-gradient(135deg, oklch(0.95 0.02 120) 0%, oklch(0.98 0.01 120) 100%)'
    }
  },
  slack: {
    name: 'slack',
    label: 'Slack',
    icon: '💼',
    preview: 'linear-gradient(135deg, oklch(0.96 0.01 320) 0%, oklch(0.90 0.02 320) 100%)',
    colors: {
      primary: 'oklch(0.30 0.15 320)',
      secondary: 'oklch(0.40 0.12 320)',
      accent: 'oklch(0.60 0.18 280)',
      background: 'oklch(0.99 0 0)',
      surface: 'oklch(0.96 0.01 320)',
      text: 'oklch(0.15 0.02 320)',
      textSecondary: 'oklch(0.45 0.03 320)',
      border: 'oklch(0.90 0.02 320)',
      gradient: 'linear-gradient(135deg, oklch(0.96 0.01 320) 0%, oklch(0.99 0 0) 100%)'
    }
  },
  claude: {
    name: 'claude',
    label: 'Claude AI',
    icon: '🎨',
    preview: 'linear-gradient(135deg, oklch(0.98 0.01 93.48) 0%, oklch(0.97 0.01 93.49) 100%)',
    colors: {
      primary: 'oklch(0.62 0.14 39.15)',
      secondary: 'oklch(0.92 0.01 87.42)',
      accent: 'oklch(0.56 0.13 42.95)',
      background: 'oklch(0.98 0.01 93.48)',
      surface: 'oklch(0.97 0.01 93.49)',
      text: 'oklch(0.34 0.03 94.42)',
      textSecondary: 'oklch(0.61 0.01 91.49)',
      border: 'oklch(0.88 0.01 100.76)',
      gradient: 'linear-gradient(135deg, oklch(0.98 0.01 93.48) 0%, oklch(0.97 0.01 93.49) 100%)'
    }
  }
}

export const useTheme = () => {
  // Use Nuxt's useCookie for SSR-safe storage
  const currentThemeName = useCookie<ThemeName>('portfolio-theme', {
    default: () => 'current',
    sameSite: 'lax'
  })

  const currentTheme = computed(() => themes[currentThemeName.value])

  const setTheme = (themeName: ThemeName) => {
    currentThemeName.value = themeName
    applyTheme(themes[themeName])
  }

  const applyTheme = (theme: Theme) => {
    if (process.client) {
      const root = document.documentElement

      // Remove any existing theme classes
      Object.keys(themes).forEach(name => {
        root.classList.remove(`theme-${name}`)
      })

      // Add the new theme class
      root.classList.add(`theme-${theme.name}`)
    }
  }

  const loadSavedTheme = () => {
    if (process.client) {
      applyTheme(themes[currentThemeName.value])
    }
  }

  // Auto-apply theme on client side
  onMounted(() => {
    loadSavedTheme()
  })

  return {
    themes,
    currentTheme,
    currentThemeName: readonly(currentThemeName),
    setTheme,
    loadSavedTheme
  }
}