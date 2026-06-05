# PrequaliQ Website

Modern company website for [PrequaliQ](https://prequaliq.com), rebuilt with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, services, products, team intro |
| `/products` | Product listing |
| `/products/[slug]` | PrequaliQ App, ERP System, AI Command Center |
| `/services` | Service listing |
| `/services/[slug]` | Salesforce, Oracle, Ruby on Rails, NetSuite |
| `/team` | Meet the team |
| `/contact` | Contact form and company details |

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
└── lib/site-data.ts  # Content, navigation, and site config
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Deployment

Deploy to [Vercel](https://vercel.com), AWS, or any Node.js host. Run `npm run build` then `npm run start`.

## Next Steps

- Add a headless CMS (Sanity, Strapi) for content editing
- Wire contact form to email/CRM API
- Add blog/case studies section
- Connect client portal and product demos
