<script setup lang="ts">
import { Calendar, Award, BookOpen } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/custom/SectionTitle.vue'

const { t, tm } = useI18n()

interface DegreeKey {
  key: string
}

const degreeKeys: DegreeKey[] = [
  { key: 'masters' },
  { key: 'bachelors' },
]

// Helper functions to get coursework and achievements arrays
function getCoursework(key: string): string[] {
  const courseworkItems = tm(`education.degrees.${key}.coursework`)
  if (Array.isArray(courseworkItems)) {
    return courseworkItems.filter(item => typeof item === 'string') as string[]
  }
  return []
}

function getAchievements(key: string): string[] {
  const achievementItems = tm(`education.degrees.${key}.achievements`)
  if (Array.isArray(achievementItems)) {
    return achievementItems.filter(item => typeof item === 'string') as string[]
  }
  return []
}

interface Education {
  degree: string
  school: string
  location: string
  period: string
  gpa: string
  description: string
  coursework: string[]
  achievements: string[]
}

interface Certification {
  name: string
  issuer: string
  date: string
  credentialId: string
}

const education: Education[] = [
  {
    degree: 'Professional Master\'s Degree - General Computer Science Track',
    school: 'National School of Computer Science',
    location: 'Madagascar',
    period: '2017 - 2019',
    gpa: 'N/A',
    description: 'Advanced studies in computer science with focus on professional development and industry practices.',
    coursework: [
      'Advanced Programming',
      'Software Engineering',
      'Database Design',
      'System Architecture',
      'Project Management',
    ],
    achievements: ['Professional Master\'s Degree'],
  },
  {
    degree: 'Professional Bachelor\'s Degree - General Computer Science Track',
    school: 'National School of Computer Science',
    location: 'Madagascar',
    period: '2014 - 2017',
    gpa: 'N/A',
    description: 'Comprehensive foundation in computer science fundamentals and software development practices.',
    coursework: [
      'Programming Fundamentals',
      'Data Structures',
      'Algorithms',
      'Computer Systems',
      'Web Development',
    ],
    achievements: ['Professional Bachelor\'s Degree'],
  },
  {
    degree: 'High School Diploma Series C',
    school: 'Saint François Xavier College',
    location: 'Fianarantsoa, Madagascar',
    period: '2013 - 2014',
    gpa: 'N/A',
    description: 'Scientific track high school education with focus on mathematics and sciences.',
    coursework: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Natural Sciences',
      'French Literature',
    ],
    achievements: ['High School Diploma Series C'],
  },
]

const certifications: Certification[] = [
  // Removing placeholder certifications as none are mentioned in the resume
]
</script>

