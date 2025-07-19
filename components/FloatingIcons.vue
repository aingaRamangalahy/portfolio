<script setup lang="ts">
import { Code2, GitBranch, Terminal, Braces, Database, Server, Rocket, Zap, Cpu, Globe, Package } from 'lucide-vue-next'
</script>

<template>
  <div class="absolute inset-0 pointer-events-none">
    <!-- Code2 Icon -->
    <div class="absolute top-[20%] left-[10%] opacity-20 animate-float">
      <Code2 class="icon-xl text-[var(--color-primary)]" />
    </div>
    <!-- GitBranch Icon -->
    <div class="absolute top-[30%] right-[15%] opacity-15 animate-float" style="animation-delay: 1s;">
      <GitBranch class="icon-lg text-[var(--color-primary)]" />
    </div>
    <!-- Terminal Icon -->
    <div class="absolute bottom-[40%] left-[15%] opacity-25 animate-float" style="animation-delay: 2s;">
      <Terminal class="icon-lg text-[var(--color-primary)]" />
    </div>
    <!-- Braces Icon -->
    <div class="absolute top-[15%] right-[8%] opacity-10 animate-float" style="animation-delay: 3s;">
      <Braces class="icon-md text-[var(--color-primary)]" />
    </div>
    <!-- Database Icon -->
    <div class="absolute bottom-[25%] right-[20%] opacity-18 animate-float" style="animation-delay: 4s;">
      <Database class="icon-lg text-[var(--color-primary)]" />
    </div>
    <!-- Server Icon -->
    <div class="absolute top-[40%] left-[5%] opacity-12 animate-float" style="animation-delay: 5s;">
      <Server class="icon-md text-[var(--color-primary)]" />
    </div>
    <!-- Rocket Icon (Fast/Shipping) -->
    <div class="absolute top-[60%] right-[10%] opacity-22 animate-float" style="animation-delay: 6s;">
      <Rocket class="icon-xl text-[var(--color-primary)]" />
    </div>
    <!-- Zap Icon (Fast) -->
    <div class="absolute bottom-[60%] left-[25%] opacity-16 animate-float" style="animation-delay: 7s;">
      <Zap class="icon-lg text-[var(--color-primary)]" />
    </div>
    <!-- Cpu Icon -->
    <div class="absolute top-[45%] right-[25%] opacity-14 animate-float" style="animation-delay: 8s;">
      <Cpu class="icon-md text-[var(--color-primary)]" />
    </div>
    <!-- Globe Icon -->
    <div class="absolute bottom-[50%] right-[5%] opacity-20 animate-float" style="animation-delay: 9s;">
      <Globe class="icon-lg text-[var(--color-primary)]" />
    </div>
    <!-- Package Icon (Shipping) -->
    <div class="absolute top-[70%] left-[20%] opacity-17 animate-float" style="animation-delay: 10s;">
      <Package class="icon-md text-[var(--color-primary)]" />
    </div>
    <!-- Another Code2 Icon -->
    <div class="absolute bottom-[35%] right-[30%] opacity-13 animate-float" style="animation-delay: 11s;">
      <Code2 class="icon-md text-[var(--color-primary)]" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FloatingIcons'
}
</script>
