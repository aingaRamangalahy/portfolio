<script setup lang="ts">
import { ExternalLink, Github, Code, Globe, Database, Monitor, BarChart, User, ChevronDown, Briefcase, Image as ImageIcon } from 'lucide-vue-next'

const { t, tm } = useI18n()
const mounted = ref(false)
const selectedProject = ref<number | null>(null)

interface ProjectKey {
  key: string
  icon: any
  hasUrl: boolean,
  hasGithub: boolean,
  githubUrl?: string,
  url?: string,
  images?: string[]
}

const projectKeys = computed((): ProjectKey[] => [
  {
    key: 'kair',
    icon: Monitor,
    hasUrl: false,
    hasGithub: false,
    images: ['/images/kair.png']
  },
  {
    key: 'js_resources',
    icon: Code,
    hasUrl: true,
    hasGithub: true,
    githubUrl: 'https://github.com/aingaRamangalahy/jsr',
    url: 'https://jsresources.dev',
    images: ['/images/jsr.png']
  },
  {
    key: 'portfolio',
    icon: User,
    hasUrl: true,
    hasGithub: true,
    githubUrl: 'https://github.com/aingaRamangalahy/portfolio',
    url: 'https://www.ainga.me',
    images: ['/images/portfolio.png']
  },
  {
    key: 'earth_observation',
    icon: Globe,
    hasUrl: false,
    hasGithub: false,
    images: ['/images/promethee.png']
  },
  {
    key: 'crowdfunding',
    icon: BarChart,
    hasUrl: false,
    hasGithub: false,
    images: ['/images/collecticity.png']
  },
  {
    key: 'asset_manager',
    icon: Database,
    hasUrl: false,
    hasGithub: false
  },
  {
    key: 'conference',
    icon: Monitor,
    hasUrl: false,
    hasGithub: false
  },
  {
    key: 'dashboard',
    icon: BarChart,
    hasUrl: false,
    hasGithub: false
  },
])

function getTech(key: string): string[] {
  try {
    const techItems = tm(`projects.items.${key}.tech`)
    const result: string[] = []
    
    if (Array.isArray(techItems)) {
      // Handle array of compiled messages
      techItems.forEach((item: any, index: number) => {
        if (typeof item === 'string') {
          result.push(item)
        } else if (item && typeof item === 'object') {
          // Handle compiled i18n message objects - check for static property or body.static
          if (item.static && typeof item.static === 'string') {
            result.push(item.static)
          } else if (item.body && item.body.static && typeof item.body.static === 'string') {
            result.push(item.body.static)
          } else {
            // Fallback: use t() function for individual items
            const translatedItem = t(`projects.items.${key}.tech.${index}`)
            if (translatedItem && typeof translatedItem === 'string') {
              result.push(translatedItem)
            }
          }
        }
      })
    } else if (techItems && typeof techItems === 'object') {
      // Handle object with numeric keys
      Object.keys(techItems).forEach((itemKey) => {
        const item = techItems[itemKey]
        if (typeof item === 'string') {
          result.push(item)
        } else if (item && typeof item === 'object') {
          if (item.static && typeof item.static === 'string') {
            result.push(item.static)
          } else if (item.body && item.body.static && typeof item.body.static === 'string') {
            result.push(item.body.static)
          } else {
            const translatedItem = t(`projects.items.${key}.tech.${itemKey}`)
            if (translatedItem && typeof translatedItem === 'string') {
              result.push(translatedItem)
            }
          }
        }
      })
    }
    
    return result
  } catch (error) {
    console.warn(`Failed to load technologies for ${key}:`, error)
    return []
  }
}

function showPopover(index: number) {
  selectedProject.value = index
}

function hidePopover() {
  selectedProject.value = null
}

