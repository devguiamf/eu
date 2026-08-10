# Portfólio Cinematográfico

A dark, editorial, parallax-driven personal portfolio built with Next.js,
Tailwind CSS, [`motion`](https://motion.dev) and [Lenis](https://lenis.darkroom.engineering/).
Five full-screen sections connected by Lenis-driven scroll snapping, each with
its own layered parallax, scroll/intersection-triggered motion, and a full
reduced-motion fallback.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS 4** (CSS-first `@theme` tokens, no config file)
- **`motion`** (`motion/react`) for all animation
- **Lenis** + `lenis/snap` for smooth scroll and section snapping
- `clsx` + `tailwind-merge` for class composition

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
npx tsc --noEmit  # type-check
```

## Deploy with Docker

Production image uses Next.js `standalone` output. On a VPS (or locally):

```bash
docker compose up -d --build
```

Open [http://localhost:3000](http://localhost:3000) (or `http://<VPS-IP>:3000`).

To update after pulling new code:

```bash
git pull && docker compose up -d --build
```

## Structure

```
src/
  app/
    layout.tsx         # fonts, providers, GrainOverlay
    page.tsx            # composes the five sections + SectionNav
    globals.css          # @theme tokens, keyframes, reduced-motion safety net
  components/
    providers/
      MotionPreferenceProvider.tsx   # resolves prefers-reduced-motion + mobile breakpoint
      SmoothScrollProvider.tsx        # Lenis + lenis/snap lifecycle
    layout/
      SectionShell.tsx    # one 100dvh panel, registers snap + nav-group
      SectionNav.tsx        # dot navigation, tracks active panel via IntersectionObserver
      GrainOverlay.tsx      # global film-grain texture
    motion/
      ParallaxLayer.tsx    # section-local scroll-driven parallax
      Reveal.tsx             # rise + fade + scale entrance (whileInView)
      StaggerGroup.tsx       # cascading children entrance
      KineticText.tsx        # word-by-word masked rise (hero name)
      TiltCard.tsx             # pointer-driven 3D tilt + glow
      MagneticButton.tsx      # pointer-attracted button
      MediaSlot.tsx             # video/gif slot with procedural CSS fallback
    sections/
      HomeSection.tsx, TrajetoriaSection.tsx, TecnologiaSection.tsx,
      ProjetosSection.tsx, ContatoSection.tsx
  content/
    profile.ts, timeline.ts, stack.ts, projects.ts, contact.ts   # editable placeholder data
  hooks/
    usePrefersReducedMotion.ts, useIsMobile.ts, useSectionProgress.ts
public/
  media/README.md   # how to drop in real video/gif/portrait assets
```

## Editing content

Everything user-facing lives in `src/content/*.ts` — names, timeline
milestones, tech stack, projects, and contact links. Swap in real photos,
project loops, and the hero background by dropping files into `public/media/`
and pointing to them from those content files (see
[`public/media/README.md`](public/media/README.md)). No component code needs
to change; every media slot renders a procedural gradient placeholder until a
real `src` is provided.

## Motion & scroll architecture

- **Snapping is driven by Lenis**, not CSS `scroll-snap` (which fights
  Lenis's virtual scroll). `SmoothScrollProvider` creates a `Lenis` instance
  and a `lenis/snap` `Snap` instance that auto-registers every element
  carrying `data-snap-panel` (set by `SectionShell`).
- **Projetos is one snap panel per project** rather than an inner scroller,
  so each project transition is a full-panel parallax slide/scale, plus a
  final "selected work" index panel with a cursor-follow preview.
- **Motion tokens** (`src/lib/motion-tokens.ts`) define one signature easing,
  a three-step duration scale, and one entrance pattern (rise + fade + scale)
  reused by every section.
- **`MotionPreferenceProvider`** resolves `prefers-reduced-motion` and the
  mobile breakpoint once via `useSyncExternalStore` (safe for SSR, no
  hydration mismatch) and exposes a `parallaxFactor` (`0` or `1`) and
  `pointerEffectsEnabled` flag that every primitive reads instead of
  branching individually.
  - **Reduced motion**: no Lenis, no snap, no parallax — plain native scroll
    with opacity-only fades.
  - **Mobile** (and not reduced motion): Lenis + snap stay on, parallax
    depth is zeroed, tilt/magnetic pointer effects are disabled.
  - **Desktop**: full parallax, tilt, magnetic buttons, kinetic type.

## Verification performed

- `npx tsc --noEmit` — clean
- `npm run lint` (ESLint incl. React Compiler hook rules) — clean
- `npm run build` — clean production build
- Playwright, driven programmatically against a local dev server, screenshot
  every one of the 9 snap panels (Home, Trajetória, Tecnologia, 4× Projetos,
  Projetos selected-work list, Contato) in three configurations with zero
  console/page errors in each:
  - Desktop (1440×900)
  - Desktop with `reducedMotion: 'reduce'` emulated
  - Mobile (390×844, touch)

If you want to re-run the visual check yourself, the project has no
Playwright dependency committed (it was a one-off verification tool), so
`npm i -D playwright && npx playwright install chromium` first.

### Manual checklist (fallback if you can't run Playwright)

1. `npm run dev`, open the site, confirm all 5 sections snap into place on
   scroll and the right-hand dot nav tracks the active section.
2. Hover a Tecnologia chip/card and a Projetos panel — confirm tilt/glow and
   the title reveal.
3. In DevTools, enable "Emulate CSS prefers-reduced-motion: reduce" — confirm
   scrolling becomes native (no snap), and sections simply fade in.
4. Resize to a mobile width (~390px) — confirm parallax stops, tilt/magnetic
   effects are disabled, and Trajetória/Tecnologia become internally
   scrollable instead of clipping content.
