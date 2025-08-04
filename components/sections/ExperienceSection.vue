<script setup lang="ts">
import { Calendar, MapPin, ChevronDown, Award } from 'lucide-vue-next'

const { t, tm } = useI18n()
const mounted = ref(false)
const selectedExperience = ref<number | null>(null)
const popoverPosition = ref({ x: 0, y: 0 })

function showPopover(index: number, event: MouseEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  popoverPosition.value = {
    x: rect.left + rect.width / 2,
    y: rect.top + window.scrollY
  }
  selectedExperience.value = index
}

function hidePopover() {
  selectedExperience.value = null
}

interface Experience {
  key: string
  image: string
}

const experienceKeys: Experience[] = [
  { key: 'angular_dev', image: '/images/work/monlogement.png' },
  { key: 'vue_node_dev', image: '/images/work/hairun.png' },
  { key: 'angular_node', image: '/images/work/w3d.png' },
  { key: 'web_dev', image: '/images/work/hellotana.png' },
]

// Helper function to get achievements array
function getAchievements(key: string): string[] {
  try {
    const achievementItems = tm(`experience.positions.${key}.achievements`)
    const result: string[] = []
    
    if (Array.isArray(achievementItems)) {
      // Handle array of compiled messages
      achievementItems.forEach((item: any, index: number) => {
        if (typeof item === 'string') {
          result.push(item)
        } else if (item && typeof item === 'object') {
          // Handle compiled i18n message objects - check for static property or body.static
          if (item.static) {
            result.push(item.static)
          } else if (item.body && item.body.static) {
            result.push(item.body.static)
          } else {
            // Fallback: use t() function for individual items
            result.push(t(`experience.positions.${key}.achievements.${index}`))
          }
        } else {
          // Fallback: use t() function for individual items
          result.push(t(`experience.positions.${key}.achievements.${index}`))
        }
      })
    } else if (achievementItems && typeof achievementItems === 'object') {
      // Handle object with numeric keys
      Object.keys(achievementItems).forEach((itemKey) => {
        const item = achievementItems[itemKey]
        if (typeof item === 'string') {
          result.push(item)
        } else if (item && typeof item === 'object') {
          // Handle compiled i18n message objects - check for static property or body.static
          if (item.static) {
            result.push(item.static)
          } else if (item.body && item.body.static) {
            result.push(item.body.static)
          } else {
            result.push(t(`experience.positions.${key}.achievements.${itemKey}`))
          }
        } else {
          result.push(t(`experience.positions.${key}.achievements.${itemKey}`))
        }
      })
    }
    
    return result
  } catch (error) {
    console.warn(`Failed to load achievements for ${key}:`, error)
    return []
  }
}

