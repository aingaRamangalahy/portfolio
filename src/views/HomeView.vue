<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import NavigationSidebar from '@/components/NavigationSidebar.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
</script>

<template>
  <div class="min-h-screen">
    <!-- Navigation -->
    <NavigationSidebar />

    <!-- Main Content -->
    <main>
      <HeroSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  </div>
</template> 