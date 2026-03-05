# jester-2-6.github.io

Personal portfolio and resume supplement website for Jester, built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Hosted at [jester-2-6.github.io](https://jester-2-6.github.io).

## Features

- **Portfolio sections**: Hero, About, Skills, Projects, Contact
- **Live GitHub Projects**: Fetches public repositories from the GitHub API
- **Responsive Design**: Works on all screen sizes
- **Dark theme**: Professional dark color scheme
- **Static Export**: Fully static site, optimized for GitHub Pages hosting
- **CI/CD Pipeline**: Automatic deployment via GitHub Actions on every push to `main`

## Tech Stack

- [Next.js 16](https://nextjs.org/) — React framework with static export
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS framework
- [GitHub Actions](https://github.com/features/actions) — CI/CD pipeline

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build static site
npm run build

# Lint code
npm run lint
```

## Deployment

The site is automatically deployed to GitHub Pages via the CI/CD pipeline defined in `.github/workflows/deploy.yml` whenever changes are pushed to the `main` branch.

To enable GitHub Pages on your fork:
1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the pipeline will build and deploy automatically

## Customization

Update `app/lib/constants.ts` to customize your name, skills, social links, and GitHub username.

