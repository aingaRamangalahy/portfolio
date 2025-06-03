<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Layers, Calendar, Cpu, MapPin } from 'lucide-vue-next'

const { t } = useI18n()
const mounted = ref(false)

const descriptions = computed(() => [
  t('hero.description1'),
  t('hero.description2'),
  t('hero.description3'),
  t('hero.description4')
])

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <section
    id="hero"
    class="py-20 relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 theme-surface"
    :style="{ backgroundColor: 'var(--color-surface)' }"
  >
    <!-- Tech background -->
    <div class="absolute inset-0">
      <!-- Grid pattern -->
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute inset-0"
          :style="{
            backgroundImage: `
              linear-gradient(var(--color-text) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-text) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }"
        ></div>
      </div>

      <!-- Circuit patterns -->
      <div class="absolute top-20 left-20 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" class="w-full h-full">
          <path d="M10,10 L90,10 L90,50 L50,50 L50,90 L10,90 Z" fill="none" :stroke="'var(--color-text)'" stroke-width="1" />
          <circle cx="10" cy="10" r="2" :fill="'var(--color-text)'" />
          <circle cx="90" cy="50" r="2" :fill="'var(--color-text)'" />
          <circle cx="50" cy="90" r="2" :fill="'var(--color-text)'" />
        </svg>
      </div>

      <div class="absolute top-40 right-32 w-24 h-24 opacity-20">
        <svg viewBox="0 0 100 100" class="w-full h-full">
          <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" :stroke="'var(--color-text)'" stroke-width="1" />
          <path d="M20,50 L80,50 M50,20 L50,80" :stroke="'var(--color-text)'" stroke-width="0.5" />
          <circle cx="50" cy="50" r="3" :fill="'var(--color-text)'" />
        </svg>
      </div>

      <!-- Geometric shapes -->
      <div class="absolute bottom-32 left-1/4 w-16 h-16 opacity-30">
        <div class="w-full h-full rotate-45" :style="{ borderColor: 'var(--color-border)' }"></div>
      </div>

      <div class="absolute top-32 left-1/3 w-12 h-12 opacity-30">
        <div class="w-full h-full rotate-12" :style="{ borderColor: 'var(--color-border)' }"></div>
      </div>

      <!-- Celestial bodies -->
      <div class="absolute top-20 right-20 w-16 h-16 rounded-full opacity-60" :style="{ backgroundColor: 'var(--color-text)'}"></div>
      <div class="absolute top-32 left-1/4 w-12 h-12 rounded-full opacity-40" :style="{ backgroundColor: 'var(--color-text)'}"></div>
      <div class="absolute top-16 left-1/3 w-8 h-8 rounded-full opacity-50" :style="{ backgroundColor: 'var(--color-text)'}"></div>
      <div class="absolute top-40 right-1/3 w-20 h-20 rounded-full opacity-30" :style="{ backgroundColor: 'var(--color-text)'}"></div>
      <div class="absolute top-24 left-1/2 w-6 h-6 rounded-full opacity-60" :style="{ backgroundColor: 'var(--color-text)'}"></div>

      <!-- Large central celestial body -->
      <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full opacity-10 blur-sm" :style="{ backgroundColor: 'var(--color-text)'}"></div>
      <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full opacity-20" :style="{ backgroundColor: 'var(--color-text)'}"></div>

      

      <!-- Tech particles -->
      <div class="absolute top-10 left-10 w-1 h-1 rounded-full opacity-80 animate-ping" :style="{ backgroundColor: 'var(--color-text)'}"></div>
      <div
        class="absolute top-16 left-20 w-1 h-1 rounded-full opacity-60 animate-ping"
        :style="{ backgroundColor: 'var(--color-text)', animationDelay: '1s' }"
      ></div>
      <div
        class="absolute top-12 right-40 w-1 h-1 rounded-full opacity-90 animate-ping"
        :style="{ backgroundColor: 'var(--color-text)', animationDelay: '2s' }"
      ></div>

      <!-- Data streams -->
      <div class="absolute top-1/3 left-10 opacity-20">
        <div class="flex flex-col space-y-1">
          <div class="w-20 h-px animate-pulse" :style="{ backgroundColor: 'var(--color-text)'}"></div>
          <div class="w-16 h-px animate-pulse" :style="{ backgroundColor: 'var(--color-text)', animationDelay: '0.5s' }"></div>
          <div class="w-24 h-px animate-pulse" :style="{ backgroundColor: 'var(--color-text)', animationDelay: '1s' }"></div>
        </div>
      </div>

      <!-- Overlay for text readability -->
      <div class="absolute inset-0 opacity-20" :style="{ backgroundColor: 'var(--color-surface)' }"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mt-20">
      <div
        :class="[
          'transition-all duration-1000',
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        ]"
      >
        <!-- Main Title -->
        <div class="text-center mb-16">
          <h1 class="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight transition-colors duration-300" :style="{ color: 'var(--color-text)' }">
            Ainga
            <span class="block">RAMANGALAHY</span>
          </h1>
          
          <p class="text-xl mb-8 transition-colors duration-300" :style="{ color: 'var(--color-text-secondary)' }">{{ t('hero.title') }}</p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid lg:grid-cols-3 gap-12 items-start">
          <!-- Left Column - Main Description -->
          <div class="lg:col-span-2 space-y-6">
            <div class="space-y-6 text-lg leading-relaxed transition-colors duration-300" :style="{ color: 'var(--color-text-secondary)' }">
              <template v-for="(description, index) in descriptions" :key="index">
                <p>{{ description }}</p>
              </template>
            </div>

            <!-- Personal Traits -->
            <div class="flex flex-wrap gap-3 pt-6">
              <span class="px-4 py-2 font-semibold rounded-full text-sm backdrop-blur-sm transition-colors duration-300" :style="{ backgroundColor: 'var(--color-accent)', opacity: 0.7, color: 'var(--color-text)', borderColor: 'var(--color-border)', borderWidth: '1px' }">
                #{{ t('hero.traits.passionateLearner') }}
              </span>
              <span class="px-4 py-2 font-semibold rounded-full text-sm backdrop-blur-sm transition-colors duration-300" :style="{ backgroundColor: 'var(--color-accent)', opacity: 0.7, color: 'var(--color-text)', borderColor: 'var(--color-border)', borderWidth: '1px' }">
                #{{ t('hero.traits.teamPlayer') }}
              </span>
              <span class="px-4 py-2 font-semibold rounded-full text-sm backdrop-blur-sm transition-colors duration-300" :style="{ backgroundColor: 'var(--color-accent)', opacity: 0.7, color: 'var(--color-text)', borderColor: 'var(--color-border)', borderWidth: '1px' }">
                #{{ t('hero.traits.serviceOriented') }}
              </span>
            </div>

            <!-- Call to Action -->
            <div class="pt-8">
              <p class="text-lg mb-6 transition-colors duration-300" :style="{ color: 'var(--color-text-secondary)' }">{{ t('hero.callToAction') }}</p>

              <div class="flex flex-col sm:flex-row gap-4">
                <a
                  href="#projects"
                  class="px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-105 text-center"
                  :style="{ backgroundColor: 'var(--color-accent)', color: 'var(--color-background)' }"
                >
                  {{ t('hero.viewWork') }}
                </a>
                <a
                  href="#contact"
                  class="px-8 py-3 rounded-lg font-medium hover:opacity-80 transition-all duration-200 text-center"
                  :style="{ backgroundColor: 'transparent', color: 'var(--color-accent)', border: '1px solid var(--color-accent)' }"
                >
                  {{ t('hero.getInTouch') }}
                </a>
              </div>
            </div>
          </div>

          <!-- Right Column - Side Info -->
          <div class="space-y-8">
            <!-- Status -->
            <div class="rounded-lg p-6 backdrop-blur-sm transition-colors duration-300" :style="{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span class="font-medium transition-colors duration-300" :style="{ color: 'var(--color-text)' }">{{ t('hero.availableForWork') }}</span>
              </div>
              <p class="text-sm transition-colors duration-300" :style="{ color: 'var(--color-text-secondary)' }">
                {{ t('hero.availableDescription') }}
              </p>
            </div>

            <!-- Quick Stats -->
            <div class="rounded-lg p-6 shadow-xl" :style="{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }">
              <div class="grid grid-cols-2 gap-4">
                <!-- Stat Item 1: Projects Completed -->
                <div class="flex flex-col items-center text-center p-4 border border-[var(--color-border)] rounded-lg transition-all duration-300 hover:shadow-md">
                  <Layers class="w-8 h-8 mb-2" :style="{ color: 'var(--color-accent)' }" />
                  <span class="text-3xl font-bold" :style="{ color: 'var(--color-text)' }">6+</span>
                  <span class="text-sm mt-1" :style="{ color: 'var(--color-text-secondary)' }">{{ t('hero.stats.projectsCompleted') }}</span>
                </div>
                <!-- Stat Item 2: Years Experience -->
                <div class="flex flex-col items-center text-center p-4 border border-[var(--color-border)] rounded-lg transition-all duration-300 hover:shadow-md">
                  <Calendar class="w-8 h-8 mb-2" :style="{ color: 'var(--color-accent)' }" />
                  <span class="text-3xl font-bold" :style="{ color: 'var(--color-text)' }">5+</span>
                  <span class="text-sm mt-1" :style="{ color: 'var(--color-text-secondary)' }">{{ t('hero.stats.yearsExperience') }}</span>
                </div>
                <!-- Stat Item 3: Based In -->
                <div class="flex flex-col items-center text-center p-4 border border-[var(--color-border)] rounded-lg transition-all duration-300 hover:shadow-md">
                  <MapPin class="w-8 h-8 mb-2" :style="{ color: 'var(--color-accent)' }" />
                  <span class="text-3xl font-bold" :style="{ color: 'var(--color-text)' }">GMT+3</span>
                  <span class="text-sm mt-1" :style="{ color: 'var(--color-text-secondary)' }">{{ t('hero.stats.basedIn') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template> 