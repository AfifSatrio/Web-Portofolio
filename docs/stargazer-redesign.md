# Stargazer portfolio

The public homepage is now an English landing page for freelance clients. Its sections introduce Afif, highlight Lalunaspace, present services, share a personal introduction, and invite visitors to start a conversation by email.

## Design

- Midnight navy `#080e1b`, warm white `#f1f0eb`, muted blue `#a0adc2`, and pale blue `#b5cef5`.
- General Sans for the interface; a restrained italic serif accent for headings.
- A decorative SVG constellation, sparse stars, and a faint horizon. No additional animation dependency or WebGL renderer.
- Native scrolling, gentle entrance effects, and pointer parallax on desktop. Reduced-motion preferences disable decorative motion and entrance animations.
- Responsive layouts and accessible mobile navigation with a focus trap and focus restoration.
- Public styles live in `app/stargazer.css`; admin styling is preserved.

## Content and contact

The homepage receives project data on the server and subscribes to the existing content-refresh events. Lalunaspace is prioritized by name; the next two projects follow the existing display order. Empty and unavailable project states are handled without creating replacement records.

Project previews and live links come from the existing database. `/projects/[id]` shows the full project description and technology stack. Descriptions are factual project overviews; no results, metrics, testimonials, or contribution claims have been invented.

The public email is centralized in `lib/profile-content.ts`: `afifsatria2108@gmail.com`. Primary contact links open an email composer. The contact form prepares a draft for the visitor to review and send; it does not send email from the server. Clipboard and manual-copy alternatives remain available.

## Validation

- Production build, ESLint, TypeScript, and existing profile-content checks.
- Chrome desktop and mobile visual inspection with actual project thumbnails and profile photo.
- No horizontal overflow at 320, 390, 768, and 1440 pixels.
- Mobile menu links, keyboard focus trapping, Escape, focus restoration, and section anchor offsets.
- Reduced-motion behavior and server-rendered hero/project content with JavaScript disabled.
- Existing public routes, Lalunaspace detail/live link, contact validation, and email-draft flow.
- No JavaScript runtime errors during the browser checks.

Run `npm run dev` to preview. Use `PORTFOLIO_BUILD_DIR=.next-qa npm run build` for a production build alongside an active development server.

## Minimal interaction and copy

The homepage uses a single sticky night sky. Pointer parallax is confined to the hero on desktop; the constellation, ambient light, and stars fade as visitors approach the work. The constellation no longer morphs or travels between sections. Star twinkling pauses outside the hero. Mobile disables pointer parallax, and reduced motion disables entrance and decorative movement.

Scrolling is free, with no snapping or forced section heights. `ChapterReveal` plays a short 12px fade-up once per mounted content block, with no per-word or per-control choreography. It cancels animation on keyboard focus and keeps content visible without JavaScript.

The hero has one supporting sentence. The featured project uses a brief excerpt and three technology tags. Services use three short descriptions. About uses a short introduction; complete descriptions remain available on the existing detail pages. Contact has one clear email CTA and the visible email address.

Validation covers native scrolling, one-time entrance behavior, hero pointer interaction, background fading, responsive widths, mobile navigation, reduced motion, and content without JavaScript.
