<script setup lang="ts">
import { ref } from 'vue'
import { GraduationCap, MapPin, Calendar, ChevronDown, Award, BookOpen } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
  const courseworkItems = t(`education.degrees.${key}.coursework`)
  if (Array.isArray(courseworkItems)) {
    return courseworkItems.filter(item => typeof item === 'string') as string[]
  }
  return []
}

function getAchievements(key: string): string[] {
  const achievementItems = t(`education.degrees.${key}.achievements`)
  if (Array.isArray(achievementItems)) {
    return achievementItems.filter(item => typeof item === 'string') as string[]
  }
  return []
}

const education: Education[] = degreeKeys.map(({ key }) => ({
  degree: t(`education.degrees.${key}.degree`),
  school: t(`education.degrees.${key}.school`),
  location: t(`education.degrees.${key}.location`),
  period: t(`education.degrees.${key}.period`),
  gpa: t('education.gpaValue'),
  description: t(`education.degrees.${key}.description`),
  coursework: getCoursework(key),
  achievements: getAchievements(key)
}))

const certifications = []
</script>

<template>
  <section 
    id="education" 
    class="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8"
    :style="{ backgroundColor: 'var(--color-surface)' }"
  >
    <div class="max-w-6xl mx-auto">
      
      <!-- Section Header -->
      <div class="text-center mb-20">
        <h2 class="text-heading text-[var(--color-text)] mb-6">{{ t('education.title') }}</h2>
        <p class="text-body-large text-[var(--color-text-secondary)] max-w-3xl mx-auto">{{ t('education.subtitle') }}</p>
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
                <Card
                  @click="toggle(index)"
                  class="group bg-[var(--color-background)] border border-[var(--color-border)] hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <CardContent class="p-8">
                    
                    <!-- Header -->
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div class="mb-4 lg:mb-0">
                        <h3 class="text-subheading text-[var(--color-text)] font-bold mb-2">
                          {{ edu.degree }}
                        </h3>
                        <div class="flex items-center gap-2 mb-3">
                          <span class="text-body text-[var(--color-primary)] font-semibold">
                            {{ edu.school }}
                          </span>
                        </div>
                        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-caption text-[var(--color-text-secondary)]">
                          <div class="flex items-center gap-2">
                            <MapPin class="icon-sm" />
                            {{ edu.location }}
                          </div>
                          <div class="flex items-center gap-2">
                            <Calendar class="icon-sm" />
                            {{ edu.period }}
                          </div>
                        </div>
                      </div>
                      
                      <!-- Toggle Icon -->
                      <div class="flex-shrink-0 lg:ml-6">
                        <ChevronDown :class="['icon-md text-[var(--color-primary)] transition-transform duration-300', expandedIndex === index ? 'rotate-180' : '']" />
                      </div>
                    </div>

                    <!-- Collapsible Details -->
                    <transition name="fade-down">
                      <div v-if="expandedIndex === index" class="mt-8 pt-8 border-t border-[var(--color-border)]">
                        <!-- Description -->
                        <p class="text-body text-[var(--color-text-secondary)] leading-relaxed mb-8">
                          {{ edu.description }}
                        </p>

                        <!-- Coursework -->
                        <div class="mb-8" v-if="edu.coursework.length > 0">
                          <div class="flex items-center gap-3 mb-6">
                            <BookOpen class="icon-md text-[var(--color-primary)]" />
                            <h4 class="text-body-large font-semibold text-[var(--color-text)]">
                              {{ t('education.coursework') }}
                            </h4>
                          </div>
                          <div class="flex flex-wrap gap-3">
                            <template v-for="(course, courseIndex) in edu.coursework" :key="courseIndex">
                              <span class="px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-body text-[var(--color-text)] font-medium">
                                {{ course }}
                              </span>
                            </template>
                          </div>
                        </div>

                        <!-- Achievements -->
                        <div v-if="edu.achievements.length > 0">
                          <div class="flex items-center gap-3 mb-6">
                            <Award class="icon-md text-[var(--color-primary)]" />
                            <h4 class="text-body-large font-semibold text-[var(--color-text)]">
                              {{ t('education.achievements') }}
                            </h4>
                          </div>
                          <ul class="space-y-4">
                            <template v-for="(achievement, achIndex) in edu.achievements" :key="achIndex">
                              <li class="flex items-start gap-3">
                                <div class="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-2.5 flex-shrink-0"></div>
                                <span class="text-body text-[var(--color-text-secondary)] leading-relaxed">
                                  {{ achievement }}
                                </span>
                              </li>
                            </template>
                          </ul>
                        </div>
                      </div>
                    </transition>
                  </CardContent>
                </Card>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-20">
        <Card class="inline-block p-8 bg-[var(--color-background)] border border-[var(--color-border)] hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center gap-6">
            <div class="p-4 bg-[var(--color-primary)]/10 rounded-2xl">
              <GraduationCap class="icon-xl text-[var(--color-primary)]" />
            </div>
            <div class="text-left">
              <h3 class="text-subheading text-[var(--color-text)] font-semibold mb-2">{{ t('education.commitment.title') }}</h3>
              <p class="text-body text-[var(--color-text-secondary)] max-w-md">{{ t('education.commitment.description') }}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template> 