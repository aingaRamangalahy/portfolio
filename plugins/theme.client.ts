export default defineNuxtPlugin(() => {
  // Initialize theme system on client side
  const { loadSavedTheme } = useTheme()
  
  // Apply saved theme immediately
  loadSavedTheme()
})