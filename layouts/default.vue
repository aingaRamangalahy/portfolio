<template>
  <div class="lg:pl-24">
    <NavigationSidebar />
    <ProgressIndicator position="side" />
    <slot />
    <BackToTopButton />
  </div>
</template>

<script setup>
import BackToTopButton from '~/components/ui/BackToTopButton.vue'
import ProgressIndicator from '~/components/ui/ProgressIndicator.vue'

// Layout-level setup for default layout
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale
  }
})
</script>

<style scoped>
/* Layout styles */
</style>