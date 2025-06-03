<script setup lang="ts">
import { ref } from 'vue'
import { Palette } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useTheme, type ThemeName } from '@/composables/useTheme'

const { currentTheme, themes, setTheme } = useTheme()
const showThemePanel = ref(false)

function toggleThemePanel() {
  showThemePanel.value = !showThemePanel.value
}

function selectTheme(themeName: ThemeName) {
  setTheme(themeName)
  showThemePanel.value = false
}

// Close panel when clicking outside
function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement
  if (!target.closest('.theme-switcher')) {
    showThemePanel.value = false
  }
}

import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="theme-switcher relative">
    <!-- Theme Toggle Button -->
    <Button
      variant="ghost"
      size="icon"
      class="w-12 h-12 theme-text border theme-border hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)] transition-all duration-200"
      @click="toggleThemePanel"
    >
      <Palette class="w-5 h-5" />
    </Button>

    <!-- Theme Panel - Positioned to the Right -->
    <div
      v-if="showThemePanel"
      class="absolute top-0 right-full mr-4 theme-surface backdrop-blur-md border theme-border rounded-xl shadow-2xl overflow-hidden z-50 w-64"
    >
      <!-- Header -->
      <div class="px-4 py-3 border-b theme-border">
        <h3 class="theme-text font-semibold text-sm">Themes</h3>
      </div>

      <!-- Theme List -->
      <div class="py-2">
        <template v-for="theme in Object.values(themes)" :key="theme.name">
          <button
            @click="selectTheme(theme.name)"
            :class="[
              'w-full px-4 py-3 text-left transition-colors duration-200 flex items-center gap-3 hover:bg-[var(--color-accent)]/20',
              currentTheme === theme.name ? 'bg-[var(--color-accent)]/30' : ''
            ]"
          >
            <!-- Theme Preview Circle -->
            <div
              class="w-8 h-8 rounded-full border theme-border flex-shrink-0"
              :style="{ background: theme.preview }"
            ></div>
            
            <!-- Theme Info -->
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="text-lg">{{ theme.icon }}</span>
                <span class="theme-text text-sm font-medium">{{ theme.label }}</span>
              </div>
            </div>

            <!-- Active Indicator -->
            <div
              v-if="currentTheme === theme.name"
              class="w-2 h-2 rounded-full bg-[var(--color-accent)] flex-shrink-0"
            ></div>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-switcher {
  position: relative;
}
</style> 