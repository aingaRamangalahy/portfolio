<script setup lang="ts">
import { ExternalLink, Github, Code, Globe, Database, Smartphone, Monitor, BarChart, User } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/custom/SectionTitle.vue'

const { t } = useI18n()

interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  live: string
  featured: boolean
}

interface ProjectKey {
  key: string
  icon: any
  category: string,
  hasUrl: boolean,
  hasGithub: boolean,
  githubUrl?: string,
  url?: string
}

const projectKeys: ProjectKey[] = [
  { key: 'kair', icon: Monitor, category: 'Web App', hasUrl: false, hasGithub: false },
  { key: 'js_resources', icon: Code, category: 'Website', hasUrl: true, hasGithub: true, githubUrl: 'https://github.com/aingaRamangalahy/jsr', url: 'https://jsresources.dev' },
  { key: 'portfolio', icon: User, category: 'Website', hasUrl: true, hasGithub: true, githubUrl: 'https://github.com/aingaRamangalahy/portfolio', url: 'https://ainga-dev.vercel.app/' },
  { key: 'earth_observation', icon: Globe, category: 'Web App', hasUrl: false, hasGithub: false },
  { key: 'crowdfunding', icon: BarChart, category: 'Web App', hasUrl: false, hasGithub: false },
  { key: 'asset_manager', icon: Database, category: 'Web App', hasUrl: false, hasGithub: false },
  { key: 'conference', icon: Monitor, category: 'Web App', hasUrl: false, hasGithub: false },
  { key: 'dashboard', icon: BarChart, category: 'Dashboard', hasUrl: false, hasGithub: false },
]
</script>

<template>
  <section id="projects" class="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-background)] transition-colors duration-300">
    <div class="max-w-6xl mx-auto">
      <SectionTitle 
        titleKey="projects.title" 
        subtitleKey="projects.subtitle" 
      />

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <template v-for="(project, index) in projectKeys" :key="index">
          <Card class="group bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col">
            <CardContent class="p-6 flex flex-col flex-grow">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <component :is="project.icon" class="w-6 h-6 text-[var(--color-primary)] transition-colors duration-300" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-[var(--color-text)] transition-colors duration-300">{{ t(`projects.items.${project.key}.title`) }}</h3>
                </div>
              </div>
              
              <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed transition-colors duration-300 flex-grow">
                {{ t(`projects.items.${project.key}.description`) }}
              </p>

              <div class="mt-4 pt-4 border-t border-[var(--color-border)] transition-colors duration-300">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] transition-colors duration-300">
                    <component :is="project.icon" class="w-4 h-4" />
                    <span>{{ project.category }}</span>
                  </div>
                  <div class="flex gap-2">
                    <Button v-if="project.hasGithub" variant="ghost" size="icon" class="w-8 h-8 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-primary)]/10 transition-colors duration-300 cursor-pointer" @click="openGithub(project.githubUrl)">
                      <Github class="w-4 h-4" />
                    </Button>
                    <Button v-if="project.hasUrl" variant="ghost" size="icon" class="w-8 h-8 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-primary)]/10 transition-colors duration-300 cursor-pointer" @click="openUrl(project.url)">
                      <ExternalLink class="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </template>
      </div>
    </div>
  </section>
</template> 