import { inject } from '@vercel/analytics'

export default defineNuxtPlugin(() => {
  // Initialize Vercel Analytics on client side
  inject()
})