# Portfolio - Nuxt 3

A modern, responsive portfolio website built with Nuxt 3, featuring internationalization, dynamic theming, and server-side rendering.

## 🚀 Features

- **Nuxt 3** - Modern Vue.js framework with SSR/SSG
- **TypeScript** - Full type safety
- **Internationalization** - Multi-language support (EN/FR)
- **Dynamic Theming** - Multiple color themes with smooth transitions
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Meta tags, structured data, and performance optimized
- **Tailwind CSS** - Utility-first CSS framework
- **Component Architecture** - Modular and reusable components

## 🛠️ Tech Stack

- **Framework**: Nuxt 3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide Vue Next
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview

# Generate static site
pnpm generate
```

## 🌍 Internationalization

The project supports multiple languages:
- English (default)
- French

Locale files are located in the `locales/` directory.

## 🎨 Theming

The project includes multiple themes:
- Modern Minimal (default)
- Ghibli Studio
- Slack
- Claude AI

Themes are managed through CSS custom properties and can be switched dynamically.

## 📁 Project Structure

```
├── assets/          # Static assets (CSS, images)
├── components/      # Vue components
│   └── sections/    # Page sections
├── composables/     # Vue composables
├── layouts/         # Nuxt layouts
├── locales/         # i18n translation files
├── pages/           # Nuxt pages (file-based routing)
├── plugins/         # Nuxt plugins
├── public/          # Public static files
├── utils/           # Utility functions
├── app.vue          # Main app component
├── nuxt.config.ts   # Nuxt configuration
└── tailwind.config.js # Tailwind configuration
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Deploy automatically on push to main branch

### Other Platforms

The project can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 Migration Notes

This project was migrated from Vue 3 + Vite to Nuxt 3. Key changes include:

- **File-based routing** instead of Vue Router
- **Auto-imports** for components and composables
- **SSR/SSG capabilities** for better SEO and performance
- **Built-in i18n module** instead of Vue i18n plugin
- **Nuxt-specific composables** for better DX

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.