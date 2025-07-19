<template>
  <div class="lg:pl-24">
    <NavigationSidebar />
    <slot />
  </div>
</template>

<script setup>
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