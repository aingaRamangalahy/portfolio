<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Card } from '@/components/ui/card'
import { ArrowRight, Code2, GitBranch, Terminal, Braces, Database, Server, Rocket, Zap, Cpu, Globe, Package } from 'lucide-vue-next'

const { t } = useI18n()
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <section
    id="hero"
    class="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 lg:pt-0 relative overflow-hidden"
    :style="{ backgroundColor: 'var(--color-background)' }"
  >
    <!-- Minimal Background Pattern -->
    <div class="absolute inset-0 opacity-[0.015]">
      <div
        class="absolute inset-0"
        :style="{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, var(--color-primary) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, var(--color-primary) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }"
      ></div>
    </div>

    <!-- Floating Code Icons -->
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

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
      <div
        :class="[
          'transition-all duration-1000 ease-out',
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        ]"
      >
        <!-- Header Section -->
        <div class="text-center">
          <!-- Status Badge -->
          <!-- <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-primary)] text-body font-medium mb-12 shadow-sm">
            <div class="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
            {{ t('hero.availableForWork') }}
          </div> -->
          
          <!-- Main Title -->
          <h1 class="text-display text-[var(--color-text)] mb-8 text-balance" v-html="t('hero.greeting')">
          </h1>
          
          <!-- Subtitle -->
          <h2 class="text-heading text-[var(--color-text-secondary)] mb-12 text-balance font-normal">
            {{ t('hero.title') }}
          </h2>
          
          <!-- Description -->
          <p class="text-body-large text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-16 text-balance leading-relaxed">
            {{ t('hero.description1') }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-32">
            <a
              href="#projects"
              class="group inline-flex items-center gap-3 px-10 py-5 bg-[var(--color-primary)] text-[var(--color-background)] rounded-2xl font-semibold text-body-large hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[var(--color-primary)]/20"
            >
              {{ t('hero.viewWork') }}
              <ArrowRight class="icon-md transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              class="inline-flex items-center gap-3 px-10 py-5 border-2 border-[var(--color-border)] text-[var(--color-text)] rounded-2xl font-semibold text-body-large hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-all duration-300"
            >
              {{ t('hero.getInTouch') }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden lg:block">
      <div class="flex flex-col items-center gap-3 text-[var(--color-text-secondary)] animate-bounce">
        <div class="w-px h-12 bg-[var(--color-border)]"></div>
        <div class="w-3 h-3 bg-[var(--color-primary)] rounded-full"></div>
      </div>
    </div>
  </section>
</template> 