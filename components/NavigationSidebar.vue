<script setup lang="ts">
import { Home, User, Briefcase, GraduationCap, Folder, Code, Mail, Palette, Globe, Github, Linkedin, Menu, X } from 'lucide-vue-next'
import { ref, computed, onMounted, onUnmounted } from 'vue'
// useI18n is auto-imported by Nuxt
import { useTheme } from '~/composables/useTheme'

const { t, locale, setLocale } = useI18n()
const { currentTheme, themes, setTheme } = useTheme()
const activeSection = ref('hero')
const showThemePanel = ref(false)
const showLanguagePanel = ref(false)
const showMobileMenu = ref(false)

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

const socialLinks = computed(() => [
  { name: 'GitHub', icon: Github, url: 'https://github.com/aingaRamangalahy', tooltip: t('nav.socials.githubTooltip') },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/ainga-ramangalahy', tooltip: t('nav.socials.linkedinTooltip') }
])

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
  setTheme(themeName)
  showThemePanel.value = false
}

async function changeLanguage(lang: string) {
  // Use setLocale to properly handle lazy loading
  await setLocale(lang)
  showLanguagePanel.value = false
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

function openLink(url: string) {
  navigateTo(url, { external: true, open: { target: '_blank' } })
}

function scrollToSection(href: string) {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    showMobileMenu.value = false
  }
}

function closePanels() {
  showThemePanel.value = false
  showLanguagePanel.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', closePanels)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closePanels)
})
</script>

<template>
  <!-- Desktop Navigation -->
  <nav class="fixed left-0 top-0 h-screen z-50 hidden lg:block">
    <div
      class="flex flex-col h-full p-2 bg-[var(--color-background)]/80 border-0 backdrop-blur-xl shadow-2xl rounded-r-2xl">
      <div class="flex flex-col gap-1">
        <!-- Navigation Items -->
        <template v-for="item in navItems" :key="item.id">
          <button @click="scrollToSection(item.href)" :class="[
            'group relative w-12 h-12 p-0 transition-all duration-300 rounded-xl flex items-center justify-center',
            activeSection === item.id
              ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow-lg'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]'
          ]">
            <component :is="item.icon" class="w-5 h-5" />

            <!-- Tooltip -->
            <div
              class="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text)] text-[var(--color-background)] text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-10">
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
        <div class="relative">
          <button @click.stop="toggleThemePanel" :class="[
            'group relative w-12 h-12 p-0 rounded-xl transition-all duration-300 flex items-center justify-center',
            showThemePanel
              ? 'bg-[var(--color-primary)] text-[var(--color-background)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]'
          ]">
            <Palette class="w-5 h-5" />

            <!-- Tooltip -->
            <div
              class="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text)] text-[var(--color-background)] text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-10">
              {{ t('nav.themeSwitcherTooltip') }}
              <div
                class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--color-text)]">
              </div>
            </div>
          </button>

          <!-- Theme Panel -->
          <div v-if="showThemePanel" @click.stop
            class="absolute left-16 bottom-0 w-80 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl shadow-2xl">
            <h3 class="text-lg font-semibold text-[var(--color-text)] mb-4">{{ t('nav.chooseTheme') }}</h3>
            <div class="grid grid-cols-2 gap-3">
              <template v-for="(theme, name) in themes" :key="name">
                <button @click="selectTheme(name)" :class="[
                  'group p-4 rounded-xl border-2 transition-all duration-200 text-left',
                  currentTheme.name === name
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                ]">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="text-xl">{{ theme.icon }}</div>
                    <div>
                      <div class="text-sm font-semibold text-[var(--color-text)]">{{ theme.label }}</div>
                    </div>
                  </div>
                  <div class="w-full h-6 rounded-lg" :style="{ background: theme.preview }"></div>
                </button>
              </template>
            </div>
          </div>
        </div>

        <!-- Language Switcher -->
        <div class="relative">
          <button @click.stop="toggleLanguagePanel" :class="[
            'group relative w-12 h-12 p-0 rounded-xl transition-all duration-300 flex items-center justify-center',
            showLanguagePanel
              ? 'bg-[var(--color-primary)] text-[var(--color-background)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]'
          ]">
            <Globe class="w-5 h-5" />

            <!-- Tooltip -->
            <div
              class="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text)] text-[var(--color-background)] text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-10">
              {{ t('nav.languageSwitcherTooltip') }}
              <div
                class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--color-text)]">
              </div>
            </div>
          </button>

          <!-- Language Panel -->
          <div v-if="showLanguagePanel" @click.stop
            class="absolute left-16 bottom-0 w-64 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl shadow-2xl">
            <h3 class="text-lg font-semibold text-[var(--color-text)] mb-4">{{ t('nav.language') }}</h3>
            <div class="space-y-2">
              <template v-for="lang in languages" :key="lang.code">
                <button @click="changeLanguage(lang.code)" :class="[
                  'w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
                  locale === lang.code
                    ? 'bg-[var(--color-primary)] text-[var(--color-background)]'
                    : 'hover:bg-[var(--color-surface)] text-[var(--color-text)]'
                ]">
                  <span class="text-xl">{{ lang.flag }}</span>
                  <span class="text-sm font-medium">{{ lang.name }}</span>
                </button>
              </template>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <template v-for="social in socialLinks" :key="social.name">
          <button @click="openLink(social.url)"
            class="group relative w-12 h-12 p-0 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-all duration-300 flex items-center justify-center">
            <component :is="social.icon" class="w-5 h-5" />

            <!-- Tooltip -->
            <div
              class="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text)] text-[var(--color-background)] text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-10">
              {{ social.tooltip }}
              <div
                class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--color-text)]">
              </div>
            </div>
          </button>
        </template>
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

        <button @click="showMobileMenu = !showMobileMenu"
          class="w-10 h-10 p-0 rounded-xl text-[var(--color-text)] flex items-center justify-center">
          <Menu v-if="!showMobileMenu" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="showMobileMenu" class="fixed inset-0 z-40 bg-[var(--color-background)]/95 backdrop-blur-xl pt-20">
      <div class="p-6 space-y-6">
        <!-- Navigation Items -->
        <div class="space-y-2">
          <template v-for="item in navItems" :key="item.id">
            <button @click="scrollToSection(item.href)" :class="[
              'w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left',
              activeSection === item.id
                ? 'bg-[var(--color-primary)] text-[var(--color-background)]'
                : 'text-[var(--color-text)] hover:bg-[var(--color-surface)]'
            ]">
              <component :is="item.icon" class="w-6 h-6" />
              <span class="text-lg font-semibold">{{ t(item.label) }}</span>
            </button>
          </template>
        </div>

        <!-- Controls -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Theme Control -->
          <div class="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <Palette class="w-5 h-5 text-[var(--color-primary)]" />
              <span class="text-sm font-semibold text-[var(--color-text)]">Theme</span>
            </div>
            <div class="text-xs text-[var(--color-text-secondary)]">
              {{ currentTheme.label }} {{ currentTheme.icon }}
            </div>
          </div>

          <!-- Language Control -->
          <div class="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <Globe class="w-5 h-5 text-[var(--color-primary)]" />
              <span class="text-sm font-semibold text-[var(--color-text)]">Language</span>
            </div>
            <div class="text-xs text-[var(--color-text-secondary)]">
              {{languages.find(l => l.code === locale)?.name}}
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex justify-center gap-4">
          <template v-for="social in socialLinks" :key="social.name">
            <button @click="openLink(social.url)"
              class="w-12 h-12 p-0 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] flex items-center justify-center">
              <component :is="social.icon" class="w-6 h-6" />
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>