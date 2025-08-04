import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface ScrollProgressOptions {
  sections?: string[]
  threshold?: number
  debounceMs?: number
}

export interface ScrollProgressState {
  scrollProgress: number
  currentSection: string
  sectionProgress: Record<string, number>
  isScrolling: boolean
}

export const useScrollProgress = (options: ScrollProgressOptions = {}) => {
  const {
    sections = ['hero', 'about', 'projects', 'experience', 'education', 'skills', 'contact'],
    threshold = 100,
    debounceMs = 16 // ~60fps
  } = options

  // Reactive state
  const scrollProgress = ref(0)
  const currentSection = ref('hero')
  const sectionProgress = ref<Record<string, number>>({})
  const isScrolling = ref(false)

  let scrollTimeout: NodeJS.Timeout | null = null
  let lastScrollTime = 0

  // Computed state object
  const state = computed<ScrollProgressState>(() => ({
    scrollProgress: scrollProgress.value,
    currentSection: currentSection.value,
    sectionProgress: sectionProgress.value,
    isScrolling: isScrolling.value
  }))

  // Calculate overall scroll progress (0-100)
  const calculateScrollProgress = (): number => {
    if (typeof window === 'undefined') return 0
    
    const scrollTop = window.scrollY
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    
    if (documentHeight <= 0) return 0
    
    return Math.min(Math.max((scrollTop / documentHeight) * 100, 0), 100)
  }

  // Calculate progress for each section
  const calculateSectionProgress = (): Record<string, number> => {
    if (typeof window === 'undefined') return {}
    
    const progress: Record<string, number> = {}
    const scrollTop = window.scrollY + threshold
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (!element) return
      
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY
      const elementHeight = rect.height
      const elementBottom = elementTop + elementHeight
      
      if (scrollTop < elementTop) {
        // Before section
        progress[sectionId] = 0
      } else if (scrollTop > elementBottom) {
        // After section
        progress[sectionId] = 100
      } else {
        // Within section
        const sectionScrolled = scrollTop - elementTop
        progress[sectionId] = Math.min(Math.max((sectionScrolled / elementHeight) * 100, 0), 100)
      }
    })
    
    return progress
  }

  // Determine current active section
  const determineCurrentSection = (): string => {
    if (typeof window === 'undefined') return 'hero'
    
    const scrollTop = window.scrollY + threshold
    
    // Find the section that's currently most visible
    for (let i = sections.length - 1; i >= 0; i--) {
      const sectionId = sections[i]
      const element = document.getElementById(sectionId)
      
      if (element && element.offsetTop <= scrollTop) {
        return sectionId
      }
    }
    
    return sections[0] || 'hero'
  }

  // Debounced scroll handler
  const handleScroll = () => {
    const now = Date.now()
    
    // Throttle scroll events
    if (now - lastScrollTime < debounceMs) return
    lastScrollTime = now
    
    // Set scrolling state
    isScrolling.value = true
    
    // Clear existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    
    // Update progress values
    scrollProgress.value = calculateScrollProgress()
    sectionProgress.value = calculateSectionProgress()
    currentSection.value = determineCurrentSection()
    
    // Reset scrolling state after delay
    scrollTimeout = setTimeout(() => {
      isScrolling.value = false
    }, 150)
  }

  // Initialize scroll tracking
  const initializeScrollTracking = () => {
    if (typeof window === 'undefined') return
    
    // Initial calculation
    handleScroll()
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
  }

  // Cleanup scroll tracking
  const cleanupScrollTracking = () => {
    if (typeof window === 'undefined') return
    
    window.removeEventListener('scroll', handleScroll)
    
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
      scrollTimeout = null
    }
  }

  // Lifecycle hooks
  onMounted(() => {
    initializeScrollTracking()
  })

  onUnmounted(() => {
    cleanupScrollTracking()
  })

  // Public API
  return {
    // State
    state: readonly(state),
    scrollProgress: readonly(scrollProgress),
    currentSection: readonly(currentSection),
    sectionProgress: readonly(sectionProgress),
    isScrolling: readonly(isScrolling),
    
    // Methods
    calculateScrollProgress,
    calculateSectionProgress,
    determineCurrentSection,
    
    // Configuration
    sections,
    threshold
  }
}