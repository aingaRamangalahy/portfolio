<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Analytics } from '@vercel/analytics/vue'
</script>

<template>
  <Analytics />
  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
