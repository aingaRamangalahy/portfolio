<script setup lang="ts">
import { Home, User, Briefcase, GraduationCap, Folder, Code, Mail, Palette, Globe, Menu, X } from 'lucide-vue-next'
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
// useI18n is auto-imported by Nuxt
import { useTheme } from '~/composables/useTheme'
import { useKeyboardNavigation } from '~/composables/useKeyboardNavigation'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { announceThemeChange, announceLanguageChange, announceNavigationChange, announceLive } from '~/utils/accessibility'
import { useScreenReader } from '~/composables/useScreenReader'

const { t, locale, setLocale } = useI18n()
const {
  currentTheme,
  baseThemes,
  setBaseTheme,
  toggleDarkMode,
  isDarkMode,
  autoDetectionEnabled,
  setAutoDetection
} = useTheme()

// Initialize reduced motion support
const { prefersReducedMotion, shouldDisableAnimation } = useReducedMotion()

// Initialize keyboard navigation
const {
  currentSection,
  navigateToSection,
  registerPanel,
  unregisterPanel,
  closeAllPanels
} = useKeyboardNavigation({
  sections: ['hero', 'about', 'projects', 'experience', 'education', 'skills', 'contact'],
  enableArrowKeys: true,
  enableEscapeKey: true,
  focusManagement: true
})

// Initialize screen reader support
const {
  announceTheme,
  announceLanguage,
  announceNavigation,
  announceStatus,
  announce
} = useScreenReader({
  enableThemeAnnouncements: true,
  enableLanguageAnnouncements: true,
  enableNavigationAnnouncements: true,
  enableStatusAnnouncements: true
})

const activeSection = ref('hero')
const showThemePanel = ref(false)
const showLanguagePanel = ref(false)
const showMobileMenu = ref(false)
const showMobileThemePanel = ref(false)
const showMobileLanguagePanel = ref(false)

// Touch gesture handling
let touchStartY = 0
let touchStartX = 0

function handleTouchStart(event: TouchEvent) {
  touchStartY = event.touches[0].clientY
  touchStartX = event.touches[0].clientX
}

function handleTouchEnd(event: TouchEvent) {
  if (!touchStartY || !touchStartX) return

  const touchEndY = event.changedTouches[0].clientY
  const touchEndX = event.changedTouches[0].clientX
  const diffY = touchStartY - touchEndY
  const diffX = touchStartX - touchEndX

  // Swipe up to close mobile menu
  if (Math.abs(diffY) > Math.abs(diffX) && diffY > 50 && showMobileMenu.value) {
    showMobileMenu.value = false
  }

  // Swipe left to close panels
  if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
    if (showMobileThemePanel.value) {
      showMobileThemePanel.value = false
    }
    if (showMobileLanguagePanel.value) {
      showMobileLanguagePanel.value = false
    }
  }

  touchStartY = 0
  touchStartX = 0
}

const navItems = [
  { id: 'hero', href: '#hero', icon: Home, label: 'nav.home' },
  { id: 'about', href: '#about', icon: User, label: 'nav.about' },
  { id: 'projects', href: '#projects', icon: Folder, label: 'nav.projects' },
  { id: 'experience', href: '#experience', icon: Briefcase, label: 'nav.experience' },
  { id: 'education', href: '#education', icon: GraduationCap, label: 'nav.education' },
  { id: 'skills', href: '#skills', icon: Code, label: 'nav.skills' },
  { id: 'contact', href: '#contact', icon: Mail, label: 'nav.contact' },
]

const languages = computed(() => [
  { code: 'en', name: t('languages.en'), flag: '🇺🇸' },
  { code: 'fr', name: t('languages.fr'), flag: '🇫🇷' }
])

// Social links removed as requested

function handleScroll() {
  const sections = navItems.map((item) => document.getElementById(item.id))
  const scrollPosition = window.scrollY + 100

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = navItems[i].id
      break
    }
  }
}

