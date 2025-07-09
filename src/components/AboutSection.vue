<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Card } from '@/components/ui/card'
import { ExternalLink, MapPin, Calendar, Layers, Heart, Target } from 'lucide-vue-next'
import FloatingIcons from '@/components/custom/FloatingIcons.vue'

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

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <section
    id="about"
    class="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    :style="{ backgroundColor: 'var(--color-background)' }"
  >
    <FloatingIcons />
    <div class="max-w-7xl mx-auto">
      <div
        :class="[
          'transition-all duration-1000 ease-out',
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        ]"
      >
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 class="text-heading text-[var(--color-text)] mb-6 font-semibold">{{ t('about.title') }}</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/50 mx-auto rounded-full"></div>
        </div>

        <!-- Bento Grid Layout -->
        <div class="space-y-8">
          
          <!-- Main Content Row -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <!-- Main About Card (Left) -->
            <Card class="lg:col-span-2 p-8 bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-xl hover:scale-[1.01] transition-all duration-300 hover-lift">
              <div class="h-full flex flex-col">
                <!-- Header -->
                <div class="flex items-center gap-3 mb-6">
                  <div class="p-3 bg-[var(--color-primary)]/10 rounded-xl">
                    <Heart class="icon-lg text-[var(--color-primary)]" />
                  </div>
                  <h3 class="text-subheading text-[var(--color-text)] font-semibold">{{ t('about.whatDrivesMe') }}</h3>
                </div>
                <!-- Description -->
                <div class="space-y-6 text-body text-[var(--color-text-secondary)] leading-relaxed flex-1">
                  <template v-for="(description, index) in descriptions" :key="index">
                    <p>{{ description }}</p>
                  </template>
                </div>
                <!-- Personal Traits Hashtags -->
                <div class="mt-8 pt-6 border-t border-[var(--color-border)]">
                  <div class="flex flex-wrap gap-4">
                    <div class="group">
                      <div class="px-4 py-2 bg-[var(--color-surface)] group-hover:bg-[var(--color-primary)]/10 transition-all duration-300 transform group-hover:scale-105">
                        <span class="text-body font-bold text-[var(--color-primary)]">#{{ t('hero.traits.passionateLearner').replace(/\s+/g, '') }}</span>
                      </div>
                    </div>
                    <div class="group">
                      <div class="px-4 py-2 bg-[var(--color-surface)] group-hover:bg-[var(--color-primary)]/10 transition-all duration-300 transform group-hover:scale-105">
                        <span class="text-body font-bold text-[var(--color-primary)]">#{{ t('hero.traits.teamPlayer').replace(/\s+/g, '') }}</span>
                      </div>
                    </div>
                    <div class="group">
                      <div class="px-4 py-2 bg-[var(--color-surface)] group-hover:bg-[var(--color-primary)]/10 transition-all duration-300 transform group-hover:scale-105">
                        <span class="text-body font-bold text-[var(--color-primary)]">#{{ t('hero.traits.serviceOriented').replace(/\s+/g, '') }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <!-- Quick Stats Section (Right) -->
            <Card class="lg:col-span-1 p-8 bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-xl hover:scale-[1.01] transition-all duration-300 hover-lift">
              <h3 class="text-subheading text-[var(--color-text)] font-semibold mb-6">{{ t('hero.quickStats') }}</h3>
              <div class="space-y-5">
                <template v-for="(stat, index) in quickStats" :key="stat.label">
                  <div class="flex items-start gap-4">
                    <component :is="stat.icon" class="icon-md text-[var(--color-primary)] mt-1 flex-shrink-0" />
                    <div>
                      <p class="text-body font-semibold text-[var(--color-text)]">{{ stat.label }}</p>
                      <p class="text-body text-[var(--color-text-secondary)]">{{ stat.value }}</p>
                    </div>
                  </div>
                  <hr v-if="index < quickStats.length - 1" class="border-t-[var(--color-border)]/50" />
                </template>
              </div>
            </Card>
          </div>

          <!-- Call to Action Card (Full Width) -->
          <Card class="w-full p-8 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 hover-lift">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
              <div class="text-center md:text-left">
                <div class="flex items-center gap-3 justify-center md:justify-start mb-4">
                  <div class="p-3 bg-[var(--color-primary)]/10 rounded-xl">
                    <Target class="icon-lg text-[var(--color-primary)]" />
                  </div>
                  <h4 class="text-subheading text-[var(--color-text)] font-semibold">{{ t('hero.callToAction') }}</h4>
                </div>
                <p class="text-body text-[var(--color-text-secondary)] max-w-2xl">
                  {{ t('hero.availableDescription') }}
                </p>
              </div>
              <div class="flex-shrink-0">
                <a 
                  href="#contact"
                  class="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-primary)] text-[var(--color-background)] rounded-2xl font-semibold text-body-large hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  {{ t('hero.letsConnect') }}
                  <ExternalLink class="icon-md" />
                </a>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  </section>
</template> 