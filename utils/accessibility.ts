/**
 * Focus management utilities for accessibility
 */

export interface FocusableElement extends HTMLElement {
  focus(): void
}

/**
 * Enhanced focus management options
 */
export interface FocusManagementOptions {
  preventScroll?: boolean
  restoreOnEscape?: boolean
  trapOnOpen?: boolean
  announceChanges?: boolean
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): FocusableElement[] {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ')

  return Array.from(container.querySelectorAll(focusableSelectors)) as FocusableElement[]
}

/**
 * Create a focus trap for modal-like components
 */
export function createFocusTrap(container: HTMLElement) {
  const focusableElements = getFocusableElements(container)
  
  if (focusableElements.length === 0) {
    return {
      activate: () => {},
      deactivate: () => {},
      destroy: () => {}
    }
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  
  let isActive = false
  let previouslyFocusedElement: HTMLElement | null = null

  function handleKeyDown(event: KeyboardEvent) {
    if (!isActive || event.key !== 'Tab') return

    // If only one focusable element, prevent tabbing
    if (focusableElements.length === 1) {
      event.preventDefault()
      return
    }

    // Handle Shift+Tab (backward)
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      // Handle Tab (forward)
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }

  function activate() {
    if (isActive) return

    // Store the currently focused element
    previouslyFocusedElement = document.activeElement as HTMLElement
    
    // Add event listener
    document.addEventListener('keydown', handleKeyDown)
    
    // Focus the first element
    firstElement.focus()
    
    isActive = true
  }

  function deactivate() {
    if (!isActive) return

    // Remove event listener
    document.removeEventListener('keydown', handleKeyDown)
    
    // Restore focus to previously focused element
    if (previouslyFocusedElement && previouslyFocusedElement.focus) {
      previouslyFocusedElement.focus()
    }
    
    isActive = false
  }

  function destroy() {
    deactivate()
  }

  return {
    activate,
    deactivate,
    destroy
  }
}

/**
 * Focus management for panels and modals
 */
export class FocusManager {
  private focusHistory: HTMLElement[] = []
  private activeFocusTraps = new Map<string, ReturnType<typeof createFocusTrap>>()
  private options: FocusManagementOptions = {
    preventScroll: false,
    restoreOnEscape: true,
    trapOnOpen: true,
    announceChanges: false
  }

  /**
   * Store the currently focused element
   */
  storeFocus(element?: HTMLElement) {
    const currentFocus = element || (document.activeElement as HTMLElement)
    if (currentFocus && currentFocus !== document.body) {
      this.focusHistory.push(currentFocus)
      // Keep history limited to last 10 items
      if (this.focusHistory.length > 10) {
        this.focusHistory = this.focusHistory.slice(-10)
      }
    }
  }

  /**
   * Restore focus to the previously focused element
   */
  restoreFocus(): boolean {
    const previousElement = this.focusHistory.pop()
    if (previousElement && previousElement.focus && document.contains(previousElement)) {
      try {
        previousElement.focus()
        return true
      } catch (error) {
        console.warn('Failed to restore focus:', error)
      }
    }
    return false
  }

  /**
   * Create and activate a focus trap for a panel
   */
  trapFocus(panelId: string, container: HTMLElement) {
    // Store current focus before trapping
    this.storeFocus()

    // Deactivate any existing trap for this panel
    this.releaseFocusTrap(panelId)

    // Create new focus trap
    const focusTrap = createFocusTrap(container)
    this.activeFocusTraps.set(panelId, focusTrap)
    
    // Activate the trap
    focusTrap.activate()
  }

  /**
   * Release focus trap for a panel
   */
  releaseFocusTrap(panelId: string) {
    const focusTrap = this.activeFocusTraps.get(panelId)
    if (focusTrap) {
      focusTrap.deactivate()
      this.activeFocusTraps.delete(panelId)
    }
  }

  /**
   * Release all active focus traps
   */
  releaseAllFocusTraps() {
    this.activeFocusTraps.forEach((trap) => trap.deactivate())
    this.activeFocusTraps.clear()
  }

  /**
   * Focus an element with error handling
   */
  focusElement(element: HTMLElement, options?: FocusOptions): boolean {
    if (!element || !element.focus) return false

    try {
      element.focus(options)
      return true
    } catch (error) {
      console.warn('Failed to focus element:', error)
      return false
    }
  }

  /**
   * Focus the first focusable element in a container
   */
  focusFirstElement(container: HTMLElement): boolean {
    const focusableElements = getFocusableElements(container)
    if (focusableElements.length > 0) {
      return this.focusElement(focusableElements[0])
    }
    return false
  }

  /**
   * Set focus management options
   */
  setOptions(options: Partial<FocusManagementOptions>) {
    this.options = { ...this.options, ...options }
  }

  /**
   * Focus the last focusable element in a container
   */
  focusLastElement(container: HTMLElement): boolean {
    const focusableElements = getFocusableElements(container)
    if (focusableElements.length > 0) {
      return this.focusElement(focusableElements[focusableElements.length - 1])
    }
    return false
  }

  /**
   * Check if an element is currently focused
   */
  isElementFocused(element: HTMLElement): boolean {
    return document.activeElement === element
  }

  /**
   * Get the currently focused element
   */
  getCurrentFocus(): HTMLElement | null {
    return document.activeElement as HTMLElement
  }

  /**
   * Move focus to next focusable element within container
   */
  focusNext(container: HTMLElement): boolean {
    const focusableElements = getFocusableElements(container)
    const currentIndex = focusableElements.indexOf(document.activeElement as FocusableElement)
    
    if (currentIndex >= 0 && currentIndex < focusableElements.length - 1) {
      return this.focusElement(focusableElements[currentIndex + 1])
    } else if (focusableElements.length > 0) {
      // Wrap to first element
      return this.focusElement(focusableElements[0])
    }
    return false
  }

  /**
   * Move focus to previous focusable element within container
   */
  focusPrevious(container: HTMLElement): boolean {
    const focusableElements = getFocusableElements(container)
    const currentIndex = focusableElements.indexOf(document.activeElement as FocusableElement)
    
    if (currentIndex > 0) {
      return this.focusElement(focusableElements[currentIndex - 1])
    } else if (focusableElements.length > 0) {
      // Wrap to last element
      return this.focusElement(focusableElements[focusableElements.length - 1])
    }
    return false
  }

  /**
   * Announce changes to screen readers
   */
  announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.options.announceChanges) return

    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  /**
   * Clean up all focus management
   */
  destroy() {
    this.releaseAllFocusTraps()
    this.focusHistory = []
  }
}

