<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Home, Briefcase, GraduationCap, FolderOpen, Code, Mail, Palette, Globe } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'

const { t, locale } = useI18n()
const { currentTheme, themes, setTheme } = useTheme()
const activeSection = ref('hero')
const showThemePanel = ref(false)
const showLanguagePanel = ref(false)

const navItems = [
  { id: 'hero', href: '#hero', icon: Home, label: 'nav.home' },
  { id: 'experience', href: '#experience', icon: Briefcase, label: 'nav.experience' },
  { id: 'education', href: '#education', icon: GraduationCap, label: 'nav.education' },
  { id: 'projects', href: '#projects', icon: FolderOpen, label: 'nav.projects' },
  { id: 'skills', href: '#skills', icon: Code, label: 'nav.skills' },
  { id: 'contact', href: '#contact', icon: Mail, label: 'nav.contact' },
]

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]

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

// Close panels when clicking outside
function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement
  if (!target.closest('.theme-switcher') && !target.closest('.language-switcher')) {
    showThemePanel.value = false
    showLanguagePanel.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav class="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden xl:block">
    <Card class="p-4 bg-[var(--color-background)]/90 backdrop-blur-md border border-[var(--color-border)] transition-colors duration-300">
      <!-- Logo -->
      <div class="mb-6 text-center">
        <div class="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center mx-auto transition-colors duration-300">
          <span class="text-[var(--color-background)] font-bold text-sm">{ }</span>
        </div>
      </div>

      <!-- Navigation Items -->
      <div class="flex flex-col space-y-3">
        <template v-for="item in navItems" :key="item.id">
          <Button
            :variant="activeSection === item.id ? 'default' : 'ghost'"
            size="icon"
            :class="[
              'relative group w-12 h-12 transition-all duration-300',
              activeSection === item.id
                ? 'bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-primary)]/90'
                : 'text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border border-transparent hover:border-[var(--color-border)]'
            ]"
            as-child
          >
            <a :href="item.href">
              <component :is="item.icon" class="w-5 h-5" />

              <!-- Tooltip -->
              <div class="absolute left-full ml-4 px-3 py-2 bg-[var(--color-background)]/95 text-[var(--color-text)] text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-[var(--color-border)] backdrop-blur-sm">
                {{ t(item.label) }}
                <div class="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-[var(--color-background)] rotate-45 border-l border-b border-[var(--color-border)]"></div>
              </div>
            </a>
          </Button>
        </template>
      </div>

      <!-- Language Switcher (inline) -->
      <div class="language-switcher relative mt-6 flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          class="relative group text-[var(--color-text)] hover:bg-[var(--color-primary)]/10 border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors duration-300 cursor-pointer"
          @click="showLanguagePanel = !showLanguagePanel"
        >
          <Globe class="w-5 h-5" />
          <!-- Tooltip -->
          <div class="absolute left-full ml-4 px-3 py-2 bg-[var(--color-background)]/95 text-[var(--color-text)] text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-[var(--color-border)] backdrop-blur-sm">
            {{ t('nav.languageSwitcherTooltip') }}
            <div class="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-[var(--color-background)] rotate-45 border-l border-b border-[var(--color-border)]"></div>
          </div>
        </Button>

        <!-- Language Dropdown -->
        <div
          v-if="showLanguagePanel"
          class="absolute top-full mt-2 left-0 bg-[var(--color-background)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-lg shadow-lg overflow-hidden z-50 transition-colors duration-300"
        >
          <template v-for="lang in languages" :key="lang.code">
            <button
              @click="changeLanguage(lang.code)"
              :class="[
                'w-full px-4 py-3 text-left hover:bg-[var(--color-primary)]/10 transition-colors flex items-center gap-3 min-w-[140px]',
                locale === lang.code ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-text)]'
              ]"
            >
              <span class="text-lg">{{ lang.flag }}</span>
              <span class="text-sm">{{ lang.name }}</span>
            </button>
          </template>
        </div>
      </div>

      <!-- Theme Switcher (inline) -->
      <div class="theme-switcher relative mt-3 flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          class="relative group text-[var(--color-text)] hover:bg-[var(--color-primary)]/10 border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors duration-300 cursor-pointer"
          @click="showThemePanel = !showThemePanel"
        >
          <Palette class="w-5 h-5" />
          <!-- Tooltip -->
          <div class="absolute left-full ml-4 px-3 py-2 bg-[var(--color-background)]/95 text-[var(--color-text)] text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-[var(--color-border)] backdrop-blur-sm">
            {{ t('nav.themeSwitcherTooltip') }}
            <div class="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-[var(--color-background)] rotate-45 border-l border-b border-[var(--color-border)]"></div>
          </div>
        </Button>

        <!-- Theme Panel - Positioned to the Top-Left -->
        <div
          v-if="showThemePanel"
          class="absolute bottom-full left-0 mb-2 bg-[var(--color-background)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-xl shadow-2xl overflow-hidden z-50 w-64 transition-colors duration-300"
        >
          <!-- Header -->
          <div class="px-4 py-3 border-b border-[var(--color-border)]">
            <h3 class="text-[var(--color-text)] font-semibold text-sm">Themes</h3>
          </div>

          <!-- Theme List -->
          <div class="py-2">
            <template v-for="theme in Object.values(themes)" :key="theme.name">
              <button
                @click="selectTheme(theme.name)"
                :class="[
                  'w-full px-4 py-3 text-left hover:bg-[var(--color-primary)]/5 transition-colors duration-200 flex items-center gap-3',
                  currentTheme === theme.name ? 'bg-[var(--color-primary)]/10' : ''
                ]"
              >
                <!-- Theme Preview Circle -->
                <div 
                  class="w-8 h-8 rounded-full border border-[var(--color-border)] flex-shrink-0"
                  :style="{ background: theme.preview }"
                ></div>
                
                <!-- Theme Info -->
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <span class="text-lg">{{ theme.icon }}</span>
                    <span class="text-[var(--color-text)] text-sm font-medium">{{ theme.label }}</span>
                  </div>
                </div>

                <!-- Active Indicator -->
                <div 
                  v-if="currentTheme === theme.name"
                  class="w-2 h-2 bg-[var(--color-primary)] rounded-full flex-shrink-0"
                ></div>
              </button>
            </template>
          </div>
        </div>
      </div>

      <!-- Bottom decoration -->
      <div class="mt-6 text-center">
        <div class="w-8 h-px bg-[var(--color-border)] mx-auto transition-colors duration-300"></div>
      </div>
    </Card>
  </nav>
</template> 