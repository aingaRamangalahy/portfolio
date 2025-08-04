<script setup lang="ts">
import { Mail, Github, Linkedin, ArrowRight, MessageCircle } from 'lucide-vue-next'
import { useScreenReader } from '~/composables/useScreenReader'

const { t } = useI18n()
const mounted = ref(false)

// Initialize screen reader support
const { announceStatus } = useScreenReader({
  enableStatusAnnouncements: true
})

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

function openLink(href: string, label: string) {
  if (href.startsWith('mailto:')) {
    window.location.href = href
    announceStatus(t('aria.contact.method', { method: t(label) }), 'polite')
  } else {
    navigateTo(href, { external: true, open: { target: '_blank' } })
    announceStatus(t('aria.contact.method', { method: t(label) }), 'polite')
  }
}

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <section 
    id="contact" 
    class="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    :style="{ backgroundColor: 'var(--color-background)' }"
    :aria-labelledby="contactTitle"
    role="region"
  >
    <div class="max-w-4xl mx-auto">
      <div
        :class="[
          'transition-all duration-1000 ease-out',
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        ]"
      >
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 id="contactTitle" class="text-3xl md:text-4xl lg:text-5xl text-[var(--color-text)] mb-6 font-semibold">{{ t('contact.title') }}</h2>
          <p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-12">{{ t('contact.subtitle') }}</p>
          <div class="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/50 mx-auto rounded-full" aria-hidden="true"></div>
        </div>

        <!-- Contact Methods -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" role="list" :aria-label="t('aria.contact.methods')">
          <template v-for="(link, index) in socialLinks" :key="index">
            <div 
              @click="openLink(link.href, link.label)"
              @keydown.enter="openLink(link.href, link.label)"
              @keydown.space.prevent="openLink(link.href, link.label)"
              tabindex="0"
              role="listitem"
              :aria-label="t('aria.contact.method', { method: link.title })"
              :class="[
                'group cursor-pointer border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] overflow-hidden rounded-2xl p-8 text-center focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
                link.primary 
                  ? 'bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]' 
                  : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-primary)]'
              ]"
            >
              
              <!-- Icon -->
              <div 
                :class="[
                  'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110',
                  link.primary 
                    ? 'bg-[var(--color-primary)]/20' 
                    : 'bg-[var(--color-primary)]/10'
                ]"
              >
                <component :is="link.icon" class="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              
              <!-- Content -->
              <h4 class="text-xl text-[var(--color-text)] font-bold mb-2">{{ link.title }}</h4>
              <p class="text-base text-[var(--color-text-secondary)] mb-4">{{ link.description }}</p>
              <p class="text-sm text-[var(--color-primary)] font-medium">{{ link.handle }}</p>
              
              <!-- Hover indicator -->
              <div class="flex items-center justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span class="text-sm text-[var(--color-primary)] font-medium">{{ t('contact.clickToOpen') }}</span>
                <ArrowRight class="w-3 h-3 text-[var(--color-primary)]" />
              </div>
              
            </div>
          </template>
        </div>

        <!-- Additional Info -->
        <div class="text-center">
          <div class="inline-block p-8 bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-lg transition-shadow duration-300 rounded-2xl">
            <div class="flex items-center gap-6">
              <div class="p-4 bg-[var(--color-primary)]/10 rounded-2xl">
                <MessageCircle class="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <div class="text-left">
                <h3 class="text-xl text-[var(--color-text)] font-semibold mb-2">{{ t('contact.openToOpportunities') }}</h3>
                <p class="text-base text-[var(--color-text-secondary)] max-w-md">{{ t('hero.availableDescription') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-16 pt-8 border-t border-[var(--color-border)]">
          <p class="text-sm text-[var(--color-text-secondary)]">
            {{ t('contact.basedIn') }} <span class="text-[var(--color-primary)] font-medium">{{ t('hero.location') }}</span> • {{ t('contact.availableForRemote') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>