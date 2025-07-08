<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { useI18n } from 'vue-i18n'
import { Code, Server, Wrench, Users, Star } from 'lucide-vue-next'
import { computed } from 'vue'

const { t, tm } = useI18n()

interface Skill {
  name: string
  core?: boolean
}

interface SkillCategory {
  key: string
  icon: any
  skills: Skill[]
}

const skillCategories = computed((): SkillCategory[] => [
  { key: 'frontend', icon: Code, skills: tm('skills.skills.frontend') as Skill[] },
  { key: 'backend', icon: Server, skills: tm('skills.skills.backend') as Skill[] },
  { key: 'tools', icon: Wrench, skills: tm('skills.skills.tools') as Skill[] },
  { key: 'management', icon: Users, skills: tm('skills.skills.management') as Skill[] },
])

const languages = computed(() => [
  { name: t('skills.languages.french'), level: t('skills.languages.levels.excellent'), flag: '🇫🇷' },
  { name: t('skills.languages.english'), level: t('skills.languages.levels.good'), flag: '🇺🇸' },
  { name: t('skills.languages.malagasy'), level: t('skills.languages.levels.native'), flag: '🇲🇬' },
])

const interests = computed(() => [
  { name: t('skills.interests.volleyball'), icon: '🏐' },
  { name: t('skills.interests.music'), icon: '🎵' },
  { name: t('skills.interests.reading'), icon: '📚' },
])
</script>

<template>
  <section 
    id="skills" 
    class="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8"
    :style="{ backgroundColor: 'var(--color-surface)' }"
  >
    <div class="max-w-6xl mx-auto">
      
      <!-- Section Header -->
      <div class="text-center mb-20">
        <h2 class="text-heading text-[var(--color-text)] mb-6">{{ t('skills.title') }}</h2>
        <p class="text-body-large text-[var(--color-text-secondary)] max-w-3xl mx-auto">{{ t('skills.subtitle') }}</p>
      </div>

      <!-- Technical Skills - Globe Design -->
      <div class="grid md:grid-cols-2 gap-16">
        <template v-for="(category, index) in skillCategories" :key="index">
          <div class="group relative">
            <!-- Category Globe -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 rounded-full flex items-center justify-center text-center p-4 transition-all duration-500 group-hover:scale-110">
              <div class="flex flex-col items-center">
                <component :is="category.icon" class="icon-lg text-[var(--color-primary)] mb-2" />
                <h3 class="text-subheading font-bold text-[var(--color-text)]">
                  {{ t(`skills.categories.${category.key}`) }}
                </h3>
              </div>
            </div>

            <!-- Satellite Skills -->
            <div class="relative w-full h-96">
              <template v-for="(skill, skillIndex) in category.skills" :key="skillIndex">
                <div 
                  class="absolute transition-all duration-300 ease-in-out group-hover:scale-110"
                  :style="{ 
                    top: `calc(50% + ${Math.sin(skillIndex / category.skills.length * 2 * Math.PI) * 160}px - 24px)`,
                    left: `calc(50% + ${Math.cos(skillIndex / category.skills.length * 2 * Math.PI) * 160}px - 48px)`
                  }"
                >
                  <div 
                    class="px-4 py-2 rounded-full shadow-md flex items-center gap-2 cursor-default transition-all duration-200"
                    :class="{
                      'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/70 text-white border-transparent shadow-lg shadow-[var(--color-primary)]/30': skill.core,
                      'bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-text)]': !skill.core
                    }"
                  >
                    <Star v-if="skill.core" class="icon-xs text-yellow-300" />
                    <span 
                      class="text-caption whitespace-nowrap"
                      :class="{ 'font-bold': skill.core, 'font-semibold': !skill.core }"
                    >{{ skill.name }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-20">
        <Card class="inline-block p-8 bg-[var(--color-background)] border border-[var(--color-border)] hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center gap-6">
            <div class="p-4 bg-[var(--color-primary)]/10 rounded-2xl">
              <Code class="icon-xl text-[var(--color-primary)]" />
            </div>
            <div class="text-left">
              <h3 class="text-subheading text-[var(--color-text)] font-semibold mb-2">{{ t('skills.callToAction.title') }}</h3>
              <p class="text-body text-[var(--color-text-secondary)] max-w-md">{{ t('skills.callToAction.description') }}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>