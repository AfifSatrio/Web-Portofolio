# Independent studio portfolio

The active homepage is `components/portfolio/PortfolioHome.tsx`, styled in `app/portfolio.css`. The reference informs the content hierarchy and clarity; the visual direction is now an original studio layout rather than a sticky-profile, two-column portfolio.

## Design

Warm ivory, dark ink, terracotta accents, and muted sage surfaces. A horizontal hero pairs a short headline with Afif’s actual photo. A full-width featured project leads into a two-column project gallery, a short About section, service disclosures, and an email contact band. Public detail pages share the palette. Admin styling is unchanged.

## Interactions

- Sticky top navigation indicates the active section; scrolling remains native.
- Project filters show selected websites or applications, with counts and pressed states. Classification uses existing project titles; the database is not modified.
- Preview hover/focus provides a visible project action. Touch users see the action without hovering.
- Native service disclosures work with mouse, touch, and keyboard.
- Email copying includes announced success and failure states. The direct email link always remains available.
- Section headings, project cards, About, service rows, and Contact enter once with a 12px fade-up over 400–550ms. Small staggered delays separate adjacent cards and service rows. Keyboard focus cancels the animation immediately; reduced motion disables it, and content remains visible without JavaScript.

## Content

Lalunaspace stays first. Projects and About use the existing server-loaded database content and refresh events, with error and empty states. Full descriptions remain on detail pages. Email is centralized in `lib/profile-content.ts`.

`PublicChrome` retains shared navigation/footer on inner routes. The homepage has its own navigation/footer. Earlier Stargazer components are inactive source files.

## Validation

Production build, ESLint, TypeScript, and whitespace checks passed. Browser checks cover project filters/counts, keyboard service disclosure, clipboard success and denial, active navigation, reduced motion, project navigation, content without JavaScript, and widths from 320 to 1440px.

The final browser checks use the isolated production preview on `http://127.0.0.1:3001`, started with `PORTFOLIO_BUILD_DIR=.next-qa node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3001`. An earlier development preview was stopped after detecting two development servers sharing `.next`.
