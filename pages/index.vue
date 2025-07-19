<template>
  <div>
    <!-- All sections with explicit imports -->
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <ExperienceSection />
    <EducationSection />
    <SkillsSection />
    <ContactSection />
  </div>
</template>

<script setup>
// Explicit imports for all sections
import HeroSection from '~/components/sections/HeroSection.vue'
import AboutSection from '~/components/sections/AboutSection.vue'
import ExperienceSection from '~/components/sections/ExperienceSection.vue'
import EducationSection from '~/components/sections/EducationSection.vue'
import ProjectsSection from '~/components/sections/ProjectsSection.vue'
import SkillsSection from '~/components/sections/SkillsSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'

const { t } = useI18n()

// SEO Meta tags
useSeoMeta({
  title: () => `${t('nav.name')} - ${t('hero.title')}`,
  description: () => t('hero.description1'),
  ogTitle: () => `${t('nav.name')} - ${t('hero.title')}`,
  ogDescription: () => t('hero.description1'),
  ogImage: '/icon.svg',
  twitterCard: 'summary_large_image'
})

// Page meta
definePageMeta({
  layout: 'default'
})
</script>