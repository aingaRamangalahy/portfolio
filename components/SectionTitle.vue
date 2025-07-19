<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  titleKey: string
  subtitleKey: string
}

const props = defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <div class="text-center mb-12 md:mb-16">
    <h2
      class="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 transition-colors duration-300 text-balance"
      :style="{ color: 'var(--color-text)' }"
    >
      {{ t(props.titleKey) }}
    </h2>
    <div
      class="w-20 h-1 mx-auto mb-4 sm:mb-6 transition-colors duration-300"
      :style="{ backgroundColor: 'var(--color-accent)' }"
    ></div>
    <p
      v-if="props.subtitleKey"
      class="text-base sm:text-lg max-w-3xl mx-auto transition-colors duration-300 text-balance"
      :style="{ color: 'var(--color-text-secondary)' }"
    >
      {{ t(props.subtitleKey) }}
    </p>
  </div>
</template>