function getTechnologies(key: string): string[] {
  try {
    const techItems = tm(`experience.positions.${key}.tech`)
    const result: string[] = []
    
    if (Array.isArray(techItems)) {
      // Handle array of compiled messages
      techItems.forEach((item: any, index: number) => {
        if (typeof item === 'string') {
          result.push(item)
        } else if (item && typeof item === 'object') {
          // Handle compiled i18n message objects - check for static property or body.static
          if (item.static) {
            result.push(item.static)
          } else if (item.body && item.body.static) {
            result.push(item.body.static)
          } else {
            // Fallback: use t() function for individual items
            result.push(t(`experience.positions.${key}.tech.${index}`))
          }
        } else {
          // Fallback: use t() function for individual items
          result.push(t(`experience.positions.${key}.tech.${index}`))
        }
      })
    } else if (techItems && typeof techItems === 'object') {
      // Handle object with numeric keys
      Object.keys(techItems).forEach((itemKey) => {
        const item = techItems[itemKey]
        if (typeof item === 'string') {
          result.push(item)
        } else if (item && typeof item === 'object') {
          // Handle compiled i18n message objects - check for static property or body.static
          if (item.static) {
            result.push(item.static)
          } else if (item.body && item.body.static) {
            result.push(item.body.static)
          } else {
            result.push(t(`experience.positions.${key}.tech.${itemKey}`))
          }
        } else {
          result.push(t(`experience.positions.${key}.tech.${itemKey}`))
        }
      })
    }
    
    return result
  } catch (error) {
    console.warn(`Failed to load technologies for ${key}:`, error)
    return []
  }
}

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <section id="experience" class="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    :style="{ backgroundColor: 'var(--color-background)' }">
    <div class="max-w-6xl mx-auto">
      <div :class="[
        'transition-all duration-1000 ease-out',
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      ]">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-4xl lg:text-5xl text-[var(--color-text)] mb-6 font-semibold">{{
            t('experience.title') }}</h2>
          <p class="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">{{ t('experience.subtitle') }}</p>
          <div
            class="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/50 mx-auto rounded-full mt-6">
          </div>
        </div>

        <!-- Experience Timeline -->
        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-primary)]/50 to-[var(--color-border)] hidden lg:block transform -translate-x-1/2 rounded-full"></div>

          <div class="space-y-16">
            <template v-for="(exp, index) in experienceKeys" :key="index">
              <!-- Alternating Layout -->
              <div class="relative lg:flex lg:items-center">

                <!-- Timeline Dot (Centered) -->
                <div class="absolute left-1/2 top-8 w-8 h-8 bg-[var(--color-primary)] rounded-full border-4 border-[var(--color-background)] shadow-xl z-10 hidden lg:block transform -translate-x-1/2">
                  <div class="absolute inset-1 bg-[var(--color-primary)]/20 rounded-full animate-pulse"></div>
                </div>

                <!-- Mobile Timeline Dot -->
                <div class="absolute left-0 top-8 w-6 h-6 bg-[var(--color-primary)] rounded-full border-4 border-[var(--color-background)] shadow-lg lg:hidden"></div>

                <!-- Left Side Experience (Even indexes) -->
                <div v-if="index % 2 === 0" :class="['lg:w-1/2 lg:pr-12', 'pl-12 lg:pl-0']">
                  <div class="lg:text-right">
                    <div @click="showPopover(index, $event)"
                      class="group bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl p-8">

                      <!-- Header -->
                      <div class="flex flex-col lg:items-end">
                        <div class="mb-4">
                          <h3 class="text-xl text-[var(--color-text)] font-bold mb-2">
                            {{ t(`experience.positions.${exp.key}.title`) }}
                          </h3>
                          <div class="flex items-center gap-3 mb-3 lg:justify-end">
                            <img :src="exp.image" :alt="t(`experience.positions.${exp.key}.company`)" 
                                 class="w-8 h-8 object-contain rounded-lg bg-white/80 p-1" />
                            <span class="text-base text-[var(--color-primary)] font-semibold">
                              {{ t(`experience.positions.${exp.key}.company`) }}
                            </span>
                          </div>
                          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--color-text-secondary)] lg:justify-end">
                            <div class="flex items-center gap-2">
                              <MapPin class="w-4 h-4" />
                              {{ t(`experience.positions.${exp.key}.location`) }}
                            </div>
                            <div class="flex items-center gap-2">
                              <Calendar class="w-4 h-4" />
                              {{ t(`experience.positions.${exp.key}.period`) }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right Side Experience (Odd indexes) -->
                <div v-else :class="['lg:w-1/2 lg:pl-12 lg:ml-auto', 'pl-12 lg:pl-0']">
                  <div>
                    <div @click="showPopover(index, $event)"
                      class="group bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl p-8">

                      <!-- Header -->
                      <div class="flex flex-col">
                        <div class="mb-4">
                          <h3 class="text-xl text-[var(--color-text)] font-bold mb-2">
                            {{ t(`experience.positions.${exp.key}.title`) }}
                          </h3>
                          <div class="flex items-center gap-3 mb-3">
                            <img :src="exp.image" :alt="t(`experience.positions.${exp.key}.company`)" 
                                 class="w-8 h-8 object-contain rounded-lg bg-white/80 p-1" />
                            <span class="text-base text-[var(--color-primary)] font-semibold">
                              {{ t(`experience.positions.${exp.key}.company`) }}
                            </span>
                          </div>
                          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--color-text-secondary)]">
                            <div class="flex items-center gap-2">
                              <MapPin class="w-4 h-4" />
                              {{ t(`experience.positions.${exp.key}.location`) }}
                            </div>
                            <div class="flex items-center gap-2">
                              <Calendar class="w-4 h-4" />
                              {{ t(`experience.positions.${exp.key}.period`) }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-20">
          <div
            class="inline-block p-8 bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-lg transition-shadow duration-300 rounded-2xl">
            <div class="flex items-center gap-6">
              <div class="p-4 bg-[var(--color-primary)]/10 rounded-2xl">
                <Award class="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <div class="text-left">
                <h3 class="text-xl text-[var(--color-text)] font-semibold mb-2">{{ t('experience.callToAction.title') }}
                </h3>
                <p class="text-base text-[var(--color-text-secondary)] max-w-md">{{
                  t('experience.callToAction.description') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Experience Popover -->
    <Teleport to="body">
      <div v-if="selectedExperience !== null" 
           @click="hidePopover"
           class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div @click.stop 
             class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          
          <!-- Header -->
          <div class="p-8 border-b border-[var(--color-border)]">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-2xl font-bold text-[var(--color-text)] mb-2">
                  {{ t(`experience.positions.${experienceKeys[selectedExperience].key}.title`) }}
                </h3>
                <div class="flex items-center gap-3 mb-3">
                  <img :src="experienceKeys[selectedExperience].image" 
                       :alt="t(`experience.positions.${experienceKeys[selectedExperience].key}.company`)" 
                       class="w-10 h-10 object-contain rounded-lg bg-white/80 p-1.5" />
                  <span class="text-lg text-[var(--color-primary)] font-semibold">
                    {{ t(`experience.positions.${experienceKeys[selectedExperience].key}.company`) }}
                  </span>
                </div>
                <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--color-text-secondary)]">
                  <div class="flex items-center gap-2">
                    <MapPin class="w-4 h-4" />
                    {{ t(`experience.positions.${experienceKeys[selectedExperience].key}.location`) }}
                  </div>
                  <div class="flex items-center gap-2">
                    <Calendar class="w-4 h-4" />
                    {{ t(`experience.positions.${experienceKeys[selectedExperience].key}.period`) }}
                  </div>
                </div>
              </div>
              <button @click="hidePopover" 
                      class="p-2 hover:bg-[var(--color-background)] rounded-full transition-colors">
                <svg class="w-6 h-6 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="p-8 space-y-8">
            <!-- Description -->
            <div>
              <p class="text-base text-[var(--color-text-secondary)] leading-relaxed">
                {{ t(`experience.positions.${experienceKeys[selectedExperience].key}.description`) }}
              </p>
            </div>

            <!-- Achievements -->
            <div>
              <div class="flex items-center gap-3 mb-6">
                <Award class="w-5 h-5 text-[var(--color-primary)]" />
                <h4 class="text-lg font-semibold text-[var(--color-text)]">
                  {{ t('experience.achievements') }}
                </h4>
              </div>
              <ul class="space-y-4">
                <template v-for="(achievement, achIndex) in getAchievements(experienceKeys[selectedExperience].key)" :key="achIndex">
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-2.5 flex-shrink-0"></div>
                    <span class="text-base text-[var(--color-text-secondary)] leading-relaxed">
                      {{ achievement }}
                    </span>
                  </li>
                </template>
              </ul>
            </div>

            <!-- Technologies -->
            <div>
              <h4 class="text-lg font-semibold text-[var(--color-text)] mb-6">
                {{ t('experience.technologiesUsed') }}
              </h4>
              <div class="flex flex-wrap gap-3">
                <template v-for="(tech, techIndex) in getTechnologies(experienceKeys[selectedExperience].key)" :key="techIndex">
                  <span class="px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] font-medium">
                    {{ tech }}
                  </span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>