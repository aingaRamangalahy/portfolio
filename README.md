# Portfolio Website

This is a personal portfolio website built with modern web technologies. It showcases my skills, projects, experience, and education.

## Technologies Used

- **Vue.js 3:** A progressive JavaScript framework for building user interfaces.
- **Vite:** A fast build tool that provides a quicker and leaner development experience for modern web projects.
- **TypeScript:** A statically typed superset of JavaScript that adds optional types.
- **Tailwind CSS v4:** A utility-first CSS framework for rapid UI development.
- **Shadcn-vue:** Re-usable components built using Radix UI and Tailwind CSS.
- **Vue Router:** For client-side routing.
- **Pinia:** For state management.
- **VueUse:** A collection of Vue Composition Utilities.
- **i18next:** For internationalization.

## Features

- **Responsive Design:** Adapts to different screen sizes (mobile, tablet, desktop).
- **Light Mode Only:** Designed with a clean and minimalist light aesthetic.
- **Theming:** Supports multiple light color themes that can be switched by the user.
- **Internationalization (i18n):** Content available in multiple languages (English and French).
- **Component-Based Architecture:** Built with reusable Vue components.
- **Optimized Performance:** Focus on Web Vitals and fast loading times.
- **Sections:**
    - Hero: Introduction and quick stats.
    - About: Detailed information about me.
    - Skills: Showcase of technical and soft skills.
    - Experience: Professional work history.
    - Education: Academic background.
    - Projects: Portfolio of selected projects.
    - Contact: Ways to get in touch.

## Getting Started

### Prerequisites

- Node.js (version 18.x or higher recommended)
- npm or yarn or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-portfolio-repo.git
    cd your-portfolio-repo
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```
    Or using pnpm:
    ```bash
    pnpm install
    ```

### Running Locally

To start the development server:

Using npm:
```bash
npm run dev
```
Or using yarn:
```bash
yarn dev
```
Or using pnpm:
```bash
pnpm dev
```

This will typically start the server at `http://localhost:5173`.

### Building for Production

To build the application for production:

Using npm:
```bash
npm run build
```
Or using yarn:
```bash
yarn build
```
Or using pnpm:
```bash
pnpm build
```

This command will create a `dist` folder with the optimized production build.

## Project Structure (Simplified)

```
.
├── public/
├── src/
│   ├── assets/
│   │   ├── custom/         # Custom reusable components
│   │   ├── ui/             # Shadcn-vue UI components
│   │   ├── AboutSection.vue
│   │   ├── ContactSection.vue
│   │   ├── EducationSection.vue
│   │   ├── ExperienceSection.vue
│   │   ├── Footer.vue
│   │   ├── Header.vue
│   │   ├── HeroSection.vue
│   │   ├── ProjectsSection.vue
│   │   └── SkillsSection.vue
│   ├── composables/      # VueUse and custom composables (e.g., useTheme.ts)
│   ├── locales/          # i18n translation files (en.json, fr.json)
│   ├── router/           # Vue Router configuration (index.ts)
│   ├── styles/           # Global styles and Tailwind config (style.css, tailwind.config.js)
│   ├── views/            # Page views (e.g., HomeView.vue)
│   ├── App.vue           # Main App component
│   ├── main.ts           # Main entry point
│   └── shims-vue.d.ts    # Vue shim for TypeScript
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
(Note: You'll need to add a LICENSE file if you want to specify one) 