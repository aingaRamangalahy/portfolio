import { ref, computed, watch } from 'vue'

export type ThemeName = 'current' | 'ghibli' | 'slack' | 'claude'

export interface Theme {
  name: ThemeName
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

const themes: Record<ThemeName, Theme> = {
  current: {
    name: 'current',
    label: 'Default Light',
    icon: '💡',
    preview: 'linear-gradient(135deg, oklch(0.97 0 0) 0%, oklch(0.922 0 0) 100%)',
    colors: {
      primary: 'oklch(0.145 0 0)',
      secondary: 'oklch(0.205 0 0)',
      accent: 'oklch(0.5 0.03 260)',
      background: 'oklch(1 0 0)',
      surface: 'oklch(0.97 0 0)',
      text: 'oklch(0.145 0 0)',
      textSecondary: 'oklch(0.35 0 0)',
      border: 'oklch(0.922 0 0)',
      gradient: 'linear-gradient(135deg, oklch(0.97 0 0) 0%, oklch(0.922 0 0) 100%)'
    }
  },
  ghibli: {
    name: 'ghibli',
    label: 'Ghibli Studio',
    icon: '🌿',
    preview: 'linear-gradient(135deg, #e6efdc 0%, #f0f7e8 100%)',
    colors: {
      primary: '#2d5016',
      secondary: '#4a7c59',
      accent: '#c9df8a',
      background: '#f0f7e8',
      surface: '#e6efdc',
      text: '#2d5016',
      textSecondary: '#4a7c59',
      border: '#a7c990',
      gradient: 'linear-gradient(135deg, #e6efdc 0%, #f0f7e8 100%)'
    }
  },
  slack: {
    name: 'slack',
    label: 'Slack',
    icon: '💬',
    preview: 'linear-gradient(135deg, #4a154b 0%, #611f69 50%, #8e44ad 100%)',
    colors: {
      primary: '#4a154b',
      secondary: '#611f69',
      accent: '#8e44ad',
      background: '#f8f8f8',
      surface: '#efefef',
      text: '#1d1c1d',
      textSecondary: '#605e60',
      border: '#d1d0d1',
      gradient: 'linear-gradient(135deg, #efefef 0%, #f8f8f8 100%)'
    }
  },
  claude: {
    name: 'claude',
    label: 'Claude',
    icon: '🤖',
    preview: 'linear-gradient(135deg, #faefe5 0%, #fdf6f0 100%)',
    colors: {
      primary: '#c5633a',
      secondary: '#d97757',
      accent: '#ffb366',
      background: '#fdf6f0',
      surface: '#faefe5',
      text: '#7d3a1f',
      textSecondary: '#a75a39',
      border: '#f0d4c4',
      gradient: 'linear-gradient(135deg, #faefe5 0%, #fdf6f0 100%)'
    }
  }
}

const THEME_STORAGE_KEY = 'portfolio-theme'

const currentTheme = ref<ThemeName>('current')

// Load theme from localStorage
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName
  if (stored && themes[stored]) {
    currentTheme.value = stored
  }
}

function applyTheme(themeName: ThemeName) {
  const theme = themes[themeName]
  const root = document.documentElement

  // Apply CSS custom properties
  Object.entries(theme.colors).forEach(([key, value]) => {
    // Convert camelCase to kebab-case for CSS variables
    const cssKey = key === 'textSecondary' ? 'text-secondary' : key
    root.style.setProperty(`--color-${cssKey}`, value)
  })

  // Apply theme class
  root.className = root.className.replace(/theme-\w+/g, '')
  root.classList.add(`theme-${themeName}`)
}

function setTheme(themeName: ThemeName) {
  currentTheme.value = themeName
  applyTheme(themeName)
  localStorage.setItem(THEME_STORAGE_KEY, themeName)
}

// Apply initial theme
if (typeof window !== 'undefined') {
  applyTheme(currentTheme.value)
}

// Watch for theme changes
watch(currentTheme, (newTheme) => {
  applyTheme(newTheme)
})

export function useTheme() {
  return {
    currentTheme: computed(() => currentTheme.value),
    themes,
    setTheme,
    getCurrentTheme: () => themes[currentTheme.value]
  }
} 