function openUrl(url?: string) {
  if (url) {
    navigateTo(url, { external: true, open: { target: '_blank' } })
  }
}

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <section 
    id="projects" 
    class="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    :style="{ backgroundColor: 'var(--color-background)' }"
    :aria-labelledby="projectsTitle"
    role="region">
    <div class="max-w-4xl mx-auto">
      <div :class="[
        'transition-all duration-1000 ease-out',
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      ]">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 id="projectsTitle" class="text-3xl md:text-4xl lg:text-5xl text-[var(--color-text)] mb-6 font-semibold">{{
            t('projects.title') }}</h2>
          <p class="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">{{ t('projects.subtitle') }}</p>
          <div
            class="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/50 mx-auto rounded-full mt-6"
            aria-hidden="true">
          </div>
        </div>

        <!-- Project Cards Masonry Grid -->
        <div class="masonry-grid" role="grid" :aria-label="t('aria.projects.grid')">
          <template v-for="(project, index) in projectKeys" :key="index">
            <div 
              @click="showPopover(index)"
              @keydown.enter="showPopover(index)"
              @keydown.space.prevent="showPopover(index)"
              tabindex="0"
              role="gridcell"
              :aria-label="t('aria.projects.viewProject', { title: t(`projects.items.${project.key}.title`) })"
              :class="[
                'masonry-item group bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer rounded-2xl relative focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
                // Vary heights for masonry effect
                index % 5 === 0 ? 'masonry-tall' : 
                index % 3 === 0 ? 'masonry-medium' : 'masonry-short'
              ]">
              <!-- Project Image -->
              <div :class="[
                'relative overflow-hidden',
                index % 5 === 0 ? 'h-64' : 
                index % 3 === 0 ? 'h-48' : 'h-40'
              ]">
                <img 
                  v-if="project.images && project.images.length > 0"
                  :src="project.images[0]" 
                  :alt="`${t(`projects.items.${project.key}.title`)} preview`"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy" 
                />
                <div v-else class="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 flex items-center justify-center">
                  <component :is="project.icon" class="w-16 h-16 text-[var(--color-primary)]/60" />
                </div>
                
                <!-- Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Project Type Badge -->
                <div class="absolute top-4 left-4">
                  <div v-if="t(`projects.items.${project.key}.type`) === 'personal'"
                    class="flex items-center gap-1 px-3 py-1 bg-[var(--color-primary)]/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">
                    <User class="w-3 h-3" />
                    {{ t('projects.types.personal') }}
                  </div>
                  <div v-if="t(`projects.items.${project.key}.type`) === 'professional'"
                    class="flex items-center gap-1 px-3 py-1 bg-sky-500/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">
                    <Briefcase class="w-3 h-3" />
                    {{ t('projects.types.professional') }}
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button v-if="project.hasUrl" @click.stop="openUrl(project.url)"
                    class="p-2 bg-[var(--color-primary)]/90 text-white rounded-full hover:bg-[var(--color-primary)] transition-colors backdrop-blur-sm">
                    <ExternalLink class="w-4 h-4" />
                  </button>
                  <button v-if="project.hasGithub" @click.stop="openUrl(project.githubUrl)"
                    class="p-2 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors backdrop-blur-sm">
                    <Github class="w-4 h-4" />
                  </button>
                </div>

                <!-- View Details Icon -->
                <div class="absolute bottom-4 right-4">
                  <div class="p-2 bg-white/90 rounded-full backdrop-blur-sm">
                    <svg class="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Card Content -->
              <div class="p-6">
                <div class="flex items-start gap-3 mb-3">
                  <div class="p-2 bg-[var(--color-primary)]/10 rounded-lg">
                    <component :is="project.icon" class="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300 line-clamp-2">
                      {{ t(`projects.items.${project.key}.title`) }}
                    </h3>
                    <p class="text-sm text-[var(--color-text-secondary)] mt-1">
                      {{ t(`projects.items.${project.key}.category`) }}
                    </p>
                  </div>
                </div>
                
                <!-- Short Description -->
                <p :class="[
                  'text-sm text-[var(--color-text-secondary)] mb-4',
                  index % 5 === 0 ? 'line-clamp-4' : 'line-clamp-3'
                ]">
                  {{ t(`projects.items.${project.key}.description`) }}
                </p>

                <!-- Tech Stack Preview -->
                <div class="flex flex-wrap gap-1 mb-4">
                  <template v-for="(tech, techIndex) in getTech(project.key).slice(0, index % 5 === 0 ? 4 : 3)" :key="techIndex">
                    <span class="px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-xs text-[var(--color-text-secondary)]">
                      {{ tech }}
                    </span>
                  </template>
                  <span v-if="getTech(project.key).length > (index % 5 === 0 ? 4 : 3)" class="px-2 py-1 text-xs text-[var(--color-text-secondary)]">
                    +{{ getTech(project.key).length - (index % 5 === 0 ? 4 : 3) }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-20">
          <div
            class="inline-block p-8 bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-lg transition-shadow duration-300 rounded-2xl">
            <div class="flex items-center gap-6">
              <div class="p-4 bg-[var(--color-primary)]/10 rounded-2xl">
                <Github class="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <div class="text-left">
                <h3 class="text-xl text-[var(--color-text)] font-semibold mb-2">{{ t('projects.callToAction.title') }}
                </h3>
                <p class="text-base text-[var(--color-text-secondary)] max-w-md">{{
                  t('projects.callToAction.description') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Popover -->
    <Teleport to="body">
      <div v-if="selectedProject !== null" 
           @click="hidePopover"
           @keydown.escape="hidePopover"
           class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
           role="dialog"
           aria-modal="true"
           :aria-labelledby="`project-modal-title-${selectedProject}`">
        <div @click.stop 
             class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
             role="document">
          
          <!-- Header with Image -->
          <div class="relative">
            <div v-if="projectKeys[selectedProject].images && projectKeys[selectedProject].images.length > 0" 
                 class="h-64 overflow-hidden rounded-t-3xl">
              <img :src="projectKeys[selectedProject].images[0]" 
                   :alt="`${t(`projects.items.${projectKeys[selectedProject].key}.title`)} screenshot`"
                   class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            <!-- Close Button -->
            <button 
              @click="hidePopover" 
              :aria-label="t('aria.projects.closeModal')"
              class="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2">
              <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <!-- Project Info Overlay -->
            <div class="absolute bottom-4 left-6 right-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-2xl font-bold text-white mb-2">
                    {{ t(`projects.items.${projectKeys[selectedProject].key}.title`) }}
                  </h3>
                  <div class="flex items-center gap-2">
                    <span class="text-white/90">
                      {{ t(`projects.items.${projectKeys[selectedProject].key}.category`) }}
                    </span>
                    <div v-if="t(`projects.items.${projectKeys[selectedProject].key}.type`) === 'personal'"
                      class="flex items-center gap-1 px-2 py-1 bg-[var(--color-primary)]/90 text-white rounded-full text-xs font-semibold">
                      <User class="w-3 h-3" />
                      {{ t('projects.types.personal') }}
                    </div>
                    <div v-if="t(`projects.items.${projectKeys[selectedProject].key}.type`) === 'professional'"
                      class="flex items-center gap-1 px-2 py-1 bg-sky-500/90 text-white rounded-full text-xs font-semibold">
                      <Briefcase class="w-3 h-3" />
                      {{ t('projects.types.professional') }}
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button v-if="projectKeys[selectedProject].hasUrl" @click.stop="openUrl(projectKeys[selectedProject].url)"
                    class="p-3 bg-[var(--color-primary)]/90 text-white rounded-full hover:bg-[var(--color-primary)] transition-colors backdrop-blur-sm">
                    <ExternalLink class="w-5 h-5" />
                  </button>
                  <button v-if="projectKeys[selectedProject].hasGithub" @click.stop="openUrl(projectKeys[selectedProject].githubUrl)"
                    class="p-3 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors backdrop-blur-sm">
                    <Github class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-8 space-y-8">
            <!-- Description -->
            <div>
              <p class="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                {{ t(`projects.items.${projectKeys[selectedProject].key}.description`) }}
              </p>
            </div>

            <!-- Technologies -->
            <div>
              <h4 class="text-xl font-semibold text-[var(--color-text)] mb-6">
                {{ t('projects.techStack') }}
              </h4>
              <div class="flex flex-wrap gap-3">
                <template v-for="(tech, techIndex) in getTech(projectKeys[selectedProject].key)" :key="techIndex">
                  <span class="px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] font-medium">
                    {{ tech }}
                  </span>
                </template>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-4 pt-4">
              <button v-if="projectKeys[selectedProject].hasUrl" @click.stop="openUrl(projectKeys[selectedProject].url)"
                class="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
                <ExternalLink class="w-5 h-5" />
                {{ t('projects.live') }}
              </button>
              <button v-if="projectKeys[selectedProject].hasGithub" @click.stop="openUrl(projectKeys[selectedProject].githubUrl)"
                class="flex items-center justify-center gap-3 px-6 py-4 border-2 border-[var(--color-border)] text-[var(--color-text)] rounded-2xl font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300">
                <Github class="w-5 h-5" />
                {{ t('projects.viewCode') }}
              </button>
              <div v-if="!projectKeys[selectedProject].hasUrl && !projectKeys[selectedProject].hasGithub"
                class="flex-1 text-center px-6 py-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl text-[var(--color-text-secondary)]">
                {{ t('projects.private') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>