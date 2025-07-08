<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { Globe } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { LOCALE_STORAGE_KEY } from '@/i18n'

const { locale, t } = useI18n()
const showDropdown = ref(false)

const languages = computed(() => [
  { code: 'en', name: t('languages.en'), flag: '🇺🇸' },
  { code: 'fr', name: t('languages.fr'), flag: '🇫🇷' }
])

function changeLanguage(lang: string) {
  locale.value = lang
  localStorage.setItem(LOCALE_STORAGE_KEY, lang)
  showDropdown.value = false
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

// Close dropdown when clicking outside
function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement
  if (!target.closest('.language-switcher')) {
    showDropdown.value = false
  }
}

// Add event listener when component mounts
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="language-switcher relative">
    <Button
      variant="ghost"
      size="icon"
      class="text-white hover:bg-white/10 border border-white/20 hover:border-white/40"
      @click="toggleDropdown"
    >
      <Globe class="w-5 h-5" />
    </Button>

    <!-- Dropdown -->
    <div
      v-if="showDropdown"
      class="absolute top-full mt-2 left-0 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-lg overflow-hidden z-50"
    >
      <template v-for="lang in languages" :key="lang.code">
        <button
          @click="changeLanguage(lang.code)"
          :class="[
            'w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3 min-w-[140px]',
            locale === lang.code ? 'bg-white/10 text-white' : 'text-white/80'
          ]"
        >
          <span class="text-lg">{{ lang.flag }}</span>
          <span class="text-sm">{{ lang.name }}</span>
        </button>
      </template>
    </div>
  </div>
</template> 