<script setup lang="ts">
import { computed } from 'vue'
import { useScrollProgress } from '~/composables/useScrollProgress'
import { useReducedMotion } from '~/composables/useReducedMotion'

interface ProgressIndicatorProps {
  position?: 'top' | 'side'
  showSectionProgress?: boolean
  showOverallProgress?: boolean
  sections?: string[]
}

const props = withDefaults(defineProps<ProgressIndicatorProps>(), {
  position: 'top',
  showSectionProgress: true,
  showOverallProgress: true,
  sections: () => ['hero', 'about', 'projects', 'experience', 'education', 'skills', 'contact']
})

// Use scroll progress composable
const { 
  scrollProgress, 
  currentSection, 
  sectionProgress, 
  isScrolling 
} = useScrollProgress({ 
  sections: props.sections 
})

// Use reduced motion composable
const { prefersReducedMotion, getTransitionDuration } = useReducedMotion()

// Get i18n for section labels
const { t } = useI18n()

// Section navigation items (matching NavigationSidebar)
const navItems = computed(() => [
  { id: 'hero', label: 'nav.home' },
  { id: 'about', label: 'nav.about' },
  { id: 'projects', label: 'nav.projects' },
  { id: 'experience', label: 'nav.experience' },
  { id: 'education', label: 'nav.education' },
  { id: 'skills', label: 'nav.skills' },
  { id: 'contact', label: 'nav.contact' },
])

// Filtered nav items based on provided sections
const filteredNavItems = computed(() => 
  navItems.value.filter(item => props.sections.includes(item.id))
)

// Computed transition classes based on motion preference
const progressTransitionClasses = computed(() => {
  if (prefersReducedMotion.value) {
    return 'transition-none'
  }
  return 'transition-all duration-300 ease-out'
})

const sectionTransitionClasses = computed(() => {
  if (prefersReducedMotion.value) {
    return 'transition-none'
  }
  return 'transition-all duration-500 ease-out'
})

const buttonTransitionClasses = computed(() => {
  if (prefersReducedMotion.value) {
    return 'focus:outline focus:outline-2 focus:outline-[var(--color-primary)]'
  }
  return 'transition-all duration-300'
})

const tooltipTransitionClasses = computed(() => {
  if (prefersReducedMotion.value) {
    return 'transition-none'
  }
  return 'transition-all duration-200'
})

const svgTransitionClasses = computed(() => {
  if (prefersReducedMotion.value) {
    return 'transition-none'
  }
  return 'transition-opacity duration-300'
})

const circleTransitionClasses = computed(() => {
  if (prefersReducedMotion.value) {
    return 'transition-none'
  }
  return 'transition-all duration-500 ease-out'
})

// Scroll to section function with reduced motion support
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const scrollBehavior = prefersReducedMotion.value ? 'auto' : 'smooth'
    element.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
  }
}
</script>

<template>
  <!-- Top Progress Bar -->
  <div v-if="position === 'top'" class="fixed top-0 left-0 right-0 z-40">
    <!-- Overall Progress Bar -->
    <div 
      v-if="showOverallProgress"
      :class="[
        'h-1 bg-[var(--color-border)]',
        progressTransitionClasses,
        { 'opacity-100': isScrolling, 'opacity-60': !isScrolling }
      ]"
      role="progressbar"
      :aria-label="$t('aria.progress.indicator')"
      :aria-valuenow="scrollProgress"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuetext="$t('aria.progress.scrollProgress', { percent: Math.round(scrollProgress) })"
    >
      <div 
        :class="['h-full bg-[var(--color-primary)]', progressTransitionClasses]"
        :style="{ width: `${scrollProgress}%` }"
        aria-hidden="true"
      />
    </div>
    
    <!-- Section Progress Indicators -->
    <div 
      v-if="showSectionProgress"
      class="flex h-1"
    >
      <div 
        v-for="item in filteredNavItems" 
        :key="item.id"
        class="flex-1 bg-[var(--color-border)]/30 relative overflow-hidden"
      >
        <div 
          :class="[
            'h-full',
            sectionTransitionClasses,
            currentSection === item.id 
              ? 'bg-[var(--color-primary)]' 
              : 'bg-[var(--color-primary)]/40'
          ]"
          :style="{ width: `${sectionProgress[item.id] || 0}%` }"
        />
        
        <!-- Section separator -->
        <div 
          v-if="item.id !== filteredNavItems[filteredNavItems.length - 1].id"
          class="absolute right-0 top-0 w-px h-full bg-[var(--color-background)]"
        />
      </div>
    </div>
  </div>

  <!-- Side Progress Indicator -->
  <div 
    v-else-if="position === 'side'" 
    class="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
  >
    <div class="flex flex-col gap-2">
      <!-- Section dots -->
      <button
        v-for="item in filteredNavItems"
        :key="item.id"
        @click="scrollToSection(item.id)"
        :class="[
          'group relative w-3 h-3 rounded-full',
          buttonTransitionClasses,
          currentSection === item.id
            ? prefersReducedMotion ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-primary)] scale-125'
            : 'bg-[var(--color-border)] hover:bg-[var(--color-primary)]/60'
        ]"
        :aria-label="$t('aria.navigation.navigateToSection', { section: t(item.label) })"
        :aria-current="currentSection === item.id ? 'page' : false"
        :title="t(item.label)"
        role="button"
      >
        <!-- Progress ring -->
        <svg 
          :class="[
            'absolute inset-0 w-full h-full -rotate-90',
            svgTransitionClasses,
            { 'opacity-100': currentSection === item.id, 'opacity-0': currentSection !== item.id }
          ]"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="var(--color-primary)"
            stroke-width="2"
            stroke-linecap="round"
            :stroke-dasharray="2 * Math.PI * 10"
            :stroke-dashoffset="2 * Math.PI * 10 * (1 - (sectionProgress[item.id] || 0) / 100)"
            :class="circleTransitionClasses"
          />
        </svg>
        
        <!-- Tooltip -->
        <div
          :class="[
            'absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 bg-[var(--color-text)] text-[var(--color-background)] text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none whitespace-nowrap',
            tooltipTransitionClasses
          ]"
        >
          {{ t(item.label) }}
          <div class="absolute left-full top-1/2 -translate-y-1/2 border-2 border-transparent border-l-[var(--color-text)]" />
        </div>
      </button>
    </div>
    
    <!-- Overall progress indicator -->
    <div 
      v-if="showOverallProgress"
      class="mt-4 w-1 h-20 bg-[var(--color-border)] rounded-full overflow-hidden"
    >
      <div 
        :class="['w-full bg-[var(--color-primary)] rounded-full', progressTransitionClasses]"
        :style="{ height: `${scrollProgress}%` }"
      />
    </div>
  </div>
</template>