function selectTheme(themeName: any) {
  const theme = baseThemes.value[themeName]
  setBaseTheme(themeName)
  showThemePanel.value = false
  showMobileThemePanel.value = false

  // Announce theme change to screen readers using enhanced composable
  announceTheme(themeName, theme.label)
}

async function changeLanguage(lang: string) {
  const languageName = languages.value.find(l => l.code === lang)?.name || lang

  // Use setLocale to properly handle lazy loading
  await setLocale(lang)
  showLanguagePanel.value = false
  showMobileLanguagePanel.value = false

  // Announce language change to screen readers using enhanced composable
  announceLanguage(lang, languageName)
}

function selectMobileTheme(themeName: any) {
  const theme = baseThemes.value[themeName]
  setBaseTheme(themeName)
  showMobileThemePanel.value = false

  // Announce theme change to screen readers using enhanced composable
  announceTheme(themeName, theme.label)
}

async function changeMobileLanguage(lang: string) {
  const languageName = languages.value.find(l => l.code === lang)?.name || lang

  await setLocale(lang)
  showMobileLanguagePanel.value = false

  // Announce language change to screen readers using enhanced composable
  announceLanguage(lang, languageName)
}

function toggleMobileThemePanel() {
  if (showMobileLanguagePanel.value) {
    showMobileLanguagePanel.value = false
  }
  showMobileThemePanel.value = !showMobileThemePanel.value
}

function toggleMobileLanguagePanel() {
  if (showMobileThemePanel.value) {
    showMobileThemePanel.value = false
  }
  showMobileLanguagePanel.value = !showMobileLanguagePanel.value
}

function toggleThemePanel() {
  if (showLanguagePanel.value) {
    showLanguagePanel.value = false
  }
  showThemePanel.value = !showThemePanel.value
}

function toggleLanguagePanel() {
  if (showThemePanel.value) {
    showThemePanel.value = false
  }
  showLanguagePanel.value = !showLanguagePanel.value
}

// openLink function removed as social links are no longer needed

function scrollToSection(href: string) {
  const sectionId = href.replace('#', '')
  navigateToSection(sectionId)
  showMobileMenu.value = false

  // Announce navigation change to screen readers
  const sectionName = navItems.find(item => item.id === sectionId)?.label
  if (sectionName) {
    announceNavigation(t(sectionName))
  }
}

function closePanels() {
  showThemePanel.value = false
  showLanguagePanel.value = false
  showMobileThemePanel.value = false
  showMobileLanguagePanel.value = false
}

// Handle keyboard navigation panel closing
function handleKeyboardPanelClose() {
  closePanels()
}

// Register/unregister panels for keyboard navigation with focus management
function handlePanelToggle(panelName: string, isOpen: boolean, containerId?: string) {
  if (isOpen) {
    // Get the panel container element for focus trapping
    const container = containerId ? document.getElementById(containerId) : null
    if (container) {
      registerPanel(panelName, container)
    } else {
      registerPanel(panelName)
    }
  } else {
    unregisterPanel(panelName)
  }
}

// Watch panel states and register/unregister them with focus management
watch(showThemePanel, (isOpen) => {
  nextTick(() => {
    handlePanelToggle('theme', isOpen, 'desktop-theme-panel')
  })
})
watch(showLanguagePanel, (isOpen) => {
  nextTick(() => {
    handlePanelToggle('language', isOpen, 'desktop-language-panel')
  })
})
watch(showMobileThemePanel, (isOpen) => {
  nextTick(() => {
    handlePanelToggle('mobile-theme', isOpen, 'mobile-theme-panel')
  })
})
watch(showMobileLanguagePanel, (isOpen) => {
  nextTick(() => {
    handlePanelToggle('mobile-language', isOpen, 'mobile-language-panel')
  })
})
watch(showMobileMenu, (isOpen) => {
  nextTick(() => {
    handlePanelToggle('mobile-menu', isOpen, 'mobile-menu-container')
  })
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', closePanels)
  document.addEventListener('keyboard-navigation:close-panels', handleKeyboardPanelClose)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closePanels)
  document.removeEventListener('keyboard-navigation:close-panels', handleKeyboardPanelClose)
})
</script>

