import { ref, computed, onMounted, onUnmounted } from 'vue'
import { globalFocusManager, type FocusManager } from '~/utils/accessibility'
import { useGlobalReducedMotion } from '~/composables/useReducedMotion'

export interface KeyboardNavigationOptions {
  sections: string[]
  enableArrowKeys?: boolean
  enableEscapeKey?: boolean
  focusManagement?: boolean
}

export interface KeyboardNavigationState {
  currentFocusIndex: number
  isNavigating: boolean
  focusHistory: string[]
}

export function useKeyboardNavigation(options: KeyboardNavigationOptions = {
  sections: ['hero', 'about', 'projects', 'experience', 'education', 'skills', 'contact'],
  enableArrowKeys: true,
  enableEscapeKey: true,
  focusManagement: true
}) {
  // State
  const currentFocusIndex = ref(0)
  const isNavigating = ref(false)
  const focusHistory = ref<string[]>([])
  
  // Default sections from navigation
  const defaultSections = ['hero', 'about', 'projects', 'experience', 'education', 'skills', 'contact']
  const sections = computed(() => options.sections || defaultSections)
  
  // Current focused section
  const currentSection = computed(() => sections.value[currentFocusIndex.value] || sections.value[0])
  
  // Get reduced motion instance
  const { prefersReducedMotion } = useGlobalReducedMotion()
  
  // Navigation functions
  function navigateToSection(sectionId: string) {
    const element = document.getElementById(sectionId)
    if (element) {
      isNavigating.value = true
      
      // Use appropriate scroll behavior based on motion preference
      const scrollBehavior = prefersReducedMotion.value ? 'auto' : 'smooth'
      element.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
      
      // Update focus index
      const index = sections.value.indexOf(sectionId)
      if (index !== -1) {
        currentFocusIndex.value = index
      }
      
      // Add to focus history
      if (focusHistory.value[focusHistory.value.length - 1] !== sectionId) {
        focusHistory.value.push(sectionId)
        // Keep history limited to last 10 items
        if (focusHistory.value.length > 10) {
          focusHistory.value = focusHistory.value.slice(-10)
        }
      }
      
      // Reset navigation flag after animation (shorter timeout for reduced motion)
      const timeout = prefersReducedMotion.value ? 100 : 1000
      setTimeout(() => {
        isNavigating.value = false
      }, timeout)
    }
  }
  
  function navigateUp() {
    if (currentFocusIndex.value > 0) {
      currentFocusIndex.value--
      navigateToSection(sections.value[currentFocusIndex.value])
    }
  }
  
  function navigateDown() {
    if (currentFocusIndex.value < sections.value.length - 1) {
      currentFocusIndex.value++
      navigateToSection(sections.value[currentFocusIndex.value])
    }
  }
  
  function navigateToIndex(index: number) {
    if (index >= 0 && index < sections.value.length) {
      currentFocusIndex.value = index
      navigateToSection(sections.value[index])
    }
  }
  
  // Panel management functions
  const openPanels = ref<Set<string>>(new Set())
  
  function registerPanel(panelId: string, container?: HTMLElement) {
    openPanels.value.add(panelId)
    
    // If focus management is enabled and container is provided, create focus trap
    if (options.focusManagement && container) {
      globalFocusManager.trapFocus(panelId, container)
    }
  }
  
  function unregisterPanel(panelId: string) {
    openPanels.value.delete(panelId)
    
    // Release focus trap and restore focus
    if (options.focusManagement) {
      globalFocusManager.releaseFocusTrap(panelId)
      globalFocusManager.restoreFocus()
    }
  }
  
  function closeAllPanels() {
    // Release all focus traps and restore focus
    if (options.focusManagement) {
      globalFocusManager.releaseAllFocusTraps()
      globalFocusManager.restoreFocus()
    }
    
    // Emit custom event to close panels
    const event = new CustomEvent('keyboard-navigation:close-panels')
    document.dispatchEvent(event)
    openPanels.value.clear()
  }
  
  // Enhanced focus management
  function manageFocus(element: HTMLElement) {
    if (options.focusManagement) {
      globalFocusManager.focusElement(element)
      const scrollBehavior = prefersReducedMotion.value ? 'auto' : 'smooth'
      element.scrollIntoView({ behavior: scrollBehavior, block: 'center' })
    }
  }
  
  function restoreFocus() {
    if (options.focusManagement) {
      return globalFocusManager.restoreFocus()
    }
    
    // Fallback to previous implementation
    if (focusHistory.value.length > 1) {
      const previousSection = focusHistory.value[focusHistory.value.length - 2]
      const element = document.getElementById(previousSection)
      if (element) {
        manageFocus(element)
        return true
      }
    }
    return false
  }
  
  function storeFocus(element?: HTMLElement) {
    if (options.focusManagement) {
      globalFocusManager.storeFocus(element)
    }
  }
  
  function trapFocus(panelId: string, container: HTMLElement) {
    if (options.focusManagement) {
      globalFocusManager.trapFocus(panelId, container)
    }
  }
  
  function releaseFocusTrap(panelId: string) {
    if (options.focusManagement) {
      globalFocusManager.releaseFocusTrap(panelId)
    }
  }
  
  function focusFirstElement(container: HTMLElement) {
    if (options.focusManagement) {
      return globalFocusManager.focusFirstElement(container)
    }
    return false
  }
  
  // Keyboard event handler
  function handleKeydown(event: KeyboardEvent) {
    // Don't handle keyboard navigation if user is typing in an input
    const activeElement = document.activeElement
    if (activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.tagName === 'SELECT' ||
      activeElement.getAttribute('contenteditable') === 'true'
    )) {
      return
    }
    
    // Handle arrow keys for section navigation
    if (options.enableArrowKeys) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault()
          navigateUp()
          break
        case 'ArrowDown':
          event.preventDefault()
          navigateDown()
          break
        case 'ArrowLeft':
          event.preventDefault()
          navigateUp()
          break
        case 'ArrowRight':
          event.preventDefault()
          navigateDown()
          break
      }
    }
    
    // Handle Enter key for section selection
    if (event.key === 'Enter') {
      event.preventDefault()
      navigateToSection(currentSection.value)
    }
    
    // Handle Escape key for closing panels
    if (options.enableEscapeKey && event.key === 'Escape') {
      event.preventDefault()
      closeAllPanels()
    }
    
    // Handle number keys for direct navigation (1-7 for sections)
    if (event.key >= '1' && event.key <= '7') {
      const index = parseInt(event.key) - 1
      if (index < sections.value.length) {
        event.preventDefault()
        navigateToIndex(index)
      }
    }
    
    // Handle Home/End keys
    if (event.key === 'Home') {
      event.preventDefault()
      navigateToIndex(0)
    }
    
    if (event.key === 'End') {
      event.preventDefault()
      navigateToIndex(sections.value.length - 1)
    }
  }
  
  // Update current section based on scroll position
  function updateCurrentSection() {
    if (isNavigating.value) return
    
    const scrollPosition = window.scrollY + 100
    const sectionElements = sections.value.map(id => document.getElementById(id)).filter(Boolean)
    
    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const section = sectionElements[i]
      if (section && section.offsetTop <= scrollPosition) {
        const sectionId = section.id
        const index = sections.value.indexOf(sectionId)
        if (index !== -1 && index !== currentFocusIndex.value) {
          currentFocusIndex.value = index
        }
        break
      }
    }
  }
  
  // Lifecycle
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
    window.addEventListener('scroll', updateCurrentSection)
    
    // Initialize current section
    updateCurrentSection()
  })
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('scroll', updateCurrentSection)
  })
  
  return {
    // State
    currentFocusIndex: readonly(currentFocusIndex),
    isNavigating: readonly(isNavigating),
    focusHistory: readonly(focusHistory),
    currentSection,
    sections,
    
    // Navigation methods
    navigateToSection,
    navigateUp,
    navigateDown,
    navigateToIndex,
    
    // Panel management
    registerPanel,
    unregisterPanel,
    closeAllPanels,
    
    // Focus management
    manageFocus,
    restoreFocus,
    storeFocus,
    trapFocus,
    releaseFocusTrap,
    focusFirstElement,
    
    // Utility
    updateCurrentSection
  }
}