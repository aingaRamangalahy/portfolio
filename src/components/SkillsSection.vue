<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from 'vue-i18n'
import { Code, Server, Wrench, Users, Star, Sparkles } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import FloatingIcons from '@/components/custom/FloatingIcons.vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Technology icons
import VueIcon from '@/components/icons/vue.js.vue'
import TypeScriptIcon from '@/components/icons/typescript.vue'
import JavaScriptIcon from '@/components/icons/javascript.vue'
import NodeIcon from '@/components/icons/node.vue'
import AngularIcon from '@/components/icons/angular.vue'
import MongoDBIcon from '@/components/icons/mongodb.vue'

const { t, tm } = useI18n()
const showAllSkills = ref(false)

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

// Function to get technology icon component
function getTechIcon(skillName: string) {
  const iconMap: Record<string, any> = {
    'Vue.js': VueIcon,
    'TypeScript': TypeScriptIcon,
    'JavaScript': JavaScriptIcon,
    'Node.js': NodeIcon,
    'Angular': AngularIcon,
    'MongoDB': MongoDBIcon,
  }
  return iconMap[skillName] || null
}

const coreSkills = (category: SkillCategory) => category.skills.filter(s => s.core)
const otherSkills = (category: SkillCategory) => category.skills.filter(s => !s.core)

// Filter categories based on showAllSkills state
const visibleCategories = computed(() => {
  if (showAllSkills.value) {
    return skillCategories.value
  }
  // Only show categories that have core skills
  return skillCategories.value.filter(category => coreSkills(category).length > 0)
})

const hasHiddenCategories = computed(() => {
  return skillCategories.value.some(category => coreSkills(category).length === 0)
})
</script>

<template>
  <section 
    id="skills" 
    class="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    :style="{ backgroundColor: 'var(--color-surface)' }"
  >
    <FloatingIcons />
    <div class="max-w-6xl mx-auto">
      
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-heading text-[var(--color-text)] mb-6">{{ t('skills.title') }}</h2>
        <p class="text-body-large text-[var(--color-text-secondary)] max-w-3xl mx-auto">{{ t('skills.subtitle') }}</p>
      </div>

      <!-- Technical Skills - Enhanced Design -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card 
          v-for="category in visibleCategories" 
          :key="category.key" 
          class="group bg-[var(--color-background)] border border-[var(--color-border)] hover:shadow-xl hover:border-[var(--color-primary)]/30 transition-all duration-300 flex flex-col relative overflow-hidden"
        >
          <!-- Subtle gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <CardHeader class="flex-row items-center gap-4 pb-4 relative z-10">
            <div class=" flex items-center gap-2 p-3 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <component :is="category.icon" class="icon-lg text-[var(--color-primary)]" />
              <CardTitle class="text-subheading font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {{ t(`skills.categories.${category.key}`) }}
              </CardTitle>
            </div>
            
          </CardHeader>
          
          <CardContent class="flex-grow pt-4 relative z-10">
            <p class="text-body text-[var(--color-text-secondary)] mb-6 leading-relaxed">{{ t(`skills.descriptions.${category.key}`) }}</p>

            <template v-if="coreSkills(category).length > 0">
              <!-- Core Skills with Enhanced Design -->
              <div class="space-y-4">
                <div class="flex items-center gap-2 mb-4">
                  <Sparkles class="icon-sm text-[var(--color-primary)]" />
                  <span class="text-sm font-semibold text-[var(--color-text)] uppercase tracking-wider">{{ t('skills.coreTitle') }}</span>
                </div>
                
                <div class="flex flex-wrap gap-3">
                  <template v-for="skill in coreSkills(category)" :key="skill.name">
                    <Badge 
                      variant="default" 
                      class="group/badge px-4 py-2.5 text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border border-[var(--color-primary)]/20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90"
                    >
                      <div class="flex items-center gap-2">
                        <!-- Technology Icon -->
                        <component 
                          v-if="getTechIcon(skill.name)" 
                          :is="getTechIcon(skill.name)" 
                          class="w-4 h-4 opacity-90 group-hover/badge:opacity-100 transition-opacity duration-300" 
                        />
                        <!-- Star icon for skills without custom icons -->
                        <Star 
                          v-else
                          class="icon-xs text-yellow-300 group-hover/badge:text-yellow-200 transition-colors duration-300" 
                        />
                        <span class="text-white font-medium">{{ skill.name }}</span>
                      </div>
                    </Badge>
                  </template>
                </div>
              </div>

              <!-- Other Skills -->
              <template v-if="showAllSkills && otherSkills(category).length > 0">
                <div class="mt-8 pt-6 border-t border-[var(--color-border)]">
                  <div class="flex items-center gap-2 mb-4">
                    <span class="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">{{ t('skills.additionalTitle') }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <template v-for="skill in otherSkills(category)" :key="skill.name">
                      <Badge 
                        variant="secondary" 
                        class="px-3 py-1.5 cursor-pointer transition-all duration-300 hover:bg-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/40 border border-transparent"
                      >
                        {{ skill.name }}
                      </Badge>
                    </template>
                  </div>
                </div>
              </template>
            </template>
            <template v-else>
              <!-- Directly show all skills if no core skills -->
              <div class="flex flex-wrap gap-2">
                <template v-for="skill in otherSkills(category)" :key="skill.name">
                  <Badge 
                    variant="secondary" 
                    class="px-3 py-1.5 cursor-pointer transition-all duration-300 hover:bg-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/40 border border-transparent"
                  >
                    {{ skill.name }}
                  </Badge>
                </template>
              </div>
            </template>
          </CardContent>
        </Card>
      </div>
      
      <!-- Toggle Button with Enhanced Design -->
      <div class="text-center mt-16">
        <Button 
          @click="showAllSkills = !showAllSkills" 
          variant="outline" 
          class="group px-8 py-6 text-lg font-semibold border-2 border-[var(--color-primary)]/30 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-300"
        >
          <Sparkles class="icon-sm mr-2 text-[var(--color-primary)] group-hover:rotate-12 transition-transform duration-300" />
          {{ showAllSkills ? t('skills.showLess') : t('skills.showMore') }}
          <span class="ml-2 transition-transform duration-300 text-[var(--color-primary)]" :class="{ 'rotate-180': showAllSkills }">↓</span>
        </Button>
        
        <p v-if="!showAllSkills && hasHiddenCategories" class="text-sm text-[var(--color-text-secondary)] mt-4">
          {{ t('skills.hiddenCategoriesMessage') }}
        </p>
      </div>

      <!-- Call to Action with Enhanced Design -->
      <div class="text-center mt-20">
        <Card class="inline-block p-8 bg-gradient-to-r from-[var(--color-background)] to-[var(--color-background)]/80 border border-[var(--color-border)] hover:shadow-xl hover:border-[var(--color-primary)]/40 transition-all duration-300 group">
          <div class="flex items-center gap-6">
            <div class="p-4 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Code class="icon-xl text-[var(--color-primary)]" />
            </div>
            <div class="text-left">
              <h3 class="text-subheading text-[var(--color-text)] font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {{ t('skills.callToAction.title') }}
              </h3>
              <p class="text-body text-[var(--color-text-secondary)] max-w-md leading-relaxed">
                {{ t('skills.callToAction.description') }}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>