# Design Brief

## Direction
ProjectDesk — Student academic project submission & tracking platform with status visibility.

## Tone
Refined minimalism with educational trust: trustworthy, accessible, and professional without unnecessary decoration.

## Differentiation
Semantic status badges with subtle animations provide immediate visual feedback on submission progress.

## Color Palette

| Token            | OKLCH          | Role                           |
| ---------------- | -------------- | ------------------------------ |
| background       | 0.145 0.014260 | Primary surface                |
| foreground       | 0.95 0.01 260  | Text on background             |
| card             | 0.18 0.014 260 | Elevated content sections      |
| primary          | 0.75 0.15 190  | CTAs, active states (cyan)     |
| muted            | 0.22 0.02 260  | Secondary surfaces             |
| destructive      | 0.55 0.2 25    | Errors, warnings (red)         |
| success (chart1) | 0.75 0.15 190  | Ready/approved states (green)  |
| warning (chart4) | 0.75 0.18 85   | In-progress states (amber)     |

## Typography

- Display: Space Grotesk — headings, section titles
- Body: DM Sans — all body text, labels, form fields
- Scale: hero `text-4xl md:text-5xl font-bold`, h2 `text-2xl font-bold`, label `text-sm font-semibold`, body `text-base`

## Elevation & Depth

Subtle layering through card backgrounds and shadows. Dark background with elevated card surfaces (0.18L vs 0.145L). Shadows: `shadow-card` for content, `shadow-elevated` for modals.

## Structural Zones

| Zone           | Background      | Border              | Notes                                     |
| -------------- | --------------- | ------------------- | ----------------------------------------- |
| Header         | card (0.18L)    | border-b subtle     | Logo, nav, user menu                      |
| Main Content   | background      | —                   | Alternating card backgrounds              |
| Form Sections  | card elevated   | border subtle       | Section grouping with padding             |
| Status Badges  | card + opacity  | —                   | Submitted/Progress/Ready/Error semantics  |
| Footer         | muted/40        | border-t subtle     | Links, attribution                        |

## Spacing & Rhythm

Spacer gaps 4–6 units (1rem–1.5rem) between sections. Card padding 1.5rem–2rem. Form inputs use 0.75rem internal padding. Micro-spacing: 0.5rem gaps between form fields.

## Component Patterns

- Buttons: cyan `bg-primary` on hover `bg-primary/90`, rounded 6px, `font-semibold`, transition-smooth
- Cards: `bg-card` with `shadow-card`, rounded 8px, border-subtle on hover
- Badges: `status-badge` base class + `status-{submitted|progress|ready|error}` modifiers, animated opacity on state change
- Inputs: `bg-input` with `border-border`, focus `ring-primary`, placeholder `text-muted-foreground`

## Motion

- Entrance: fade-in + slide-up 0.3s on page load
- Hover: button scale 1.02, card shadow lift on group-hover
- Status transition: badge fade + slide 0.2s on status change

## Constraints

- No gradients — solid semantic colors only
- Status colors must pass AA contrast in dark mode
- No animations > 0.3s (keeps UI snappy)
- Mobile-first: cards stack at sm breakpoint, 2-col grid at md+

## Signature Detail

Animated status transition badges — when a student's project status updates, the badge fades and shifts position subtly, signaling that the system has processed their submission (psychology: action → feedback → confidence).
