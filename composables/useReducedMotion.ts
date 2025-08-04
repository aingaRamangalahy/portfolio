import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface ReducedMotionOptions {
  respectSystemPreference?: boolean
  storageKey?: string
  fallbackPreference?: boolean
}

export interface ReducedMotionState {
  prefersReducedMotion: boolean
  systemPreference: boolean
  userOverride: boolean | null
  isSupported: boolean
}

export const useReducedMotion = (options: ReducedMotionOptions = {}) => {
  const {
    respectSystemPreference = true,
    storageKey = 'reduced-motion-preference',
    fallbackPreference = false
  } = options

  // Reactive state
  const systemPreference = ref(false)
  const userOverride = ref<boolean | null>(null)
  const isSupported = ref(false)

  // Computed preference based on system and user settings
  const prefersReducedMotion = computed(() => {
    // User override takes precedence
    if (userOverride.value !== null) {
      return userOverride.value
    }
    
    // Fall back to system preference if supported and enabled
    if (respectSystemPreference && isSupported.value) {
      return systemPreference.value
    }
    
    // Final fallback
    return fallbackPreference
  })

  // Computed state object
  const state = computed<ReducedMotionState>(() => ({
    prefersReducedMotion: prefersReducedMotion.value,
    systemPreference: systemPreference.value,
    userOverride: userOverride.value,
    isSupported: isSupported.value
  }))

  // Check if prefers-reduced-motion is supported
  const checkSupport = (): boolean => {
    if (typeof window === 'undefined') return false
    
    try {
      return window.matchMedia('(prefers-reduced-motion)').media !== 'not all'
    } catch {
      return false
    }
  }

  // Get system preference
  const getSystemPreference = (): boolean => {
    if (typeof window === 'undefined') return false
    
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      return false
    }
  }

  // Load user preference from storage
  const loadUserPreference = (): boolean | null => {
    if (typeof window === 'undefined') return null
    
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored === null) return null
      return stored === 'true'
    } catch {
      return null
    }
  }

  // Save user preference to storage
  const saveUserPreference = (preference: boolean | null) => {
    if (typeof window === 'undefined') return
    
    try {
      if (preference === null) {
        localStorage.removeItem(storageKey)
      } else {
        localStorage.setItem(storageKey, preference.toString())
      }
    } catch (error) {
      console.warn('Failed to save reduced motion preference:', error)
    }
  }

  // Set user preference
  const setUserPreference = (preference: boolean | null) => {
    userOverride.value = preference
    saveUserPreference(preference)
    
    // Update CSS custom property for immediate effect
    updateCSSProperty()
    
    // Announce change to screen readers
    announceMotionPreferenceChange(preference)
  }

  // Update CSS custom property
  const updateCSSProperty = () => {
    if (typeof document === 'undefined') return
    
    const root = document.documentElement
    root.style.setProperty('--reduced-motion', prefersReducedMotion.value ? '1' : '0')
    
    // Add/remove class for CSS targeting
    if (prefersReducedMotion.value) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }
  }

  // Announce motion preference change to screen readers
  const announceMotionPreferenceChange = (preference: boolean | null) => {
    if (typeof document === 'undefined') return
    
    const message = preference === null 
      ? 'Motion preference reset to system default'
      : preference 
        ? 'Reduced motion enabled' 
        : 'Full motion enabled'
    
    // Create temporary live region for announcement
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  // Media query change handler
  let mediaQuery: MediaQueryList | null = null
  
  const handleMediaQueryChange = (event: MediaQueryListEvent) => {
    systemPreference.value = event.matches
    updateCSSProperty()
  }

  // Initialize motion detection
  const initializeMotionDetection = () => {
    if (typeof window === 'undefined') return
    
    // Check support
    isSupported.value = checkSupport()
    
    // Get initial system preference
    systemPreference.value = getSystemPreference()
    
    // Load user preference
    userOverride.value = loadUserPreference()
    
    // Set up media query listener
    if (isSupported.value) {
      try {
        mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        mediaQuery.addEventListener('change', handleMediaQueryChange)
      } catch (error) {
        console.warn('Failed to set up reduced motion media query listener:', error)
      }
    }
    
    // Update CSS property
    updateCSSProperty()
  }

  // Cleanup motion detection
  const cleanupMotionDetection = () => {
    if (mediaQuery) {
      try {
        mediaQuery.removeEventListener('change', handleMediaQueryChange)
      } catch (error) {
        console.warn('Failed to remove reduced motion media query listener:', error)
      }
      mediaQuery = null
    }
  }

  // Reset to system preference
  const resetToSystemPreference = () => {
    setUserPreference(null)
  }

  // Toggle reduced motion
  const toggleReducedMotion = () => {
    const currentPreference = prefersReducedMotion.value
    setUserPreference(!currentPreference)
  }

  // Get animation duration based on preference
  const getAnimationDuration = (normalDuration: number, reducedDuration: number = 0): number => {
    return prefersReducedMotion.value ? reducedDuration : normalDuration
  }

  // Get transition duration based on preference
  const getTransitionDuration = (normalDuration: string, reducedDuration: string = '0ms'): string => {
    return prefersReducedMotion.value ? reducedDuration : normalDuration
  }

  // Check if specific animation should be disabled
  const shouldDisableAnimation = (animationType: 'transform' | 'opacity' | 'scroll' | 'all' = 'all'): boolean => {
    if (!prefersReducedMotion.value) return false
    
    // Allow opacity animations even with reduced motion for accessibility
    if (animationType === 'opacity') return false
    
    return true
  }

  // Get safe animation properties
  const getSafeAnimationProps = (props: Record<string, any>): Record<string, any> => {
    if (!prefersReducedMotion.value) return props
    
    // Remove or modify animation properties for reduced motion
    const safeProps = { ...props }
    
    // Remove transform animations but keep opacity
    if (safeProps.transform) {
      delete safeProps.transform
    }
    
    // Reduce animation durations
    if (safeProps.duration) {
      safeProps.duration = Math.min(safeProps.duration, 200)
    }
    
    // Simplify easing
    if (safeProps.easing) {
      safeProps.easing = 'ease'
    }
    
    return safeProps
  }

  // Lifecycle hooks
  onMounted(() => {
    initializeMotionDetection()
  })

  onUnmounted(() => {
    cleanupMotionDetection()
  })

  // Public API
  return {
    // State
    state: readonly(state),
    prefersReducedMotion: readonly(prefersReducedMotion),
    systemPreference: readonly(systemPreference),
    userOverride: readonly(userOverride),
    isSupported: readonly(isSupported),
    
    // Methods
    setUserPreference,
    resetToSystemPreference,
    toggleReducedMotion,
    
    // Utilities
    getAnimationDuration,
    getTransitionDuration,
    shouldDisableAnimation,
    getSafeAnimationProps,
    
    // Internal methods (for testing)
    updateCSSProperty,
    announceMotionPreferenceChange
  }
}

// Global instance for app-wide access
let globalReducedMotionInstance: ReturnType<typeof useReducedMotion> | null = null

export const useGlobalReducedMotion = () => {
  if (!globalReducedMotionInstance) {
    globalReducedMotionInstance = useReducedMotion()
  }
  return globalReducedMotionInstance
}