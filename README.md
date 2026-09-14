# Kabriz Garage Doors

Marketing site for Kabriz Garage Doors, a family-run garage door sales,
installation and repair business in Maryland.
Built with Next.js (App Router, static export) and Tailwind CSS, deployed to
GitHub Pages at <https://kabriz.com>.

## Contact details

Phone, WhatsApp, email, and hours live in one place: `lib/contact.ts`.
Every button, link, form, and the LocalBusiness structured data read from it.

## Key features

- **Contact splash** (`components/shared/ContactSplash.tsx`) — a first-visit
  overlay with one-tap WhatsApp / call / email buttons. Shown once per browser
  session; dismissible with the close button, Escape, or the backdrop.
- **Floating quick contact** (`components/shared/FloatingContact.tsx`) —
  a bottom bar on mobile and a WhatsApp bubble on desktop.
- **Static-friendly forms** — the estimate and cancellation forms compose a
  pre-filled WhatsApp message or email instead of posting to an API, so they
  work on GitHub Pages.
- **Installable** — web manifest, PNG icons generated from the logo, and theme
  color for mobile devices.
- **Brand assets** live in `public/images/` (logo, share image, work photos).

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into ./out
```

## Deployment

`.github/workflows/nextjs.yml` builds and publishes `./out` to GitHub Pages on
every push to `main`. The custom domain (`kabriz.com`) is served from a
`public/CNAME` file, which the static export copies to `out/CNAME` — GitHub
Pages reads it to keep the custom domain bound across deploys. It must also
be set once under repo Settings → Pages → Custom domain, alongside the DNS
records at the registrar (see the domain-setup notes for this project).
The base path lives in `lib/base-path.ts` and feeds both `next.config.ts` and
image URLs; it's empty while the site is served from the domain's root.
`trailingSlash` makes each route export as `route/index.html`.

The workflow deliberately does not pass `static_site_generator: next` to
`actions/configure-pages`: that option writes a competing `next.config.js`
which Next.js would load instead of `next.config.ts`.
