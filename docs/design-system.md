# Portfolio design system

## Active pages

The landing page is `components/portfolio/PortfolioHome.tsx`, with About,
Portfolio, and Contact sections. `PublicChrome` supplies shared navigation and
footer. The old `/about`, `/projects`, and `/contact` URLs redirect to their
landing-page anchors. Project details remain available at `/projects/[id]`.
Admin pages and authenticated API routes manage About, projects, and skills.

## Visual design

The public site uses a monochrome palette, system sans-serif typography, fine
borders, and generous spacing. Public styles live in `app/portfolio.css`;
shared styles and accessibility defaults live in `app/globals.css`. Tailwind
settings in `tailwind.config.ts` support shared components and the admin UI.

Layout starts with a single column on mobile. Wider layouts are introduced at
640 and 768 px. The content container is at most 1200 px wide, with 20 px mobile,
32 px small-screen, and 48 px large-screen padding. Links and buttons have
visible keyboard focus; navigation and filter controls have 44 px touch targets.

## Content

About displays the first paragraph of the database biography. Its fallback copy
and the curated everyday tech stack live in `lib/profile-content.ts`. Portfolio
shows all projects in display order with category filters and links to details.
Contact contains email, GitHub, LinkedIn, and Instagram links, without a form.
The email lives in `lib/profile-content.ts`; social URLs live in `constants/index.ts`.

The homepage uses server-loaded content and subscribes to content-refresh events.
Project failures and empty results have separate states, and failures can be
retried. The public content API retains About, projects, and skills. Admin-managed
skills and biography normalization preserve customized records and stable IDs.

## Interaction and accessibility

Framer Motion provides section reveals, project-filter transitions, and subtle
hover feedback. `PublicChrome` respects the user's reduced-motion preference;
CSS also disables smooth scrolling and transitions for that preference.
Server-rendered content stays readable without JavaScript.

Mobile navigation uses a native modal dialog with focus containment, Escape to
close, and focus restoration. Section anchors account for the sticky header.

## Verification

Run `npm run lint`, `npm run test:profile`, and `npm run build`. To build alongside
a running development server, use `PORTFOLIO_BUILD_DIR=.next-qa npm run build`.
Serve that build with `PORTFOLIO_BUILD_DIR=.next-qa npx next start -p 3001`.

Check widths of 320, 390, 768, and 1440 px, mobile navigation and keyboard focus,
project filters and detail links, old-route redirects, contact URLs, reduced
motion, project error/empty states, and content with JavaScript disabled.