<template>
  <!-- Desktop Navigation -->
  <nav class="fixed left-0 top-0 h-screen z-50 hidden lg:block" :aria-label="t('aria.navigation.main')"
    role="navigation">
    <div
      class="flex flex-col h-full p-2 bg-[var(--color-background)]/80 border-0 backdrop-blur-xl shadow-2xl rounded-r-2xl"
      style="overflow: visible;">
      <div class="flex flex-col gap-1" role="list" :aria-label="t('aria.navigation.sections')">
        <!-- Navigation Items -->
        <template v-for="item in navItems" :key="item.id">
          <button @click="scrollToSection(item.href)"
            @mouseenter="announceStatus(t('aria.navigation.hovering', { section: t(item.label) }), 'polite')"
            :aria-label="t('aria.navigation.navigateToSection', { section: t(item.label) })"
            :aria-current="activeSection === item.id ? 'page' : false" :aria-describedby="`tooltip-${item.id}`"
            role="listitem" :class="[
              'nav-button-focus focus-ring group relative w-12 h-12 p-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-xl flex items-center justify-center',
              'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-[var(--color-primary)] before:to-[var(--color-accent)] before:opacity-0 before:scale-90 before:transition-all before:duration-500 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
              'after:absolute after:inset-0 after:rounded-xl after:bg-[var(--color-primary)] after:opacity-0 after:scale-95 after:blur-sm after:transition-all after:duration-300 after:ease-out',
              'hover:before:opacity-8 hover:before:scale-100 hover:after:opacity-5 hover:after:scale-105',
              'hover:shadow-lg hover:shadow-[var(--color-primary)]/25 hover:-translate-y-0.5',
              activeSection === item.id
                ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow-xl shadow-[var(--color-primary)]/40 scale-105 translate-y-0'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]/80 hover:scale-110'
            ]">
            <component :is="item.icon"
              class="w-5 h-5 relative z-10 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-125 group-hover:rotate-3" />

            <!-- Enhanced Tooltip with better visibility -->
            <div :id="`tooltip-${item.id}`"
              class="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text)] text-[var(--color-background)] text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out pointer-events-none whitespace-nowrap shadow-lg transform group-hover:translate-x-1"
              style="z-index: 9999;" role="tooltip" :aria-hidden="true">
              {{ t(item.label) }}
              <div
                class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--color-text)]">
              </div>
            </div>
          </button>
        </template>
      </div>

      <div class="mt-auto flex flex-col gap-1">
        <!-- Theme Switcher -->
        <div class="relative theme-panel-container">
          <button @click.stop="toggleThemePanel" :aria-label="t('aria.theme.switcher')" :aria-expanded="showThemePanel"
            :aria-describedby="showThemePanel ? 'theme-panel-title' : undefined" :class="[
              'nav-button-focus nav-button-stable focus-ring group relative w-12 h-12 p-0 transition-all duration-300 ease-out rounded-xl flex items-center justify-center',
              'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-[var(--color-primary)] before:to-[var(--color-accent)] before:opacity-0 before:scale-90 before:transition-all before:duration-300 before:ease-out',
              'after:absolute after:inset-0 after:rounded-xl after:bg-[var(--color-primary)] after:opacity-0 after:scale-95 after:blur-sm after:transition-all after:duration-200 after:ease-out',
              'hover:before:opacity-8 hover:before:scale-100 hover:after:opacity-5 hover:after:scale-105',
              'hover:shadow-lg hover:shadow-[var(--color-primary)]/25',
              showThemePanel
                ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow-xl shadow-[var(--color-primary)]/40 active'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]/80'
            ]">
            <Palette
              class="w-5 h-5 relative z-10 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-125 group-hover:rotate-12" />

            <!-- Enhanced Tooltip with better visibility -->
            <div
              class="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text)] text-[var(--color-background)] text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out pointer-events-none whitespace-nowrap shadow-lg transform group-hover:translate-x-1"
              style="z-index: 9999;" role="tooltip" :aria-hidden="true">
              {{ t('nav.themeSwitcherTooltip') }}
              <div
                class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--color-text)]">
              </div>
            </div>
          </button>

          <!-- Theme Panel -->
          <div v-if="showThemePanel" @click.stop id="desktop-theme-panel"
            class="theme-panel-fixed focus-trap-container modal-focus-trap w-80 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl shadow-2xl backdrop-blur-xl"
            role="dialog" aria-labelledby="theme-panel-title" aria-modal="false">
            <h3 id="theme-panel-title" class="text-lg font-semibold text-[var(--color-text)] mb-4">{{
              t('nav.chooseTheme') }}
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <template v-for="(theme, name) in baseThemes" :key="name">
                <button @click="selectTheme(name)" :class="[
                  'panel-focus-element group p-4 rounded-xl border-2 transition-all duration-200 ease-out text-left transform hover:scale-[1.02]',
                  'hover:shadow-lg hover:shadow-[var(--color-primary)]/10',
                  currentTheme.name.replace('-dark', '') === name
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md shadow-[var(--color-primary)]/20'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface)]'
                ]">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="text-xl transition-transform duration-200 ease-out group-hover:scale-110">{{ theme.icon
                    }}</div>
                    <div>
                      <div class="text-sm font-semibold text-[var(--color-text)]">{{ theme.label }}</div>
                      <div v-if="isDarkMode && currentTheme.name.replace('-dark', '') === name"
                        class="text-xs text-[var(--color-text-secondary)]">Dark Mode</div>
                    </div>
                  </div>
                  <div class="w-full h-6 rounded-lg transition-all duration-200 ease-out group-hover:shadow-sm"
                    :style="{ background: isDarkMode && theme.darkPreview ? theme.darkPreview : theme.preview }"></div>
                </button>
              </template>
            </div>

            <!-- Dark Mode Toggle -->
            <div class="mt-4 pt-4 border-t border-[var(--color-border)]">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium text-[var(--color-text)]">{{ t('nav.darkMode') }}</span>
                  <span class="text-xs text-[var(--color-text-secondary)]">{{ isDarkMode ? 'On' : 'Off' }}</span>
                </div>
                <button @click="toggleDarkMode"
                  :aria-label="isDarkMode ? t('aria.theme.disableDarkMode') : t('aria.theme.enableDarkMode')" :class="[
                    'panel-focus-element relative w-12 h-6 rounded-full transition-all duration-200 ease-out',
                    isDarkMode
                      ? 'bg-[var(--color-primary)]'
                      : 'bg-[var(--color-border)]'
                  ]">
                  <div :class="[
                    'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200 ease-out',
                    isDarkMode ? 'left-6' : 'left-0.5'
                  ]"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Language Switcher -->
        <div class="relative">
          <button @click.stop="toggleLanguagePanel" :aria-label="t('aria.language.switcher')"
            :aria-expanded="showLanguagePanel"
            :aria-describedby="showLanguagePanel ? 'language-panel-title' : undefined" :class="[
              'nav-button-focus nav-button-stable focus-ring group relative w-12 h-12 p-0 transition-all duration-300 ease-out rounded-xl flex items-center justify-center',
              'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-[var(--color-primary)] before:to-[var(--color-accent)] before:opacity-0 before:scale-90 before:transition-all before:duration-300 before:ease-out',
              'after:absolute after:inset-0 after:rounded-xl after:bg-[var(--color-primary)] after:opacity-0 after:scale-95 after:blur-sm after:transition-all after:duration-200 after:ease-out',
              'hover:before:opacity-8 hover:before:scale-100 hover:after:opacity-5 hover:after:scale-105',
              'hover:shadow-lg hover:shadow-[var(--color-primary)]/25',
              showLanguagePanel
                ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow-xl shadow-[var(--color-primary)]/40 active'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]/80'
            ]">
            <Globe
              class="w-5 h-5 relative z-10 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-125 group-hover:rotate-6" />

            <!-- Enhanced Tooltip with better visibility -->
            <div
              class="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text)] text-[var(--color-background)] text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out pointer-events-none whitespace-nowrap shadow-lg transform group-hover:translate-x-1"
              style="z-index: 9999;" role="tooltip" :aria-hidden="true">
              {{ t('nav.languageSwitcherTooltip') }}
              <div
                class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--color-text)]">
              </div>
            </div>
          </button>

          <!-- Language Panel -->
          <div v-if="showLanguagePanel" @click.stop id="desktop-language-panel"
            class="language-panel-fixed focus-trap-container modal-focus-trap w-64 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl shadow-2xl backdrop-blur-xl"
            role="dialog" aria-labelledby="language-panel-title" aria-modal="false">
            <h3 id="language-panel-title" class="text-lg font-semibold text-[var(--color-text)] mb-4">{{
              t('nav.language') }}
            </h3>
            <div class="space-y-2">
              <template v-for="lang in languages" :key="lang.code">
                <button @click="changeLanguage(lang.code)" :class="[
                  'panel-focus-element w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.02]',
                  'hover:shadow-md hover:shadow-[var(--color-primary)]/10',
                  locale === lang.code
                    ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow-md shadow-[var(--color-primary)]/20'
                    : 'hover:bg-[var(--color-surface)] text-[var(--color-text)] hover:text-[var(--color-primary)]'
                ]">
                  <span class="text-xl transition-transform duration-300 ease-out hover:scale-110">{{ lang.flag
                  }}</span>
                  <span class="text-sm font-medium">{{ lang.name }}</span>
                </button>
              </template>
            </div>
          </div>
        </div>

        <!-- Social Links removed as requested -->
      </div>
    </div>
  </nav>

  <!-- Mobile Navigation -->
  <nav class="lg:hidden">
    <!-- Mobile Header -->
    <div
      class="fixed top-0 left-0 right-0 z-50 p-4 bg-[var(--color-background)]/80 backdrop-blur-xl border-b border-[var(--color-border)]/50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
            <span class="text-[var(--color-background)] font-bold text-lg">{{ t('nav.name').charAt(0) }}</span>
          </div>
          <span class="text-lg font-bold text-[var(--color-text)]">{{ t('nav.name') }}</span>
        </div>

        <button @click="showMobileMenu = !showMobileMenu" :aria-label="t('aria.mobile.menuButton')"
          :aria-expanded="showMobileMenu" :aria-controls="showMobileMenu ? 'mobile-menu-container' : undefined" :class="[
            'touch-button mobile-ripple group relative w-12 h-12 p-0 rounded-xl flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] transform hover:scale-110 active:scale-95 overflow-hidden',
            'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-[var(--color-primary)] before:to-[var(--color-accent)] before:opacity-0 before:scale-90 before:transition-all before:duration-400 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
            'text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]/80',
            'hover:before:opacity-8 hover:before:scale-100 hover:shadow-lg hover:shadow-[var(--color-primary)]/25',
            showMobileMenu ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : ''
          ]">
          <Menu v-if="!showMobileMenu"
            class="nav-icon-menu w-6 h-6 relative z-10 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" />
          <X v-else
            class="nav-icon-close w-6 h-6 relative z-10 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="showMobileMenu" @touchstart="handleTouchStart" @touchend="handleTouchEnd" :class="[
      'fixed inset-0 z-40 bg-[var(--color-background)]/95 backdrop-blur-xl pt-20',
      showMobileMenu ? 'mobile-menu-enter' : 'mobile-menu-exit'
    ]">
      <div id="mobile-menu-container" class="mobile-menu-container p-6 space-y-6">
        <!-- Navigation Items -->
        <div class="space-y-2">
          <template v-for="item in navItems" :key="item.id">
            <button @click="scrollToSection(item.href)" :class="[
              'mobile-nav-item mobile-ripple touch-button group w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] text-left relative overflow-hidden',
              'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-[var(--color-primary)]/5 before:to-[var(--color-accent)]/5 before:opacity-0 before:transition-all before:duration-400 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
              'hover:before:opacity-100 hover:shadow-lg hover:shadow-[var(--color-primary)]/15',
              activeSection === item.id
                ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow-xl shadow-[var(--color-primary)]/30'
                : 'text-[var(--color-text)] hover:bg-[var(--color-surface)]/80 hover:text-[var(--color-primary)]'
            ]">
              <component :is="item.icon"
                class="w-6 h-6 relative z-10 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                :class="activeSection === item.id ? '' : 'group-hover:scale-110 group-hover:rotate-3'" />
              <span class="text-lg font-semibold relative z-10">{{ t(item.label) }}</span>
            </button>
          </template>
        </div>

        <!-- Interactive Controls -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Interactive Theme Control -->
          <div class="relative">
            <button @click.stop="toggleMobileThemePanel" :class="[
              'group w-full p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-left transform hover:scale-[1.02] active:scale-[0.98] touch-manipulation',
              'hover:shadow-lg hover:shadow-[var(--color-primary)]/15 hover:border-[var(--color-primary)]/30',
              'active:bg-[var(--color-primary)]/5',
              showMobileThemePanel
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md shadow-[var(--color-primary)]/20'
                : 'hover:bg-[var(--color-surface)]/80'
            ]">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <Palette :class="[
                    'w-5 h-5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
                    showMobileThemePanel ? 'text-[var(--color-primary)] scale-110 rotate-12' : 'text-[var(--color-primary)] group-hover:scale-110 group-hover:rotate-6'
                  ]" />
                  <span class="text-sm font-semibold text-[var(--color-text)]">{{ t('nav.chooseTheme') }}</span>
                </div>
                <div :class="[
                  'w-4 h-4 border-2 border-[var(--color-text-secondary)] border-t-transparent rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
                  showMobileThemePanel ? 'rotate-180' : 'group-hover:rotate-90'
                ]"></div>
              </div>
              <div class="text-xs text-[var(--color-text-secondary)] flex items-center gap-2">
                <span>{{ currentTheme.label }}</span>
                <span class="text-sm">{{ currentTheme.icon }}</span>
              </div>
            </button>

            <!-- Mobile Theme Panel -->
            <div v-if="showMobileThemePanel" @click.stop id="mobile-theme-panel" :class="[
              'focus-trap-container modal-focus-trap mobile-theme-panel absolute top-full left-0 right-0 mt-2 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl shadow-2xl z-50',
              'mobile-panel-enter'
            ]" role="dialog" aria-labelledby="mobile-theme-panel-title" aria-modal="false">
              <h3 id="mobile-theme-panel-title" class="sr-only">{{ t('nav.chooseTheme') }}</h3>
              <div class="grid grid-cols-1 gap-2">
                <template v-for="(theme, name) in baseThemes" :key="name">
                  <button @click="selectMobileTheme(name)" :class="[
                    'panel-focus-element mobile-focus-indicator group p-3 rounded-lg border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-left transform hover:scale-[1.02] active:scale-[0.98] touch-manipulation',
                    'hover:shadow-md hover:shadow-[var(--color-primary)]/10',
                    currentTheme.name.replace('-dark', '') === name
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-sm shadow-[var(--color-primary)]/20'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface)]'
                  ]">
                    <div class="flex items-center gap-3">
                      <div class="text-lg transition-transform duration-300 ease-out group-hover:scale-110">{{
                        theme.icon }}</div>
                      <div class="flex-1">
                        <div class="text-sm font-medium text-[var(--color-text)]">{{ theme.label }}</div>
                        <div
                          class="w-full h-3 rounded-md mt-1 transition-all duration-300 ease-out group-hover:shadow-sm"
                          :style="{ background: isDarkMode && theme.darkPreview ? theme.darkPreview : theme.preview }">
                        </div>
                      </div>
                    </div>
                  </button>
                </template>
              </div>

              <!-- Mobile Dark Mode Toggle -->
              <div class="mt-3 pt-3 border-t border-[var(--color-border)]">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-[var(--color-text)]">Dark Mode</span>
                    <span class="text-xs text-[var(--color-text-secondary)]">{{ autoDetectionEnabled ? 'Auto' : 'Manual'
                    }}</span>
                  </div>
                  <button @click="toggleDarkMode" :class="[
                    'panel-focus-element mobile-focus-indicator relative w-12 h-6 rounded-full transition-all duration-300 ease-out touch-manipulation',
                    isDarkMode
                      ? 'bg-[var(--color-primary)]'
                      : 'bg-[var(--color-border)]'
                  ]">
                    <div :class="[
                      'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ease-out',
                      isDarkMode ? 'left-6' : 'left-0.5'
                    ]"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Language Control -->
          <div class="relative">
            <button @click.stop="toggleMobileLanguagePanel" :class="[
              'group w-full p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-left transform hover:scale-[1.02] active:scale-[0.98] touch-manipulation',
              'hover:shadow-lg hover:shadow-[var(--color-primary)]/15 hover:border-[var(--color-primary)]/30',
              'active:bg-[var(--color-primary)]/5',
              showMobileLanguagePanel
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md shadow-[var(--color-primary)]/20'
                : 'hover:bg-[var(--color-surface)]/80'
            ]">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <Globe :class="[
                    'w-5 h-5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
                    showMobileLanguagePanel ? 'text-[var(--color-primary)] scale-110 rotate-6' : 'text-[var(--color-primary)] group-hover:scale-110 group-hover:rotate-3'
                  ]" />
                  <span class="text-sm font-semibold text-[var(--color-text)]">{{ t('nav.language') }}</span>
                </div>
                <div :class="[
                  'w-4 h-4 border-2 border-[var(--color-text-secondary)] border-t-transparent rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
                  showMobileLanguagePanel ? 'rotate-180' : 'group-hover:rotate-90'
                ]"></div>
              </div>
              <div class="text-xs text-[var(--color-text-secondary)] flex items-center gap-2">
                <span>{{languages.find(l => l.code === locale)?.flag}}</span>
                <span>{{languages.find(l => l.code === locale)?.name}}</span>
              </div>
            </button>

            <!-- Mobile Language Panel -->
            <div v-if="showMobileLanguagePanel" @click.stop id="mobile-language-panel" :class="[
              'focus-trap-container modal-focus-trap mobile-language-panel absolute top-full left-0 right-0 mt-2 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl shadow-2xl z-50',
              'mobile-panel-enter'
            ]" role="dialog" aria-labelledby="mobile-language-panel-title" aria-modal="false">
              <h3 id="mobile-language-panel-title" class="sr-only">{{ t('nav.language') }}</h3>
              <div class="space-y-2">
                <template v-for="lang in languages" :key="lang.code">
                  <button @click="changeMobileLanguage(lang.code)" :class="[
                    'panel-focus-element mobile-focus-indicator w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] transform hover:scale-[1.02] active:scale-[0.98] touch-manipulation',
                    'hover:shadow-md hover:shadow-[var(--color-primary)]/10',
                    locale === lang.code
                      ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow-md shadow-[var(--color-primary)]/20'
                      : 'hover:bg-[var(--color-surface)] text-[var(--color-text)] hover:text-[var(--color-primary)]'
                  ]">
                    <span class="text-xl transition-transform duration-300 ease-out hover:scale-110">{{ lang.flag
                    }}</span>
                    <span class="text-sm font-medium">{{ lang.name }}</span>
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Links removed as requested -->
      </div>
    </div>
  </nav>
</template>