<template>
  <section 
    id="education" 
    class="py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }"
  >
    <div class="max-w-6xl mx-auto">
      <SectionTitle 
        titleKey="education.title" 
        subtitleKey="education.subtitle" 
      />

      <div class="space-y-12">
        <template v-for="(degree, index) in degreeKeys" :key="index">
          <Card 
            class="transition-all duration-300 hover:shadow-lg overflow-hidden border"
            :style="{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }"
          >
            <CardContent class="p-8">
              <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div class="mb-6 lg:mb-0 flex-1">
                  <h3 
                    class="text-2xl font-bold mb-2 transition-colors duration-300"
                    :style="{ color: 'var(--color-primary)' }"
                  >{{ t(`education.degrees.${degree.key}.degree`) }}</h3>
                  <p 
                    class="text-xl font-semibold mb-1 transition-colors duration-300"
                    :style="{ color: 'var(--color-accent)' }"
                  >{{ t(`education.degrees.${degree.key}.school`) }}</p>
                  <p 
                    class="text-sm mb-4 transition-colors duration-300"
                    :style="{ color: 'var(--color-text-secondary)' }"
                  >{{ t(`education.degrees.${degree.key}.location`) }}</p>
                  <p 
                    class="leading-relaxed transition-colors duration-300"
                    :style="{ color: 'var(--color-text-secondary)' }"
                  >{{ t(`education.degrees.${degree.key}.description`) }}</p>
                </div>
                
                <div class="flex-shrink-0">
                  <span 
                    class="inline-block px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 border"
                    :style="{ backgroundColor: 'var(--color-accent)', color: 'var(--color-background)', borderColor: 'var(--color-border)' }"
                  >
                    {{ t(`education.degrees.${degree.key}.period`) }}
                  </span>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-8">
                <!-- Coursework -->
                <div>
                  <h4 
                    class="font-semibold mb-4 flex items-center gap-2 transition-colors duration-300"
                    :style="{ color: 'var(--color-primary)' }"
                  >
                    <BookOpen 
                      class="w-5 h-5 transition-colors duration-300"
                      :style="{ color: 'var(--color-accent)' }"
                    />
                    {{ t('education.coursework') }}
                  </h4>
                  <ul class="space-y-2">
                    <template v-for="(course, courseIndex) in getCoursework(degree.key)" :key="courseIndex">
                      <li class="flex items-start gap-3">
                        <div 
                          class="w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-colors duration-300"
                          :style="{ backgroundColor: 'var(--color-accent)' }"
                        ></div>
                        <span 
                          class="transition-colors duration-300"
                          :style="{ color: 'var(--color-text-secondary)' }"
                        >{{ course }}</span>
                      </li>
                    </template>
                  </ul>
                </div>

                <!-- Achievements -->
                <div>
                  <h4 
                    class="font-semibold mb-4 flex items-center gap-2 transition-colors duration-300"
                    :style="{ color: 'var(--color-primary)' }"
                  >
                    <Award 
                      class="w-5 h-5 transition-colors duration-300"
                      :style="{ color: 'var(--color-accent)' }"
                    />
                    {{ t('education.achievements') }}
                  </h4>
                  <ul class="space-y-2">
                    <template v-for="(achievement, achIndex) in getAchievements(degree.key)" :key="achIndex">
                      <li class="flex items-start gap-3">
                        <div 
                          class="w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-colors duration-300"
                          :style="{ backgroundColor: 'var(--color-accent)' }"
                        ></div>
                        <span 
                          class="transition-colors duration-300"
                          :style="{ color: 'var(--color-text-secondary)' }"
                        >{{ achievement }}</span>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </template>
      </div>

      <!-- Certifications - Hidden since no certifications in resume -->
      <div v-if="certifications.length > 0">
        <h3 
          class="text-2xl font-bold mb-8 text-center transition-colors duration-300"
          :style="{ color: 'var(--color-primary)' }"
        >Professional Certifications</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <template v-for="(cert, index) in certifications" :key="index">
            <Card 
              class="transition-all duration-300 hover:shadow-lg overflow-hidden border"
              :style="{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }"
            >
              <CardHeader class="text-center">
                <div 
                  class="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center transition-colors duration-300"
                  :style="{ backgroundColor: 'var(--color-accent)' }"
                >
                  <Award 
                    class="w-6 h-6 transition-colors duration-300"
                    :style="{ color: 'var(--color-background)' }"
                  />
                </div>
                <CardTitle 
                  class="text-lg transition-colors duration-300"
                  :style="{ color: 'var(--color-primary)' }"
                >{{ cert.name }}</CardTitle>
                <CardDescription 
                  class="transition-colors duration-300"
                  :style="{ color: 'var(--color-text-secondary)' }"
                >{{ cert.issuer }}</CardDescription>
              </CardHeader>
              <CardContent class="text-center">
                <p 
                  class="text-sm mb-2 transition-colors duration-300"
                  :style="{ color: 'var(--color-text-secondary)' }"
                >Issued: {{ cert.date }}</p>
                <p 
                  class="text-xs transition-colors duration-300"
                  :style="{ color: 'var(--color-text-secondary)', opacity: 0.7 }"
                >ID: {{ cert.credentialId }}</p>
              </CardContent>
            </Card>
          </template>
        </div>
      </div>
    </div>
  </section>
</template> 