<template>
  <Transition
    :enter-active-class="transitionClasses.enterActive"
    :enter-from-class="transitionClasses.enterFrom"
    :enter-to-class="transitionClasses.enterTo"
    :leave-active-class="transitionClasses.leaveActive"
    :leave-from-class="transitionClasses.leaveFrom"
    :leave-to-class="transitionClasses.leaveTo"
  >
    <button
      v-if="isVisible"
      @click="scrollToTop"
      @keydown.enter="scrollToTop"
      @keydown.space.prevent="scrollToTop"
      :disabled="isScrolling"
      :aria-label="$t('backToTop.label')"
      :aria-describedby="isScrolling ? 'back-to-top-status' : undefined"
      :title="$t('backToTop.tooltip')"
      role="button"
      :class="[
        buttonClasses,
        {
          'animate-pulse': isScrolling && !prefersReducedMotion,
          'hover:shadow-[var(--color-primary)]/30': !isScrolling,
          'opacity-75': isScrolling && prefersReducedMotion
        }
      ]"
    >
      <ChevronUp 
        :class="[
          iconClasses,
          { 
            'animate-bounce': isScrolling && !prefersReducedMotion,
            'opacity-75': isScrolling && prefersReducedMotion
          }
        ]"
      />
      
      <!-- Tooltip for desktop -->
      <div
        class="absolute bottom-16 right-0 px-3 py-2 bg-[var(--color-text)] text-[var(--color-background)] text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-10 hidden lg:block"
      >
        {{ $t('backToTop.tooltip') }}
        <div
          class="absolute top-full right-4 border-4 border-transparent border-t-[var(--color-text)]"
        ></div>
      </div>
      
      <!-- Screen reader status -->
      <span 
        v-if="isScrolling" 
        id="back-to-top-status" 
        class="sr-only"
        aria-live="polite"
      >
        {{ $t('aria.status.loading') }}
      </span>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ChevronUp } from 'lucide-vue-next'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { useScreenReader } from '~/composables/useScreenReader'

interface Props {
  threshold?: number
  smooth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 300,
  smooth: true
})

const isVisible = ref(false)
const isScrolling = ref(false)

// Use reduced motion composable
const { prefersReducedMotion, shouldDisableAnimation, getTransitionDuration } = useReducedMotion()

// Initialize screen reader support
const { announceStatus } = useScreenReader({
  enableStatusAnnouncements: true
})

// Computed transition classes based on motion preference
const transitionClasses = computed(() => {
  if (prefersReducedMotion.value) {
    return {
      enterActive: 'transition-opacity duration-75',
      enterFrom: 'opacity-0',
      enterTo: 'opacity-100',
      leaveActive: 'transition-opacity duration-75',
      leaveFrom: 'opacity-100',
      leaveTo: 'opacity-0'
    }
  }
  
  return {
    enterActive: 'transition-all duration-300 ease-out',
    enterFrom: 'opacity-0 scale-90 translate-y-4',
    enterTo: 'opacity-100 scale-100 translate-y-0',
    leaveActive: 'transition-all duration-200 ease-in',
    leaveFrom: 'opacity-100 scale-100 translate-y-0',
    leaveTo: 'opacity-0 scale-90 translate-y-4'
  }
})

// Computed button classes based on motion preference
const buttonClasses = computed(() => {
  const baseClasses = 'group fixed bottom-6 right-6 z-40 w-12 h-12 bg-[var(--color-primary)] text-[var(--color-background)] rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)] disabled:opacity-50 disabled:cursor-not-allowed'
  
  if (prefersReducedMotion.value) {
    return `${baseClasses} hover:shadow-xl focus:shadow-xl`
  }
  
  return `${baseClasses} hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95`
})

// Computed icon classes based on motion preference
const iconClasses = computed(() => {
  const baseClasses = 'w-6 h-6'
  
  if (prefersReducedMotion.value) {
    return baseClasses
  }
  
  return `${baseClasses} transition-transform duration-200 group-hover:-translate-y-0.5`
})

// Handle scroll events to show/hide button
function handleScroll() {
  if (process.client) {
    isVisible.value = window.scrollY > props.threshold
  }
}

// Smooth scroll to top function with reduced motion support
async function scrollToTop() {
  if (process.client && !isScrolling.value) {
    isScrolling.value = true
    
    // Announce the action to screen readers
    announceStatus('Scrolling to top of page', 'polite')
    
    try {
      // Use instant scroll if reduced motion is preferred or smooth is disabled
      const shouldUseInstantScroll = prefersReducedMotion.value || !props.smooth
      
      if (shouldUseInstantScroll) {
        // Instant scroll for reduced motion users
        window.scrollTo(0, 0)
        // Announce completion immediately for instant scroll
        announceStatus('Reached top of page', 'polite')
      } else {
        // Use smooth scrolling for users who prefer motion
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        
        // Wait for scroll to complete
        await new Promise<void>((resolve) => {
          const checkScroll = () => {
            if (window.scrollY <= 10) {
              resolve()
            } else {
              requestAnimationFrame(checkScroll)
            }
          }
          checkScroll()
        })
        
        // Announce completion for smooth scroll
        announceStatus('Reached top of page', 'polite')
      }
    } catch (error) {
      console.warn('Scroll to top failed:', error)
      announceStatus('Error scrolling to top', 'assertive')
    } finally {
      isScrolling.value = false
    }
  }
}

// Throttle scroll events for better performance
let scrollTimeout: NodeJS.Timeout | null = null

function throttledHandleScroll() {
  if (scrollTimeout) return
  
  scrollTimeout = setTimeout(() => {
    handleScroll()
    scrollTimeout = null
  }, 100)
}

// Keyboard navigation support
function handleKeydown(event: KeyboardEvent) {
  // Handle Escape key to hide button focus
  if (event.key === 'Escape' && isVisible.value) {
    const button = document.querySelector('[aria-label="' + 'Back to top' + '"]') as HTMLElement
    if (button && document.activeElement === button) {
      button.blur()
    }
  }
}

onMounted(() => {
  if (process.client) {
    // Initial check
    handleScroll()
    
    // Add event listeners
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', throttledHandleScroll)
    document.removeEventListener('keydown', handleKeydown)
    
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
  }
})
</script>