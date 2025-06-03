<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/custom/SectionTitle.vue'

const { t } = useI18n()

interface SkillCategory {
  key: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    key: 'frontend',
    skills: ['JavaScript', 'TypeScript', 'Vue.js', 'Nuxt.js', 'Angular', 'Vuetify', 'Angular Material', 'NgRx', 'Vuex', 'Pinia'],
  },
  {
    key: 'backend',
    skills: ['Node.js', 'Express.js', 'Nest.js', 'Socket.io', 'MongoDB', 'MySQL', 'Firebase', 'DigitalOcean'],
  },
  {
    key: 'tools',
    skills: ['Jest', 'Vitest', 'Nightwatch.js', 'Playwright', 'Git', 'GitHub Projects', 'GitLab', 'Bitbucket'],
  },
  {
    key: 'management',
    skills: ['Jira', 'Trello', 'ClickUp', 'GitHub Projects', 'Agile', 'UML'],
  },
]
</script>

<template>
  <section id="skills" class="py-20 px-4 sm:px-6 lg:px-8 theme-surface transition-colors duration-300">
    <div class="max-w-6xl mx-auto">
      <SectionTitle 
        titleKey="skills.title" 
        subtitleKey="skills.subtitle" 
      />

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <template v-for="(category, index) in skillCategories" :key="index">
          <Card class="theme-bg border-[var(--color-border)] transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle class="theme-text text-lg text-center transition-colors duration-300">{{ t(`skills.categories.${category.key}`) }}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-2">
                <template v-for="(skill, skillIndex) in category.skills" :key="skillIndex">
                  <Badge
                    variant="outline"
                    class="w-full justify-center border-[var(--color-border)] theme-text hover:bg-[var(--color-surface)] hover:text-[var(--color-secondary)] transition-all duration-300 text-xs"
                  >
                    {{ skill }}
                  </Badge>
                </template>
              </div>
            </CardContent>
          </Card>
        </template>
      </div>
    </div>
  </section>
</template>