# Shrinivas Ramaprasad: Portfolio Site

Personal portfolio for [shrinivasramaprasad.site](https://shrinivasramaprasad.site).
React + TypeScript + Vite + Tailwind CSS + Framer Motion.

Design based on [cinematic-portfolio](https://github.com/lohithadamisetti123/cinematic-portfolio) by Lohitha Damisetti.

## Editing content

All text (summary, achievements, programmes, skills, experience, awards, certifications, contact details) lives in **`src/content.ts`**. Change it there; the components only handle layout.

Media:
- Hero video: `public/videos/hero.mp4`
- CV download: `public/Shrinivas_Ramaprasad_CV.pdf`
- Photos: `src/assets/hero-portrait.webp`, `src/assets/about.webp`

## Running locally

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build into dist/
```

`dist/` is a plain static site. Any web server (Nginx, Apache, Hostinger) can serve it.
