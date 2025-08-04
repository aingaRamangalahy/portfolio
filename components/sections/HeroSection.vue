<template>
  <section id="hero"
    class="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 lg:pt-0 relative overflow-hidden"
    :style="{ backgroundColor: 'var(--color-background)' }">
    <!-- Minimal Background Pattern -->
    <div class="absolute inset-0 opacity-[0.015]">
      <div class="absolute inset-0" :style="{
        backgroundImage: `
            radial-gradient(circle at 20% 20%, var(--color-primary) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, var(--color-primary) 1px, transparent 1px)
          `,
        backgroundSize: '60px 60px',
      }"></div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
      <div :class="[
        'transition-all duration-1000 ease-out text-center',
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      ]">
        <!-- Profile Image with Status -->
        <div class="relative inline-block mb-8">
          <div class="relative">
            <!-- Profile Image -->
            <img src="/images/ainga.png" alt="Ainga Profile"
              class="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[var(--color-surface)] shadow-2xl shadow-[var(--color-primary)]/10 hover:shadow-[var(--color-primary)]/20 transition-all duration-300 hover:scale-105" />

            <!-- GitHub-style Status Badge -->
            <div
              class="absolute -bottom-2 -right-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-background)] shadow-xl min-w-[140px]">
              <div class="text-xs font-semibold text-[var(--color-primary)] text-left overflow-hidden">
                <span class="inline-block animate-typewriter-techy" :key="currentStatusIndex"
                  :style="{ '--message-length': currentMessage.length }">
                  {{ currentMessage }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Title -->
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text)] mb-8 text-balance"
          v-html="t('hero.greeting')">
        </h1>

        <!-- Subtitle -->
        <h2 class="text-xl md:text-2xl lg:text-3xl text-[var(--color-text-secondary)] mb-12 text-balance font-normal">
          {{ t('hero.title') }}
        </h2>

        <!-- Description -->
        <p class="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-16 text-balance leading-relaxed"
          v-html="highlightedDescription">
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-32">
          <button @click="scrollToSection('#projects')"
            class="group inline-flex items-center gap-3 px-10 py-5 bg-[var(--color-primary)] text-[var(--color-background)] rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[var(--color-primary)]/20">
            {{ t('hero.viewWork') }}
            <ArrowRight class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button @click="scrollToSection('#contact')"
            class="inline-flex items-center gap-3 px-10 py-5 border-2 border-[var(--color-border)] text-[var(--color-text)] rounded-2xl font-semibold text-lg hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-all duration-300">
            {{ t('hero.getInTouch') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden lg:block">
      <div class="flex flex-col items-center gap-3 text-[var(--color-text-secondary)] animate-bounce">
        <div class="w-px h-12 bg-[var(--color-border)]"></div>
        <div class="w-3 h-3 bg-[var(--color-primary)] rounded-full"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes typewriter-techy {
  0% {
    width: 0;
    opacity: 0.8;
  }

  5% {
    opacity: 1;
  }

  95% {
    opacity: 1;
  }

  100% {
    width: calc(var(--message-length) * 0.7em);
    opacity: 1;
  }
}

@keyframes cursor-blink {

  0%,
  50% {
    border-color: var(--color-primary);
    opacity: 1;
  }

  51%,
  100% {
    border-color: transparent;
    opacity: 0.3;
  }
}

@keyframes text-flicker {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.95;
  }
}

.animate-typewriter-techy {
  display: inline-block;
  width: 0;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid var(--color-primary);
  font-family: 'Courier New', monospace;
  letter-spacing: 0.05em;
  animation:
    typewriter-techy 2.5s steps(var(--message-length)) forwards,
    cursor-blink 1s infinite,
    text-flicker 0.1s ease-in-out infinite alternate;
}
</style>

<script setup>
import { ArrowRight } from 'lucide-vue-next'

const { t } = useI18n()
const mounted = ref(false)
const currentStatusIndex = ref(0)
const isTyping = ref(false)

// Rotating status messages with emojis
const statusMessages = [
  '💼 Available for work',
  '🎯 Focusing',
  '📚 Learning new things',
  '🚀 Building cool stuff',
  '✨ Open to opportunities',
  '💻 Coding with passion'
]

// Current message for typewriter effect
const currentMessage = computed(() => statusMessages[currentStatusIndex.value])

// Highlighted description with beautiful styling for key terms
const highlightedDescription = computed(() => {
  let description = t('hero.description1')

  // Highlight "developer" and "développeur" with stunning gradient background and glow
  description = description.replace(
    /(developer|développeur)/gi,
    '<span class="relative inline-block group mx-1"><span class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/30 via-[var(--color-primary)]/20 to-[var(--color-primary)]/30 rounded-xl transform -skew-x-12 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[var(--color-primary)]/20"></span><span class="relative font-bold text-[var(--color-primary)] px-2 py-1 drop-shadow-sm">$1</span></span>'
  )

  // Combined highlight for "5 years experience" or "5 années d'expérience" with stunning effects
  description = description.replace(
    /(5\s+years?\s+(?:of\s+)?(?:experience|expérience)|5\s+années?\s+(?:d')?(?:experience|expérience))/gi,
    '<span class="relative inline-block group mx-1"><span class="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-orange-400/25 to-red-400/20 rounded-xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-amber-400/20"></span><span class="relative font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 px-2 py-1 drop-shadow-sm">$1</span></span>'
  )

  // Fallback for separate "experience" highlighting if not caught by combined pattern
  description = description.replace(
    /(?<!5\s+years?\s+(?:of\s+)?)(?<!5\s+années?\s+(?:d')?)(experience|expérience)(?!\s+on)/gi,
    '<span class="relative font-semibold text-[var(--color-text)] mx-1 group"><span class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary)]/80 to-transparent rounded-full group-hover:h-2 transition-all duration-300"></span><span class="relative px-1">$1</span></span>'
  )

  return description
})

// SSR-safe scroll function
function scrollToSection(href) {
  if (process.client) {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

// Mount animation and status rotation
onMounted(() => {
  mounted.value = true

  // Rotate status messages every 5 seconds with smoother typing animation
  setInterval(() => {
    isTyping.value = true
    setTimeout(() => {
      currentStatusIndex.value = (currentStatusIndex.value + 1) % statusMessages.length
      isTyping.value = false
    }, 300)
  }, 5000)
})
</script>