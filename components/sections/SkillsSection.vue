<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Code, Server, Wrench, Users, Star, Sparkles } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const mounted = ref(false)
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

const skillCategories = computed((): SkillCategory[] => {
  const getSkills = (key: string): Skill[] => {
    try {
      // Multiple approaches to get skills data
      const result: Skill[] = []

      // Approach 1: Try tm() to get compiled messages
      try {
        const skills = tm(`skills.skills.${key}`)

        // Helper function to recursively extract text from any nested structure
        const extractText = (item: any): string | null => {
          if (typeof item === 'string') {
            return item
          }

          if (item && typeof item === 'object') {
            // Try different possible paths to the actual text
            const possiblePaths = [
              item.static,
              item.body?.static,
              item.body?.items?.[0],
              item.name,
              item.value,
              item.text
            ]

            for (const path of possiblePaths) {
              if (typeof path === 'string') {
                return path
              }
            }

            // If it's an object with nested structure, try to find any string value
            if (typeof item === 'object') {
              const findString = (obj: any): string | null => {
                for (const value of Object.values(obj)) {
                  if (typeof value === 'string') {
                    return value
                  }
                  if (typeof value === 'object' && value !== null) {
                    const nested = findString(value)
                    if (nested) return nested
                  }
                }
                return null
              }
              return findString(item)
            }
          }

          return null
        }

        if (Array.isArray(skills)) {
          // Handle array format
          skills.forEach((item: any, index: number) => {
            const text = extractText(item)
            if (text) {
              result.push({
                name: text,
                core: Boolean(item?.core || item?.body?.core || item?.static?.core)
              })
            }
          })
        } else if (skills && typeof skills === 'object') {
          // Handle object format
          Object.entries(skills).forEach(([itemKey, item]) => {
            const text = extractText(item)
            if (text) {
              result.push({
                name: text,
                core: Boolean(item?.core || item?.body?.core || item?.static?.core)
              })
            }
          })
        }
      } catch (e) {
        console.warn(`tm() approach failed for ${key}:`, e)
      }

      // Approach 2: If no results from tm(), try direct t() calls
      if (result.length === 0) {
        console.log(`Trying direct t() calls for ${key}`)
        for (let i = 0; i < 50; i++) { // Try up to 50 skills per category
          try {
            const skillTranslation = t(`skills.skills.${key}.${i}`)
            if (typeof skillTranslation === 'string' && skillTranslation !== `skills.skills.${key}.${i}`) {
              result.push({ name: skillTranslation })
            } else {
              break // No more skills in this category
            }
          } catch (e) {
            break
          }
        }
      }

      // Approach 3: Try alternative key structures
      if (result.length === 0) {
        console.log(`Trying alternative structures for ${key}`)
        const alternativeKeys = [
          `skills.${key}`,
          `${key}.skills`,
          `${key}`
        ]

        for (const altKey of alternativeKeys) {
          try {
            const altSkills = tm(altKey)
            if (Array.isArray(altSkills)) {
              altSkills.forEach((item: any) => {
                if (typeof item === 'string') {
                  result.push({ name: item })
                } else if (item && typeof item === 'object' && item.static) {
                  result.push({ name: item.static, core: item.core })
                }
              })
              if (result.length > 0) break
            }
          } catch (e) {
            // Continue to next alternative
          }
        }
      }

      // Approach 4: Hardcoded fallback for common skills (temporary)
      if (result.length === 0) {
        console.warn(`No skills found for ${key}, using fallback`)
        const fallbackSkills: Record<string, Skill[]> = {
          frontend: [
            { name: 'Vue.js', core: true },
            { name: 'React', core: true },
            { name: 'TypeScript', core: true },
            { name: 'JavaScript', core: true },
            { name: 'HTML5', core: false },
            { name: 'CSS3', core: false },
            { name: 'Tailwind CSS', core: false }
          ],
          backend: [
            { name: 'Node.js', core: true },
            { name: 'Express.js', core: true },
            { name: 'NestJS', core: true },
            { name: 'PostgreSQL', core: false },
            { name: 'MongoDB', core: false },
            { name: 'Redis', core: false }
          ],
          tools: [
            { name: 'Git', core: true },
            { name: 'Docker', core: true },
            { name: 'VS Code', core: false },
            { name: 'Postman', core: false }
          ],
          management: [
            { name: 'Agile', core: true },
            { name: 'Scrum', core: true },
            { name: 'Team Leadership', core: false }
          ]
        }

        return fallbackSkills[key] || []
      }

      console.log(`Final processed skills for ${key}:`, result)
      return result

    } catch (error) {
      console.warn(`Failed to load skills for ${key}:`, error)
      return []
    }
  }

  return [
    { key: 'frontend', icon: Code, skills: getSkills('frontend') },
    { key: 'backend', icon: Server, skills: getSkills('backend') },
    { key: 'tools', icon: Wrench, skills: getSkills('tools') },
    { key: 'management', icon: Users, skills: getSkills('management') },
  ]
})

const coreSkills = (category: SkillCategory) => {
  if (!Array.isArray(category.skills)) return []
  return category.skills.filter(s => s.core)
}

