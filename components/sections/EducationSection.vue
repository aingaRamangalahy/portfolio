<script setup lang="ts">
import { GraduationCap, MapPin, Calendar, ChevronDown, Award, BookOpen } from 'lucide-vue-next'

const { t, tm } = useI18n()
const mounted = ref(false)
const expandedIndex = ref<number | null>(null)

function toggle(index: number) {
  expandedIndex.value = expandedIndex.value === index ? null : index
}

interface Education {
  degree: string
  school: string
  location: string
  period: string
  gpa: string
  description: string
  coursework: string[]
  achievements: string[]
}

interface DegreeKey {
  key: string
}

const degreeKeys: DegreeKey[] = [
  { key: 'masters' },
  { key: 'bachelors' },
]

// Helper functions to get coursework and achievements arrays
function getCoursework(key: string): string[] {
  try {
    const courseworkItems = tm(`education.degrees.${key}.coursework`)
    const result: string[] = []
    
    if (Array.isArray(courseworkItems)) {
      // Handle array of compiled messages
      courseworkItems.forEach((item: any, index: number) => {
        if (typeof item === 'string') {
          result.push(item)
        } else if (item && typeof item === 'object' && item.static) {
          // Handle compiled i18n message objects
          result.push(item.static)
        } else {
          // Fallback: use t() function for individual items
          result.push(t(`education.degrees.${key}.coursework.${index}`))
        }
      })
    } else if (courseworkItems && typeof courseworkItems === 'object') {
      // Handle object with numeric keys
      Object.keys(courseworkItems).forEach((itemKey) => {
        const item = courseworkItems[itemKey]
        if (typeof item === 'string') {
          result.push(item)
        } else if (item && typeof item === 'object' && item.static) {
          result.push(item.static)
        } else {
          result.push(t(`education.degrees.${key}.coursework.${itemKey}`))
        }
      })
    }
    
    return result
  } catch (error) {
    console.warn(`Failed to load coursework for ${key}:`, error)
    return []
  }
}

function getAchievements(key: string): string[] {
  try {
    const achievementItems = tm(`education.degrees.${key}.achievements`)
    const result: string[] = []
    
    if (Array.isArray(achievementItems)) {
      // Handle array of compiled messages
      achievementItems.forEach((item: any, index: number) => {
        if (typeof item === 'string') {
          result.push(item)
        } else if (item && typeof item === 'object' && item.static) {
          // Handle compiled i18n message objects
          result.push(item.static)
        } else {
          // Fallback: use t() function for individual items
          result.push(t(`education.degrees.${key}.achievements.${index}`))
        }
      })
    } else if (achievementItems && typeof achievementItems === 'object') {
      // Handle object with numeric keys
      Object.keys(achievementItems).forEach((itemKey) => {
        const item = achievementItems[itemKey]
        if (typeof item === 'string') {
          result.push(item)
        } else if (item && typeof item === 'object' && item.static) {
          result.push(item.static)
        } else {
          result.push(t(`education.degrees.${key}.achievements.${itemKey}`))
        }
      })
    }
    
    return result
  } catch (error) {
    console.warn(`Failed to load achievements for ${key}:`, error)
    return []
  }
}

