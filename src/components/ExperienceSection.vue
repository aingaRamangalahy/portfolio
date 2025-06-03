<script setup lang="ts">
import { computed } from 'vue'
import { Calendar, MapPin } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/custom/SectionTitle.vue'

const { t, tm } = useI18n()

interface Experience {
  key: string
  tech: string[]
}

const experienceKeys: Experience[] = [
  {
    key: 'angular_dev',
    tech: ['Angular 11', 'NgRx', 'Firebase', 'GitLab', 'ClickUp'],
  },
  {
    key: 'fullstack_js',
    tech: ['Vue.js', 'Nuxt.js', 'Vuetify', 'Pinia', 'Vuex', 'Node.js', 'Express', 'MongoDB', 'Vitest', 'Nightwatch.js'],
  },
  {
    key: 'angular_node',
    tech: ['Angular', 'NgRx', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Angular Material', 'Trello'],
  },
  {
    key: 'web_dev',
    tech: ['PHP', 'Bootstrap', 'jQuery', 'HTML', 'CSS'],
  },
]

// Helper function to get achievements array
function getAchievements(key: string): string[] {
  const achievementItems = tm(`experience.positions.${key}.achievements`)
  if (Array.isArray(achievementItems)) {
    return achievementItems.filter(item => typeof item === 'string') as string[]
  }
  return []
}
</script>

<template>
  <section 
    id="experience" 
    class="py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }"
  >
    <div class="max-w-6xl mx-auto">
      <SectionTitle 
        titleKey="experience.title" 
        subtitleKey="experience.subtitle" 
      />

      <div class="space-y-12">
        <template v-for="(exp, index) in experienceKeys" :key="index">
          <Card 
            class="transition-all duration-300 hover:shadow-lg overflow-hidden border"
            :style="{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }"
          >
            <CardContent class="p-8">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div class="mb-4 md:mb-0">
                  <h3 
                    class="text-2xl font-bold transition-colors duration-300"
                    :style="{ color: 'var(--color-primary)' }"
                  >{{ t(`experience.positions.${exp.key}.title`) }}</h3>
                  <p 
                    class="text-xl font-semibold transition-colors duration-300"
                    :style="{ color: 'var(--color-accent)' }" 
                  >{{ t(`experience.positions.${exp.key}.company`) }}</p>
                  <p 
                    class="text-sm transition-colors duration-300"
                    :style="{ color: 'var(--color-text-secondary)' }"
                  >{{ t(`experience.positions.${exp.key}.location`) }}</p>
                </div>
                <div class="flex-shrink-0">
                  <span 
                    class="inline-block px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 border"
                    :style="{ backgroundColor: 'var(--color-accent)', color: 'var(--color-background)', borderColor: 'var(--color-border)' }"
                  >
                    {{ t(`experience.positions.${exp.key}.period`) }}
                  </span>
                </div>
              </div>

              <p 
                class="mb-6 leading-relaxed transition-colors duration-300"
                :style="{ color: 'var(--color-text-secondary)' }"
              >
                {{ t(`experience.positions.${exp.key}.description`) }}
              </p>

              <div>
                <h4 
                  class="font-semibold mb-3 transition-colors duration-300"
                  :style="{ color: 'var(--color-primary)' }"
                >{{ t('experience.achievements') }}</h4>
                <ul class="space-y-2">
                  <template v-for="(achievement, achIndex) in getAchievements(exp.key)" :key="achIndex">
                    <li class="flex items-start gap-3">
                      <div 
                        class="w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-colors duration-300"
                        :style="{ backgroundColor: 'var(--color-accent)' }" 
                      ></div>
                      <span 
                        class="leading-relaxed transition-colors duration-300"
                        :style="{ color: 'var(--color-text-secondary)' }"
                      >{{ achievement }}</span>
                    </li>
                  </template>
                </ul>
              </div>

              <div class="flex flex-wrap gap-2 mt-4">
                <template v-for="(tech, techIndex) in exp.tech" :key="techIndex">
                  <Badge 
                    variant="outline" 
                    class="transition-colors duration-300 hover:opacity-80 border"
                    :style="{
                      borderColor: 'var(--color-accent)', 
                      color: 'var(--color-accent)',
                      backgroundColor: 'transparent' 
                    }"
                  >
                    {{ tech }}
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