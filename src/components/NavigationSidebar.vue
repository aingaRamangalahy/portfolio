<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { User, Briefcase, GraduationCap, Folder, Code, Mail, Palette, Globe, ExternalLink, Github, Linkedin, Menu, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'

const { t, locale } = useI18n()
const { currentTheme, themes, setTheme } = useTheme()
const activeSection = ref('hero')
const showThemePanel = ref(false)
const showLanguagePanel = ref(false)
const showMobileMenu = ref(false)

const navItems = [
  { id: 'hero', href: '#hero', icon: User, label: 'nav.home' },
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

function changeLanguage(lang: string) {
  locale.value = lang
  localStorage.setItem('portfolio-locale', lang)
  showLanguagePanel.value = false
}

function openLink(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
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
  <nav class="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
    <Card class="p-2 bg-[var(--color-background)]/80 backdrop-blur-xl border border-[var(--color-border)]/50 shadow-2xl">
      <div class="flex flex-col gap-1">
        <!-- Navigation Items -->
        <template v-for="item in navItems" :key="item.id">
          <Button
            variant="ghost"
            size="sm"
            @click="scrollToSection(item.href)"
            :class="[
              'group relative w-12 h-12 p-0 rounded-xl transition-all duration-300',
              activeSection === item.id 
                ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow-lg' 
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]'
            ]"
          >
            <component :is="item.icon" class="icon-md" />
            
            <!-- Tooltip -->
            <div class="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text)] text-[var(--color-background)] text-caption rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-10">
              {{ t(item.label) }}
              <div class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--color-text)]"></div>
            </div>
          </Button>
        </template>

        <!-- Divider -->
        <div class="w-8 h-px bg-[var(--color-border)] mx-auto my-2"></div>

        <!-- Theme Switcher -->
        <div class="relative">
          <Button
            variant="ghost"
            size="sm"
            @click.stop="showThemePanel = !showThemePanel"
            :class="[
              'group w-12 h-12 p-0 rounded-xl transition-all duration-300',
              showThemePanel 
                ? 'bg-[var(--color-primary)] text-[var(--color-background)]' 
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]'
            ]"
          >
            <Palette class="icon-md" />
            
            <!-- Tooltip -->
            <div class="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text)] text-[var(--color-background)] text-caption rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-10">
              {{ t('nav.themeSwitcherTooltip') }}
              <div class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--color-text)]"></div>
            </div>
          </Button>

          <!-- Theme Panel -->
          <div v-if="showThemePanel" @click.stop class="absolute left-16 top-0 w-80 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl shadow-2xl">
            <h3 class="text-subheading font-semibold text-[var(--color-text)] mb-4">{{ t('nav.chooseTheme') }}</h3>
            <div class="grid grid-cols-2 gap-3">
              <template v-for="(theme, name) in themes" :key="name">
                <button
                  @click="selectTheme(name)"
                  :class="[
                    'group p-4 rounded-xl border-2 transition-all duration-200 text-left',
                    currentTheme.name === name 
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' 
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                  ]"
                >
                  <div class="flex items-center gap-3 mb-3">
                    <div class="text-xl">{{ theme.icon }}</div>
                    <div>
                      <div class="text-body font-semibold text-[var(--color-text)]">{{ theme.label }}</div>
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
          <Button
            variant="ghost"
            size="sm"
            @click.stop="showLanguagePanel = !showLanguagePanel"
            :class="[
              'group w-12 h-12 p-0 rounded-xl transition-all duration-300',
              showLanguagePanel 
                ? 'bg-[var(--color-primary)] text-[var(--color-background)]' 
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]'
            ]"
          >
            <Globe class="icon-md" />
            
            <!-- Tooltip -->
            <div class="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text)] text-[var(--color-background)] text-caption rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-10">
              {{ t('nav.languageSwitcherTooltip') }}
              <div class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--color-text)]"></div>
            </div>
          </Button>

          <!-- Language Panel -->
          <div v-if="showLanguagePanel" @click.stop class="absolute left-16 top-0 w-64 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl shadow-2xl">
            <h3 class="text-subheading font-semibold text-[var(--color-text)] mb-4">{{ t('nav.language') }}</h3>
            <div class="space-y-2">
              <template v-for="lang in languages" :key="lang.code">
                <button
                  @click="changeLanguage(lang.code)"
                  :class="[
                    'w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
                    locale === lang.code 
                      ? 'bg-[var(--color-primary)] text-[var(--color-background)]' 
                      : 'hover:bg-[var(--color-surface)] text-[var(--color-text)]'
                  ]"
                >
                  <span class="text-xl">{{ lang.flag }}</span>
                  <span class="text-body font-medium">{{ lang.name }}</span>
                </button>
              </template>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-8 h-px bg-[var(--color-border)] mx-auto my-2"></div>

        <!-- Social Links -->
        <template v-for="social in socialLinks" :key="social.name">
          <Button
            variant="ghost"
            size="sm"
            @click="openLink(social.url)"
            class="group w-12 h-12 p-0 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-all duration-300"
          >
            <component :is="social.icon" class="icon-md" />
            
            <!-- Tooltip -->
            <div class="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-[var(--color-text)] text-[var(--color-background)] text-caption rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-10">
              {{ social.tooltip }}
              <div class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--color-text)]"></div>
            </div>
          </Button>
        </template>
      </div>
    </Card>
  </nav>

  <!-- Mobile Navigation -->
  <nav class="hidden">
    <!-- Mobile Header -->
    <div class="fixed top-0 left-0 right-0 z-50 p-4 bg-[var(--color-background)]/80 backdrop-blur-xl border-b border-[var(--color-border)]/50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
            <span class="text-[var(--color-background)] font-bold text-lg">{{ t('nav.name').charAt(0) }}</span>
          </div>
          <span class="text-subheading font-bold text-[var(--color-text)]">{{ t('nav.name') }}</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          @click="showMobileMenu = !showMobileMenu"
          class="w-10 h-10 p-0 rounded-xl text-[var(--color-text)]"
        >
          <Menu v-if="!showMobileMenu" class="icon-md" />
          <X v-else class="icon-md" />
        </Button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="showMobileMenu"
      class="fixed inset-0 z-40 bg-[var(--color-background)]/95 backdrop-blur-xl pt-20"
    >
      <div class="p-6 space-y-6">
        <!-- Navigation Items -->
        <div class="space-y-2">
          <template v-for="item in navItems" :key="item.id">
            <button
              @click="scrollToSection(item.href)"
              :class="[
                'w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left',
                activeSection === item.id 
                  ? 'bg-[var(--color-primary)] text-[var(--color-background)]' 
                  : 'text-[var(--color-text)] hover:bg-[var(--color-surface)]'
              ]"
            >
              <component :is="item.icon" class="icon-lg" />
              <span class="text-body-large font-semibold">{{ t(item.label) }}</span>
            </button>
          </template>
        </div>

        <!-- Controls -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Theme Control -->
          <Card class="p-4 bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div class="flex items-center gap-3 mb-3">
              <Palette class="icon-md text-[var(--color-primary)]" />
              <span class="text-body font-semibold text-[var(--color-text)]">Theme</span>
            </div>
            <div class="text-caption text-[var(--color-text-secondary)]">
              {{ currentTheme.label }} {{ currentTheme.icon }}
            </div>
          </Card>

          <!-- Language Control -->
          <Card class="p-4 bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div class="flex items-center gap-3 mb-3">
              <Globe class="icon-md text-[var(--color-primary)]" />
              <span class="text-body font-semibold text-[var(--color-text)]">Language</span>
            </div>
            <div class="text-caption text-[var(--color-text-secondary)]">
              {{ languages.find(l => l.code === locale)?.name }}
            </div>
          </Card>
        </div>

        <!-- Social Links -->
        <div class="flex justify-center gap-4">
          <template v-for="social in socialLinks" :key="social.name">
            <Button
              variant="ghost"
              size="sm"
              @click="openLink(social.url)"
              class="w-12 h-12 p-0 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]"
            >
              <component :is="social.icon" class="icon-lg" />
            </Button>
          </template>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Navigation -->
    <div class="fixed bottom-6 left-6 right-6 z-50 lg:hidden">
      <Card class="p-2 bg-[var(--color-background)]/80 backdrop-blur-xl border border-[var(--color-border)]/50 shadow-2xl">
        <div class="flex justify-between items-center gap-1">
          <template v-for="item in navItems.slice(0, 5)" :key="item.id">
            <Button
              variant="ghost"
              size="sm"
              @click="scrollToSection(item.href)"
              :class="[
                'flex-1 h-12 p-0 rounded-xl transition-all duration-300',
                activeSection === item.id 
                  ? 'bg-[var(--color-primary)] text-[var(--color-background)]' 
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
              ]"
            >
              <component :is="item.icon" class="icon-md" />
            </Button>
          </template>
        </div>
      </Card>
    </div>
  </nav>
</template> 