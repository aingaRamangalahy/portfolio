<script setup lang="ts">
import { Mail, Github, Linkedin } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/custom/SectionTitle.vue'

const { t } = useI18n()

const socialLinks = [
  { icon: Mail, href: 'mailto:aingaramangalahy@gmail.com', label: 'contact.labels.email' },
  { icon: Github, href: '#', label: 'contact.labels.github' },
  { icon: Linkedin, href: '#', label: 'contact.labels.linkedin' },
]
</script>

<template>
  <section id="contact" class="py-20 px-4 sm:px-6 lg:px-8 theme-surface transition-colors duration-300">
    <div class="max-w-4xl mx-auto">
      <SectionTitle 
        titleKey="contact.title" 
        subtitleKey="contact.subtitle" 
      />

      <Card class="theme-bg border-[var(--color-border)] transition-all duration-300 hover:shadow-lg">
        <CardContent class="p-8">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold theme-text mb-4 transition-colors duration-300">{{ t('contact.getInTouch') }}</h3>
            <p class="theme-text-secondary text-lg transition-colors duration-300">
              {{ t('contact.description') }}
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <!-- Email -->
            <a
              href="mailto:aingaramangalahy@gmail.com"
              class="group flex flex-col items-center p-6 rounded-lg border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 hover:shadow-md"
            >
              <div class="w-12 h-12 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                <Mail class="w-6 h-6 text-[var(--color-primary)] transition-colors duration-300" />
              </div>
              <h4 class="font-semibold theme-text mb-2 transition-colors duration-300">{{ t('contact.labels.email') }}</h4>
              <p class="theme-text-secondary text-sm text-center transition-colors duration-300">
                {{ t('contact.sendEmail') }}
              </p>
              <p class="text-[var(--color-primary)] text-sm mt-2 transition-colors duration-300">aingaramangalahy@gmail.com</p>
            </a>

            <!-- GitHub -->
            <a
              href="https://github.com/aingaramangalahy"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex flex-col items-center p-6 rounded-lg border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 hover:shadow-md"
            >
              <div class="w-12 h-12 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                <Github class="w-6 h-6 text-[var(--color-primary)] transition-colors duration-300" />
              </div>
              <h4 class="font-semibold theme-text mb-2 transition-colors duration-300">{{ t('contact.labels.github') }}</h4>
              <p class="theme-text-secondary text-sm text-center transition-colors duration-300">
                Check out my repositories
              </p>
              <p class="text-[var(--color-primary)] text-sm mt-2 transition-colors duration-300">@aingaramangalahy</p>
            </a>

            <!-- LinkedIn -->
            <a
              href="https://www.linkedin.com/in/ainga-ramangalahy-2a98b014a/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex flex-col items-center p-6 rounded-lg border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 hover:shadow-md"
            >
              <div class="w-12 h-12 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                <Linkedin class="w-6 h-6 text-[var(--color-primary)] transition-colors duration-300" />
              </div>
              <h4 class="font-semibold theme-text mb-2 transition-colors duration-300">{{ t('contact.labels.linkedin') }}</h4>
              <p class="theme-text-secondary text-sm text-center transition-colors duration-300">
                Let's connect professionally
              </p>
              <p class="text-[var(--color-primary)] text-sm mt-2 transition-colors duration-300">Ainga RAMANGALAHY</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template> 