const education = computed<Education[]>(() => degreeKeys.map(({ key }) => ({
  degree: t(`education.degrees.${key}.degree`),
  school: t(`education.degrees.${key}.school`),
  location: t(`education.degrees.${key}.location`),
  period: t(`education.degrees.${key}.period`),
  gpa: t('education.gpaValue'),
  description: t(`education.degrees.${key}.description`),
  coursework: getCoursework(key),
  achievements: getAchievements(key)
})))

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <section 
    id="education" 
    class="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    :style="{ backgroundColor: 'var(--color-surface)' }"
  >
    <div class="max-w-6xl mx-auto">
      <div
        :class="[
          'transition-all duration-1000 ease-out',
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        ]"
      >
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-4xl lg:text-5xl text-[var(--color-text)] mb-6 font-semibold">{{ t('education.title') }}</h2>
          <p class="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">{{ t('education.subtitle') }}</p>
          <div class="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/50 mx-auto rounded-full mt-6"></div>
        </div>

        <!-- Education Timeline -->
        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-3 top-0 bottom-0 w-0.5 bg-[var(--color-border)] hidden md:block"></div>
          
          <div class="space-y-8">
            <template v-for="(edu, index) in education" :key="index">
              <div class="relative pl-12 md:pl-0">
                
                <!-- Timeline Dot -->
                <div class="absolute left-0 top-1 w-6 h-6 bg-[var(--color-primary)] rounded-full border-8 border-[var(--color-background)] shadow-lg"></div>
                
                <!-- Education Card -->
                <div class="md:ml-12">
                  <div
                    @click="toggle(index)"
                    class="group bg-[var(--color-background)] border border-[var(--color-border)] hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer rounded-2xl p-8"
                  >
                    
                    <!-- Header -->
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div class="mb-4 lg:mb-0">
                        <h3 class="text-xl text-[var(--color-text)] font-bold mb-2">
                          {{ edu.degree }}
                        </h3>
                        <div class="flex items-center gap-2 mb-3">
                          <span class="text-base text-[var(--color-primary)] font-semibold">
                            {{ edu.school }}
                          </span>
                        </div>
                        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--color-text-secondary)]">
                          <div class="flex items-center gap-2">
                            <MapPin class="w-4 h-4" />
                            {{ edu.location }}
                          </div>
                          <div class="flex items-center gap-2">
                            <Calendar class="w-4 h-4" />
                            {{ edu.period }}
                          </div>
                        </div>
                      </div>
                      
                      <!-- Toggle Icon -->
                      <div class="flex-shrink-0 lg:ml-6">
                        <ChevronDown :class="['w-5 h-5 text-[var(--color-primary)] transition-transform duration-300', expandedIndex === index ? 'rotate-180' : '']" />
                      </div>
                    </div>

                    <!-- Collapsible Details -->
                    <transition name="fade-down">
                      <div v-if="expandedIndex === index" class="mt-8 pt-8 border-t border-[var(--color-border)]">
                        <!-- Description -->
                        <p class="text-base text-[var(--color-text-secondary)] leading-relaxed mb-8">
                          {{ edu.description }}
                        </p>

                        <!-- Coursework -->
                        <div class="mb-8" v-if="edu.coursework.length > 0">
                          <div class="flex items-center gap-3 mb-6">
                            <BookOpen class="w-5 h-5 text-[var(--color-primary)]" />
                            <h4 class="text-lg font-semibold text-[var(--color-text)]">
                              {{ t('education.coursework') }}
                            </h4>
                          </div>
                          <div class="flex flex-wrap gap-3">
                            <template v-for="(course, courseIndex) in edu.coursework" :key="courseIndex">
                              <span class="px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] font-medium">
                                {{ course }}
                              </span>
                            </template>
                          </div>
                        </div>

                        <!-- Achievements -->
                        <div v-if="edu.achievements.length > 0">
                          <div class="flex items-center gap-3 mb-6">
                            <Award class="w-5 h-5 text-[var(--color-primary)]" />
                            <h4 class="text-lg font-semibold text-[var(--color-text)]">
                              {{ t('education.achievements') }}
                            </h4>
                          </div>
                          <ul class="space-y-4">
                            <template v-for="(achievement, achIndex) in edu.achievements" :key="achIndex">
                              <li class="flex items-start gap-3">
                                <div class="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-2.5 flex-shrink-0"></div>
                                <span class="text-base text-[var(--color-text-secondary)] leading-relaxed">
                                  {{ achievement }}
                                </span>
                              </li>
                            </template>
                          </ul>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-20">
          <div class="inline-block p-8 bg-[var(--color-background)] border border-[var(--color-border)] hover:shadow-lg transition-shadow duration-300 rounded-2xl">
            <div class="flex items-center gap-6">
              <div class="p-4 bg-[var(--color-primary)]/10 rounded-2xl">
                <GraduationCap class="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <div class="text-left">
                <h3 class="text-xl text-[var(--color-text)] font-semibold mb-2">{{ t('education.commitment.title') }}</h3>
                <p class="text-base text-[var(--color-text-secondary)] max-w-md">{{ t('education.commitment.description') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>