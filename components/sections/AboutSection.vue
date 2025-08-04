<script setup lang="ts">
import { ExternalLink, MapPin, Calendar, Layers, Heart, Target } from 'lucide-vue-next'

const { t } = useI18n()
const mounted = ref(false)

const descriptions = computed(() => [
  t('hero.description2'),
  t('hero.description3'),
  t('hero.description4')
])

const quickStats = computed(() => [
  {
    icon: Calendar,
    label: t('hero.stats.yearsExperience'),
    value: t('about.yearsExperienceValue')
  },
  {
    icon: Layers,
    label: t('hero.stats.coreStacks'),
    value: t('about.coreStacksValue')
  },
  {
    icon: MapPin,
    label: t('hero.stats.basedIn'),
    value: t('hero.location')
  },
])

function scrollToSection(href: string) {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <section id="about" class="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    :style="{ backgroundColor: 'var(--color-background)' }" aria-labelledby="aboutTitle" role="region">
    <div class="max-w-7xl mx-auto">
      <div :class="[
        'transition-all duration-1000 ease-out',
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      ]">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 id="aboutTitle" class="text-3xl md:text-4xl lg:text-5xl text-[var(--color-text)] mb-6 font-semibold">{{
            t('about.title') }}</h2>
          <div
            class="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/50 mx-auto rounded-full"
            aria-hidden="true"></div>
        </div>

        <!-- Enhanced Bento Grid Layout -->
        <div class="space-y-8">

          <!-- Main Content Row -->
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            <!-- Main About Card (Left) -->
            <div class="lg:col-span-3 group">
              <div
                class="p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl hover:shadow-xl hover:border-[var(--color-primary)]/20 transition-all duration-500 h-full">
                <div class="h-full flex flex-col">
                  <!-- Header with subtle animation -->
                  <div class="flex items-center gap-4 mb-8">
                    <div class="relative">
                      <div
                        class="p-3 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Heart class="w-6 h-6 text-[var(--color-primary)]" />
                      </div>
                      <!-- Subtle pulse effect -->
                      <div
                        class="absolute inset-0 bg-[var(--color-primary)]/20 rounded-xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      </div>
                    </div>
                    <div>
                      <h3 class="text-xl text-[var(--color-text)] font-semibold">{{ t('about.whatDrivesMe') }}</h3>
                      <div
                        class="w-12 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-transparent mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
                      </div>
                    </div>
                  </div>

                  <!-- Enhanced Description with better typography -->
                  <div class="space-y-6 text-base text-[var(--color-text-secondary)] leading-relaxed flex-1">
                    <template v-for="description in descriptions" :key="description">
                      <p
                        class="relative pl-4 border-l-2 border-transparent hover:border-[var(--color-primary)]/30 transition-colors duration-300">
                        <span class="absolute left-0 top-2 w-1 h-1 bg-[var(--color-primary)]/50 rounded-full"></span>
                        {{ description }}
                      </p>
                    </template>
                  </div>

                  <!-- Enhanced Personal Traits -->
                  <div class="mt-8 pt-6 border-t border-[var(--color-border)]">
                    <h4 class="text-sm font-medium text-[var(--color-text-secondary)] mb-4 uppercase tracking-wider">
                      Core Values</h4>
                    <div class="flex flex-wrap gap-3">
                      <div class="group/trait">
                        <div
                          class="px-4 py-2 bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-background)] border border-[var(--color-border)] group-hover/trait:border-[var(--color-primary)]/40 group-hover/trait:bg-gradient-to-r group-hover/trait:from-[var(--color-primary)]/8 group-hover/trait:to-[var(--color-primary)]/5 transition-all duration-300 transform group-hover/trait:scale-105 rounded-xl backdrop-blur-sm">
                          <span class="text-sm font-medium text-[var(--color-primary)]">🚀 {{
                            t('hero.traits.passionateLearner') }}</span>
                        </div>
                      </div>
                      <div class="group/trait">
                        <div
                          class="px-4 py-2 bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-background)] border border-[var(--color-border)] group-hover/trait:border-[var(--color-primary)]/40 group-hover/trait:bg-gradient-to-r group-hover/trait:from-[var(--color-primary)]/8 group-hover/trait:to-[var(--color-primary)]/5 transition-all duration-300 transform group-hover/trait:scale-105 rounded-xl backdrop-blur-sm">
                          <span class="text-sm font-medium text-[var(--color-primary)]">🤝 {{
                            t('hero.traits.teamPlayer') }}</span>
                        </div>
                      </div>
                      <div class="group/trait">
                        <div
                          class="px-4 py-2 bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-background)] border border-[var(--color-border)] group-hover/trait:border-[var(--color-primary)]/40 group-hover/trait:bg-gradient-to-r group-hover/trait:from-[var(--color-primary)]/8 group-hover/trait:to-[var(--color-primary)]/5 transition-all duration-300 transform group-hover/trait:scale-105 rounded-xl backdrop-blur-sm">
                          <span class="text-sm font-medium text-[var(--color-primary)]">💡 {{
                            t('hero.traits.serviceOriented') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Quick Stats Section (Right) -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Stats Card -->
              <div
                class="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl hover:shadow-xl hover:border-[var(--color-primary)]/20 transition-all duration-300 group">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
                  <h3 class="text-lg text-[var(--color-text)] font-semibold">{{ t('hero.quickStats') }}</h3>
                </div>
                <div class="space-y-4">
                  <template v-for="(stat, index) in quickStats" :key="stat.label">
                    <div
                      class="flex items-start gap-4 p-3 rounded-xl hover:bg-[var(--color-background)]/50 transition-colors duration-200">
                      <div class="p-2 bg-[var(--color-primary)]/10 rounded-lg">
                        <component :is="stat.icon" class="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-medium text-[var(--color-text)] mb-1">{{ stat.label }}</p>
                        <p class="text-sm text-[var(--color-text-secondary)]">{{ stat.value }}</p>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <!-- Currently Learning Card -->
              <div
                class="p-6 bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-primary)]/5 to-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 rounded-2xl backdrop-blur-sm">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse"></div>
                  <h3 class="text-lg text-[var(--color-text)] font-semibold">{{ t('about.currentlyExploring') }}</h3>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-[var(--color-text-secondary)]">🧠 {{ t('about.learningItems.aiMl')
                    }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-[var(--color-text-secondary)]">⚡ {{ t('about.learningItems.performance')
                    }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-[var(--color-text-secondary)]">🎨 {{ t('about.learningItems.animations')
                    }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-[var(--color-text-secondary)]">♿ {{ t('about.learningItems.accessibility')
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Call to Action Card (Full Width) -->
          <div
            class="w-full p-8 bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-primary)]/5 to-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 rounded-2xl hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
              <div class="text-center md:text-left">
                <div class="flex items-center gap-3 justify-center md:justify-start mb-4">
                  <div class="p-3 bg-[var(--color-primary)]/10 rounded-xl">
                    <Target class="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <h4 class="text-xl text-[var(--color-text)] font-semibold">{{ t('hero.callToAction') }}</h4>
                </div>
                <p class="text-base text-[var(--color-text-secondary)] max-w-2xl">
                  {{ t('hero.availableDescription') }}
                </p>
              </div>
              <div class="flex-shrink-0">
                <button @click="scrollToSection('#contact')"
                  :aria-label="t('aria.navigation.navigateToSection', { section: t('nav.contact') })"
                  class="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-primary)] text-[var(--color-background)] rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                  {{ t('hero.letsConnect') }}
                  <ExternalLink class="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>