<script setup lang="ts">
import { Mail, Github, Linkedin, ArrowRight, MessageCircle, Send } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import FloatingIcons from '@/components/custom/FloatingIcons.vue'

const { t } = useI18n()

const socialLinks = [
  { 
    icon: Mail, 
    href: 'mailto:aingaramangalahy@gmail.com', 
    label: 'contact.labels.email',
    title: computed(() => t('contact.socials.email.title')),
    description: computed(() => t('contact.socials.email.description')),
    handle: 'aingaramangalahy@gmail.com',
    primary: true
  },
  { 
    icon: Github, 
    href: 'https://github.com/aingaRamangalahy', 
    label: 'contact.labels.github',
    title: computed(() => t('contact.socials.github.title')),
    description: computed(() => t('contact.socials.github.description')),
    handle: '@aingaRamangalahy'
  },
  { 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/in/ainga-ramangalahy-2a98b014a/', 
    label: 'contact.labels.linkedin',
    title: computed(() => t('contact.socials.linkedin.title')),
    description: computed(() => t('contact.socials.linkedin.description')),
    handle: 'Ainga RAMANGALAHY'
  },
]

function openLink(href: string) {
  if (href.startsWith('mailto:')) {
    window.location.href = href
  } else {
    window.open(href, '_blank', 'noopener,noreferrer')
  }
}
</script>

<template>
  <section 
    id="contact" 
    class="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    :style="{ backgroundColor: 'var(--color-background)' }"
  >
    <FloatingIcons />
    <div class="max-w-4xl mx-auto">
      
      <!-- Section Header -->
      <div class="text-center mb-20">
        <h2 class="text-heading text-[var(--color-text)] mb-6">{{ t('contact.title') }}</h2>
        <p class="text-body-large text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-12">{{ t('contact.subtitle') }}</p>
      </div>

      <!-- Contact Methods -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <template v-for="(link, index) in socialLinks" :key="index">
          <Card 
            @click="openLink(link.href)"
            :class="[
              'group cursor-pointer border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] overflow-hidden',
              link.primary 
                ? 'bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]' 
                : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-primary)]'
            ]"
          >
            <CardContent class="p-8 text-center">
              
              <!-- Icon -->
              <div 
                :class="[
                  'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110',
                  link.primary 
                    ? 'bg-[var(--color-primary)]/20' 
                    : 'bg-[var(--color-primary)]/10'
                ]"
              >
                <component :is="link.icon" class="icon-xl text-[var(--color-primary)]" />
              </div>
              
              <!-- Content -->
              <h4 class="text-subheading text-[var(--color-text)] font-bold mb-2">{{ link.title }}</h4>
              <p class="text-body text-[var(--color-text-secondary)] mb-4">{{ link.description }}</p>
              <p class="text-caption text-[var(--color-primary)] font-medium">{{ link.handle }}</p>
              
              <!-- Hover indicator -->
              <div class="flex items-center justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span class="text-caption text-[var(--color-primary)] font-medium">{{ t('contact.clickToOpen') }}</span>
                <ArrowRight class="icon-xs text-[var(--color-primary)]" />
              </div>
              
            </CardContent>
          </Card>
        </template>
      </div>

      <!-- Additional Info -->
      <div class="text-center">
        <Card class="inline-block p-8 bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center gap-6">
            <div class="p-4 bg-[var(--color-primary)]/10 rounded-2xl">
              <MessageCircle class="icon-xl text-[var(--color-primary)]" />
            </div>
            <div class="text-left">
              <h3 class="text-subheading text-[var(--color-text)] font-semibold mb-2">{{ t('contact.openToOpportunities') }}</h3>
              <p class="text-body text-[var(--color-text-secondary)] max-w-md">{{ t('hero.availableDescription') }}</p>
            </div>
          </div>
        </Card>
      </div>

      <!-- Footer -->
      <div class="text-center mt-16 pt-8 border-t border-[var(--color-border)]">
        <p class="text-caption text-[var(--color-text-secondary)]">
          {{ t('contact.basedIn') }} <span class="text-[var(--color-primary)] font-medium">{{ t('hero.location') }}</span> • {{ t('contact.availableForRemote') }}
        </p>
      </div>
    </div>
  </section>
</template> 