/**
 * Global focus manager instance
 */
export const globalFocusManager = new FocusManager()

/**
 * ARIA utilities for enhanced screen reader support
 */

// Create live region for dynamic announcements
export function createLiveRegion(id: string, priority: 'polite' | 'assertive' = 'polite'): HTMLElement {
  let liveRegion = document.getElementById(id)
  
  if (!liveRegion) {
    liveRegion = document.createElement('div')
    liveRegion.id = id
    liveRegion.setAttribute('aria-live', priority)
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    document.body.appendChild(liveRegion)
  }
  
  return liveRegion
}

// Announce message using existing live region
export function announceLive(message: string, regionId: string = 'default-live-region') {
  const liveRegion = createLiveRegion(regionId)
  liveRegion.textContent = message
  
  // Clear the message after announcement
  setTimeout(() => {
    liveRegion.textContent = ''
  }, 1000)
}

// Generate unique IDs for ARIA relationships
export function generateId(prefix: string = 'aria'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

// Enhanced ARIA label utilities
export function setAriaLabel(element: HTMLElement, label: string) {
  element.setAttribute('aria-label', label)
}

export function setAriaLabelledBy(element: HTMLElement, labelId: string) {
  element.setAttribute('aria-labelledby', labelId)
}

export function setAriaDescribedBy(element: HTMLElement, descriptionId: string) {
  element.setAttribute('aria-describedby', descriptionId)
}

export function setAriaExpanded(element: HTMLElement, expanded: boolean) {
  element.setAttribute('aria-expanded', expanded.toString())
}

export function setAriaSelected(element: HTMLElement, selected: boolean) {
  element.setAttribute('aria-selected', selected.toString())
}

export function setAriaCurrent(element: HTMLElement, current: string | boolean) {
  if (typeof current === 'boolean') {
    element.setAttribute('aria-current', current ? 'true' : 'false')
  } else {
    element.setAttribute('aria-current', current)
  }
}

export function setAriaHidden(element: HTMLElement, hidden: boolean) {
  element.setAttribute('aria-hidden', hidden.toString())
}

export function setRole(element: HTMLElement, role: string) {
  element.setAttribute('role', role)
}

// Screen reader only text utility
export function createScreenReaderText(text: string): HTMLElement {
  const srText = document.createElement('span')
  srText.className = 'sr-only'
  srText.textContent = text
  return srText
}

// Keyboard navigation helpers
export function isElementVisible(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element)
  return style.display !== 'none' && 
         style.visibility !== 'hidden' && 
         style.opacity !== '0' &&
         element.offsetWidth > 0 && 
         element.offsetHeight > 0
}

export function getVisibleFocusableElements(container: HTMLElement): FocusableElement[] {
  const focusableElements = getFocusableElements(container)
  return focusableElements.filter(element => isElementVisible(element))
}

/**
 * Theme and language change announcements
 */
export function announceThemeChange(themeName: string, themeLabel: string) {
  const message = `Theme changed to ${themeLabel}`
  announceLive(message, 'theme-announcements')
}

export function announceLanguageChange(languageCode: string, languageName: string) {
  const message = `Language changed to ${languageName}`
  announceLive(message, 'language-announcements')
}

export function announceNavigationChange(sectionName: string) {
  const message = `Navigated to ${sectionName} section`
  announceLive(message, 'navigation-announcements')
}

export function announceStatusChange(status: string, context?: string) {
  const message = context ? `${context}: ${status}` : status
  announceLive(message, 'status-announcements')
}

export function announceSystemThemeChange(systemTheme: 'light' | 'dark') {
  const message = `System theme changed to ${systemTheme} mode`
  announceLive(message, 'theme-announcements')
}