const otherSkills = (category: SkillCategory) => {
  if (!Array.isArray(category.skills)) return []
  return category.skills.filter(s => !s.core)
}

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

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <section id="skills" class="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    :style="{ backgroundColor: 'var(--color-surface)' }">
    <div class="max-w-6xl mx-auto">
      <div :class="[
        'transition-all duration-1000 ease-out',
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      ]">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl lg:text-5xl text-[var(--color-text)] mb-6 font-semibold">{{ t('skills.title')
          }}</h2>
          <p class="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">{{ t('skills.subtitle') }}</p>
          <div
            class="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/50 mx-auto rounded-full mt-6">
          </div>
        </div>

        <!-- Technical Skills - Simple List with Enhanced Typography -->
        <div class="max-w-4xl mx-auto space-y-12">
          <div v-for="category in visibleCategories" :key="category.key" class="group">
            <!-- Category Header -->
            <div class="flex items-center gap-4 mb-8">
              <div class="flex items-center gap-3">
                <component :is="category.icon" class="w-7 h-7 text-[var(--color-primary)]" />
                <h3 class="text-2xl font-bold text-[var(--color-text)] tracking-tight">
                  {{ t(`skills.categories.${category.key}`) }}
                </h3>
              </div>
              <div class="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent"></div>
            </div>

            <!-- Category Description -->
            <p class="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed max-w-3xl">
              {{ t(`skills.descriptions.${category.key}`) }}
            </p>

            <!-- Skills Lists -->
            <div class="space-y-8">
              <template v-if="coreSkills(category).length > 0">
                <!-- Core Skills -->
                <div>
                  <div class="flex items-center gap-2 mb-6">
                    <Sparkles class="w-5 h-5 text-[var(--color-primary)]" />
                    <h4 class="text-lg font-semibold text-[var(--color-text)] tracking-wide">
                      {{ t('skills.coreTitle') }}
                    </h4>
                  </div>

                  <ul class="space-y-3">
                    <li v-for="skill in coreSkills(category)" :key="skill.name" class="flex items-center group/skill">
                      <span class="w-2 h-2 bg-[var(--color-primary)] rounded-full mr-4 flex-shrink-0 
                                   group-hover/skill:scale-125 transition-transform duration-200"></span>
                      <span class="text-lg font-medium text-[var(--color-text)] 
                                   group-hover/skill:text-[var(--color-primary)] transition-colors duration-200">
                        {{ skill.name }}
                      </span>
                    </li>
                  </ul>
                </div>

                <!-- Additional Skills -->
                <template v-if="showAllSkills && otherSkills(category).length > 0">
                  <div class="pt-6 border-t border-[var(--color-border)]/50">
                    <h4 class="text-base font-medium text-[var(--color-text-secondary)] mb-6 uppercase tracking-wider">
                      {{ t('skills.additionalTitle') }}
                    </h4>

                    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                      <li v-for="skill in otherSkills(category)" :key="skill.name"
                        class="flex items-center group/skill">
                        <span
                          class="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full mr-3 flex-shrink-0 
                                     group-hover/skill:bg-[var(--color-primary)] transition-colors duration-200"></span>
                        <span class="text-base text-[var(--color-text-secondary)] 
                                     group-hover/skill:text-[var(--color-text)] transition-colors duration-200">
                          {{ skill.name }}
                        </span>
                      </li>
                    </ul>
                  </div>
                </template>
              </template>

              <template v-else>
                <!-- All skills when no core skills defined -->
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                  <li v-for="skill in otherSkills(category)" :key="skill.name" class="flex items-center group/skill">
                    <span class="w-2 h-2 bg-[var(--color-primary)] rounded-full mr-4 flex-shrink-0 
                                 group-hover/skill:scale-125 transition-transform duration-200"></span>
                    <span class="text-lg font-medium text-[var(--color-text)] 
                                 group-hover/skill:text-[var(--color-primary)] transition-colors duration-200">
                      {{ skill.name }}
                    </span>
                  </li>
                </ul>
              </template>
            </div>
          </div>
        </div>

        <!-- Toggle Button with Enhanced Design -->
        <div class="text-center mt-16">
          <button @click="showAllSkills = !showAllSkills"
            class="group px-8 py-6 text-lg font-semibold border-2 border-[var(--color-primary)]/30 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-300 rounded-xl bg-[var(--color-background)] text-[var(--color-text)] flex items-center gap-2 mx-auto">
            <Sparkles
              class="w-4 h-4 text-[var(--color-primary)] group-hover:rotate-12 transition-transform duration-300" />
            {{ showAllSkills ? t('skills.showLess') : t('skills.showMore') }}
            <span class="ml-2 transition-transform duration-300 text-[var(--color-primary)]"
              :class="{ 'rotate-180': showAllSkills }">↓</span>
          </button>

          <p v-if="!showAllSkills && hasHiddenCategories" class="text-sm text-[var(--color-text-secondary)] mt-4">
            {{ t('skills.hiddenCategoriesMessage') }}
          </p>
        </div>

        <!-- Call to Action with Enhanced Design -->
        <div class="text-center mt-20">
          <div
            class="inline-block p-8 bg-gradient-to-r from-[var(--color-background)] to-[var(--color-background)]/80 border border-[var(--color-border)] hover:shadow-xl hover:border-[var(--color-primary)]/40 transition-all duration-300 group rounded-2xl">
            <div class="flex items-center gap-6">
              <div
                class="p-4 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Code class="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <div class="text-left">
                <h3
                  class="text-xl text-[var(--color-text)] font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  {{ t('skills.callToAction.title') }}
                </h3>
                <p class="text-base text-[var(--color-text-secondary)] max-w-md leading-relaxed">
                  {{ t('skills.callToAction.description') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>