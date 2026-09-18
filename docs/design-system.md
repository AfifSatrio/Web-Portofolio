# Portfolio design system

The public pages use a monochrome palette, Archivo Black for display headings,
and General Sans for interface and body text. Shared components also apply to admin.

## Tokens

Tokens live in `tailwind.config.ts`; shared text and layout recipes live in
`app/globals.css`. Prefer semantic names for new components:

| Role              | Token                             | Value             |
| ----------------- | --------------------------------- | ----------------- |
| Page              | surface                           | #0A0A0A           |
| Card              | surface-card                      | #1A1A1A           |
| Subtle surface    | surface-subtle                    | #101010           |
| Main text         | ink                               | #FAFAFA           |
| Secondary text    | ink-secondary                     | #B3B3B3           |
| Supporting text   | ink-muted                         | #A3A3A3           |
| Decorative border | line / line-subtle                | #333333 / #262626 |
| Control boundary  | line-strong                       | #737373           |
| Error / success   | feedback-error / feedback-success | #FCA5A5 / #BBF7D0 |

Supporting text is brighter than the previous #7A7A7A, including on card surfaces.
Decorative borders are not substitutes for visible control boundaries.
Legacy `mono-*` aliases remain defined for existing components.

## Type, spacing, and shape

- `page-title`: Archivo Black, 36–60 px, uppercase; one h1 per public page.
- `section-title`: Archivo Black, 24–30 px, uppercase.
- `card-title`: General Sans semibold, 20–24 px, sentence case.
- `body-copy`: General Sans, 16 px, relaxed line height.
- `eyebrow`: 12 px semibold, uppercase, modest tracking.
- Container: max 1200 px, 24 px mobile / 48 px desktop gutters.
- Section spacing: 48 px mobile / 64 px desktop.
- Card padding: 24–32 px; local gaps use a 4 px scale.
- `rounded-control`: 4 px; `rounded-card`: 8 px; badges: pill.

## Components and interaction

Use `Button` for actions and `buttonStyles()` on links for navigation. Do not nest
buttons in links. Primary actions use a white fill; secondary actions use an outline.
Controls have a minimum 44 px height and a visible keyboard outline. Inputs expose
labels, required state, error text, and aria-invalid/aria-describedby associations.
Cards and badges are informational unless they explicitly contain a link or action.
Photos and project previews retain their original colors. Tool labels are visible
on touch devices. The mobile navigation uses a native modal dialog with Escape,
focus containment, and focus restoration; closed navigation is absent from tab order.

Use 150–200 ms for interface transitions and 400 ms for section reveals. Keep
reveals subtle. Content is readable without JavaScript. Reduced-motion preference
stops CSS animation and section reveals. Hidden floating controls are unmounted.

Projects have separate loading, ready, empty, and error states. Initial loading
uses three layout-matched skeleton cards with one status announcement. Retries
cancel older requests; previously loaded work stays visible during refresh/errors.
The public API returns 503 for project retrieval failures instead of a false empty list.

## Profile content

`lib/profile-content.ts` contains copy transcribed/adapted from the supplied Upwork
screenshots, structured services, and skill categories. Work dates or outcomes that
were not supplied are not invented. Olsera integration is explicitly planned.
The About introduction and skills still use the existing content/admin APIs.
Normalization upgrades only the exact old profile copy and untouched original seed
skill records, retaining their IDs. New/customized database records and subsequent
admin edits remain intact; deleted skill rows are not recreated. No hosted data is
written as part of this source change.

The old subjective charts have been removed. Services, background, grouped skills,
and a current project replace them. Personal photography remains a compact section.
Contact now creates a locally copied project brief with an Upwork link; it does not
claim to send a message. When clipboard permission is unavailable, the brief can
be selected and copied manually.

## Manual verification

Check Home, About, Projects, and Contact at 320, 390, 768, and 1440 px. Verify
keyboard focus, mobile menu Escape and resize, reduced motion, project API delay,
503, empty response, retry, and unavailable images. Check form validation,
clipboard denial, and brief text. Run lint, type checking, and a production build.

For an isolated QA server alongside development, use `PORTFOLIO_BUILD_DIR=.next-qa npm run build` and `PORTFOLIO_BUILD_DIR=.next-qa npx next start -p 3001`. Run `npm run test:profile` to verify content upgrades preserve custom edits and deleted records.
