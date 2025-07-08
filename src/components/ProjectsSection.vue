<script setup lang="ts">
import { ref, computed } from 'vue'
import { ExternalLink, Github, Code, Globe, Database, Smartphone, Monitor, BarChart, User, ChevronDown, Briefcase } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const expandedIndex = ref<number | null>(null)

interface ProjectKey {
  key: string
  icon: any
  hasUrl: boolean,
  hasGithub: boolean,
  githubUrl?: string,
  url?: string
}

const projectKeys = computed((): ProjectKey[] => [
  { key: 'kair', icon: Monitor, hasUrl: false, hasGithub: false },
  { key: 'js_resources', icon: Code, hasUrl: true, hasGithub: true, githubUrl: 'https://github.com/aingaRamangalahy/jsr', url: 'https://jsresources.dev' },
  { key: 'portfolio', icon: User, hasUrl: true, hasGithub: true, githubUrl: 'https://github.com/aingaRamangalahy/portfolio', url: 'https://www.ainga.me' },
  { key: 'earth_observation', icon: Globe, hasUrl: false, hasGithub: false },
  { key: 'crowdfunding', icon: BarChart, hasUrl: false, hasGithub: false },
  { key: 'asset_manager', icon: Database, hasUrl: false, hasGithub: false },
  { key: 'conference', icon: Monitor, hasUrl: false, hasGithub: false },
  { key: 'dashboard', icon: BarChart, hasUrl: false, hasGithub: false },
])

function getTech(key: string): string[] {
  const techItems = tm(`projects.items.${key}.tech`)
  if (Array.isArray(techItems)) {
    return techItems.filter(item => typeof item === 'string') as string[]
  }
  return []
}

function toggle(index: number) {
  expandedIndex.value = expandedIndex.value === index ? null : index
}

function openUrl(url?: string) {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<template>
  <section 
    id="projects" 
    class="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8"
    :style="{ backgroundColor: 'var(--color-surface)' }"
  >
    <div class="max-w-4xl mx-auto">
      
      <!-- Section Header -->
      <div class="text-center mb-20">
        <h2 class="text-heading text-[var(--color-text)] mb-6">{{ t('projects.title') }}</h2>
        <p class="text-body-large text-[var(--color-text-secondary)] max-w-3xl mx-auto">{{ t('projects.subtitle') }}</p>
      </div>

      <!-- Unified Project List -->
      <div class="space-y-4">
        <template v-for="(project, index) in projectKeys" :key="index">
          <Card 
            @click="toggle(index)"
            class="group bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <CardContent class="p-6">
              <div class="flex items-start gap-6">
                
                <!-- Icon and Title Row -->
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div class="p-3 bg-[var(--color-primary)]/10 rounded-xl">
                        <component :is="project.icon" class="icon-lg text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <h3 class="text-subheading text-[var(--color-text)] font-bold">
                          {{ t(`projects.items.${project.key}.title`) }}
                        </h3>
                        <div class="flex items-center gap-2">
                          <span class="text-caption text-[var(--color-text-secondary)]">{{ t(`projects.items.${project.key}.category`) }}</span>
                          <div v-if="t(`projects.items.${project.key}.type`) === 'personal'" class="flex items-center gap-1 text-[var(--color-primary)]">
                            <span class="text-caption">•</span>
                            <User class="icon-sm" />
                            <span class="text-caption font-semibold">{{ t('projects.types.personal') }}</span>
                          </div>
                          <div v-if="t(`projects.items.${project.key}.type`) === 'professional'" class="flex items-center gap-1 text-sky-500">
                            <span class="text-caption">•</span>
                            <Briefcase class="icon-sm" />
                            <span class="text-caption font-semibold">{{ t('projects.types.professional') }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Toggle Icon -->
                    <ChevronDown :class="['icon-md text-[var(--color-primary)] transition-transform duration-300', expandedIndex === index ? 'rotate-180' : '']" />
                  </div>
                </div>
              </div>
              
              <!-- Collapsible Details -->
              <transition name="fade-down">
                <div v-if="expandedIndex === index" class="mt-6 pt-6 border-t border-[var(--color-border)]">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Description (left) -->
                    <div class="md:col-span-2">
                      <p class="text-body text-[var(--color-text-secondary)] leading-relaxed">
                        {{ t(`projects.items.${project.key}.description`) }}
                      </p>
                    </div>
                    <!-- Tech and Actions (right) -->
                    <div class="space-y-6">
                      <!-- Tech Used -->
                      <div>
                        <h4 class="text-body font-semibold text-[var(--color-text)] mb-3">{{ t('projects.techStack') }}</h4>
                        <div class="flex flex-wrap gap-2">
                          <template v-for="(tech, techIndex) in getTech(project.key)" :key="techIndex">
                            <span class="px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md text-caption text-[var(--color-text-secondary)] font-medium">
                              {{ tech }}
                            </span>
                          </template>
                        </div>
                      </div>
                      <!-- Actions -->
                      <div class="flex items-center gap-3">
                        <Button 
                          v-if="project.hasUrl" 
                          @click.stop="openUrl(project.url)"
                          class="flex-1 bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-primary)]/90 rounded-xl py-3 text-body font-semibold transition-all duration-200"
                        >
                          <ExternalLink class="icon-sm mr-2" />
                          {{ t('projects.live') }}
                        </Button>
                        <Button 
                          v-if="project.hasGithub" 
                          @click.stop="openUrl(project.githubUrl)"
                          variant="outline"
                          class="px-4 py-3 border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] rounded-xl transition-all duration-200"
                        >
                          <Github class="icon-sm" />
                        </Button>
                        <div v-if="!project.hasUrl && !project.hasGithub" class="flex-1 text-center px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-caption text-[var(--color-text-secondary)]">
                          {{ t('projects.private') }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </CardContent>
          </Card>
        </template>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-20">
        <Card class="inline-block p-8 bg-[var(--color-background)] border border-[var(--color-border)] hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center gap-6">
            <div class="p-4 bg-[var(--color-primary)]/10 rounded-2xl">
              <Github class="icon-xl text-[var(--color-primary)]" />
            </div>
            <div class="text-left">
              <h3 class="text-subheading text-[var(--color-text)] font-semibold mb-2">{{ t('projects.callToAction.title') }}</h3>
              <p class="text-body text-[var(--color-text-secondary)] max-w-md">{{ t('projects.callToAction.description') }}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>