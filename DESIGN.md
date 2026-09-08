---
name: Sergio Portfolio
description: An illustrated field journal for a design-literate engineer, read in day ivory or night galaxy.
colors:
  bg: "#f6f1e4"
  surface: "#fbf7ec"
  surface-solid: "#fffdf7"
  border: "#29221926"
  border-strong: "#2922193d"
  ink: "#211b14"
  ink-muted: "#6c6252"
  ink-faint: "#948a78"
  accent: "#2f4d8a"
  accent-hover: "#24406f"
  accent-ink: "#fbf7ec"
  brass: "#8a5f1f"
  brass-ink: "#211b14"
  danger: "#9c3b34"
  bg-dark: "#0a0d18"
  surface-dark: "#ffffff14"
  surface-solid-dark: "#10131f"
  border-dark: "#ffffff1c"
  border-strong-dark: "#ffffff2e"
  ink-dark: "#eef0f7"
  ink-muted-dark: "#9aa1bd"
  ink-faint-dark: "#676f8f"
  accent-dark: "#8299ec"
  accent-hover-dark: "#9db0f0"
  accent-ink-dark: "#0a0d18"
  brass-dark: "#d9b872"
  brass-ink-dark: "#0a0d18"
  danger-dark: "#e0908c"
typography:
  display:
    fontFamily: "Old Standard TT, ui-serif, Georgia, serif"
    fontWeight: 700
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontWeight: 500
    letterSpacing: "0.2em"
rounded:
  sm: "8px"
  md: "12px"
  pill: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
---

# Design System: Sergio Portfolio

## Overview

**Creative North Star: "The Illustrated Field Journal"**

The site reads as one astronomical field journal kept in two lights: day pages on warm ivory paper with ink-line borders, night pages under a near-black galaxy sky with translucent glass panels. Toggling day/night is not a palette inversion bolted onto a dashboard — it is turning the same journal's pages under a different lamp. Hierarchy comes from a serif display voice (headlines, section titles) set against a plain sans body, with a monospace register reserved for genuinely data-shaped content: dates, timelines, tech stacks, catalog-style badges. Surfaces stay flat and hairline-bordered rather than card-and-shadow heavy; corners stay restrained; color is used sparingly — one cool ink-blue accent for interaction, one warm brass for specimen-style labeling.

**Key Characteristics:**
- Two themes, one world: same tokens, same type pairing, same border-first surface language, only lightness and glass quality invert.
- Hairline borders carry definition; box-shadow is not used for card depth.
- A serif display voice is reserved for headlines; body copy and controls stay in a plain sans; a monospace register marks dates, stacks, and catalog-style tags — never decorative "technical" flavor text.
- Two accents, each with one job: ink-blue for interactive/active state, brass for specimen/role labeling (Projects' role badges, feature bullets).

## Colors

A restrained palette: one neutral scale per theme (paper/ink or navy/glass), one interactive accent, one labeling accent.

### Primary
- **Celestial Ink** (`#2f4d8a` light / `#8299ec` dark — `accent` / `accent-dark`): interactive color — active nav link and its underline, focus rings, form submit buttons, the theme-toggle knob, success-state check. Carries the site's one "you can act here" signal.

### Secondary
- **Brass Specimen** (`#8a5f1f` light / `#d9b872` dark — `brass` / `brass-dark`): labeling accent only — Projects' role badges and key-feature bullet dots. Reads like a cataloguer's tag, never used for primary interaction.

### Neutral
- **Journal Paper** (`#f6f1e4` — `bg`) / **Deep Galaxy** (`#0a0d18` — `bg-dark`): page ground.
- **Paper Card** (`#fbf7ec` — `surface`) / **Glass Panel** (`rgba(255,255,255,0.078)` — `surface-dark`): card and chrome backgrounds. Light is an opaque warm paper tone. Dark is a translucent overlay carrying a 16px backdrop blur wherever it renders (applied globally to every `.bg-surface` element under `[data-theme="dark"]` in `src/index.css`, not per-component) — restrained enough to read as glass rather than fog, with `@supports` fallback to the flat tint on browsers without `backdrop-filter`.
- **Warm Ink** (`#211b14` — `ink`) / **Star Ink** (`#eef0f7` — `ink-dark`): primary text.
- **Muted Ink** (`#6c6252` — `ink-muted`) / **Muted Star** (`#9aa1bd` — `ink-muted-dark`): secondary text — descriptions, meta lines, captions. ~5.3:1 (light) / ~7.6:1 (dark) against page background.
- **Faint Ink** (`#948a78` — `ink-faint`) / **Faint Star** (`#676f8f` — `ink-faint-dark`): decorative-only (e.g. the skill-list middle-dot separators) — under body-text contrast by design, never used for legible copy.
- **Hairline** (`#29221926` — `border`) / **Hairline Dark** (`#ffffff1c` — `border-dark`): the default border on cards, dividers, and section rules.
- **Hairline Strong** (`#2922193d` / `#ffffff2e`): stronger border for placeholder frames and scrollbar thumbs.
- **Signal Red** (`#9c3b34` / `#e0908c` — `danger` / `danger-dark`): form error text only.

### Named Rules
**The Hairline Rule.** Card and panel depth comes from a 1px border (`border-border`), never `box-shadow`. No card in the system carries a drop shadow.

## Typography

**Display Font:** Old Standard TT (with ui-serif, Georgia, serif fallback)
**Body Font:** Inter (with ui-sans-serif, system-ui, sans-serif fallback)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, SFMono-Regular, monospace fallback)

**Character:** A classic scholarly-journal serif (Old Standard TT ships only Regular/Bold/Italic — no synthetic weights; `font-synthesis: none` is set globally, so display text always uses `font-bold`, never `font-semibold`/`font-medium`) carries every headline and section title against Inter's plain, highly legible body voice — the pairing of an old-book display face with a modern workhorse sans is the "field journal" read. IBM Plex Mono marks only literal data: dates/periods, tech-stack tags, timestamps, role badges, kicker labels like "Focus" — never used as generic small-caps decoration.

### Hierarchy
- **Display** (`font-bold`, `text-5xl`–`text-8xl` depending on section, `tracking-tight`): section titles and the Home name headline. `font-display` + `font-bold` only — the family has no 500/600 weight to reach for.
- **Subhead** (`font-semibold`, `text-2xl`–`text-3xl`, Inter): role/title lines directly under a display headline (e.g. "Computer Engineer").
- **Body** (`font-normal`, `text-base`–`text-xl`, `leading-7`, Inter): descriptions and paragraph copy; `max-w-prose`/`max-w-2xl` keeps measure in the 65–75ch range.
- **Label** (`font-medium`/`font-semibold`, `text-[10px]`–`text-xs`, `tracking-[0.2em]`–`tracking-[0.22em]`, uppercase, IBM Plex Mono): dates, timelines, stack tags, role badges, "Focus"/section kickers under carousels.

### Named Rules
**The Weight Floor Rule.** `font-display` never pairs with `font-medium` or `font-semibold` — Old Standard TT has no intermediate weight, and with font-synthesis disabled the browser would silently render it at 400 instead. Display text is `font-normal` (body-length quotes/taglines, e.g. the italic pull-quote on Home) or `font-bold` (headings).

## Layout

Single-page spatial canvas (unchanged by this pass): Home/About/Projects/Connect are absolutely positioned at fixed coordinates and the viewport pans between them via a Motion transform (`ease [0.22, 1, 0.36, 1]`, 0.7s). Each section scrolls independently inside a `h-[calc(100vh-4rem)]` frame under the sticky 64px header. Content is centered in a `max-w-6xl` (or `max-w-3xl`/`max-w-2xl` for reading columns) container with `px-6 sm:px-10 lg:px-8` gutters. Regions are divided by hairline `border-t` rules rather than background changes.

Each section is a different *page type* in the same journal, and the composition says which:

- **Home — title page.** Asymmetric `[1fr, 0.72fr]` split; the name runs at display scale over a short `w-16` title rule; the portrait sits as a mounted plate across a full-height `lg:border-l` gutter rule. Visitor notes close the page as a quiet ruled band.
- **About — essay pages and ledgers.** Full-viewport statement spreads (opening claim, inspiration) alternate with ledger regions (Education, Experience) where the date sits in an `8rem` right-aligned margin rail and the entry body runs in the wide column. Nested sub-roles indent behind a 1px `border-l`.
- **Projects — catalog plates.** A height-bounded region: chapter head, coverflow track (`flex-1`), scroll hint. Card internals shrink-to-fit against `--fit` rather than scrolling.
- **Connect — correspondence page.** Two panels: a ruled contact directory above the message form, and the visitor-notes feed.

Vertical rhythm is asymmetric by rule (below), not one repeated value: statement regions get viewport height, ledger regions `pt-24 pb-20` (`lg:pt-28 lg:pb-24`), and entries inside them `py-12`.

### Named Rules
**The Margin-Date Rule.** In any dated ledger (Education, Experience), the date is a mono annotation in its own right-aligned margin rail — never a line stacked inside the entry body. The rail collapses above the entry on mobile.

**The Breathe-Above Rule.** Every heading carries more space above it than below (`pt-24` over `pb-20`; `mt-12` under a chapter rule). Regions never open and close on the same value.

## Elevation & Depth

Flat by design — no card, button, or panel in the system carries `box-shadow`. Depth reads instead from the hairline border plus, in dark mode only, a translucent glass surface (`--color-surface: rgba(255,255,255,0.078)`) layered over the near-black ground. Every element painted with `bg-surface` — section cards, the skill-card index, the mobile nav drawer, chrome controls like the theme toggle — carries a 16px backdrop blur in dark mode (one rule in `src/index.css` targeting `[data-theme="dark"] .bg-surface`, not a per-component class), so the surface reads as glass sitting a hair above the galaxy ground rather than a flat, opaque box. `bg-surface-solid` (the Home portrait mount) is the deliberate exception: it stays fully opaque in both themes because a photograph needs a stable, non-translucent frame, not a glass one.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest; the only depth cue is the 1px hairline border (opaque paper tone in light, low-alpha glass in dark) plus backdrop-blur wherever `bg-surface` renders in dark mode — a fixed chrome layer or a static card, it makes no difference.
**The Glass-Is-A-Token Rule.** Blur is never added to an individual component's className. It rides on the `bg-surface` utility itself via one global CSS rule, so every current and future surface panel gets it automatically and consistently.
**The No-Blur-On-A-Moving-Backdrop Rule.** `backdrop-filter` forces a resample of everything behind an element every frame its own transform changes or its backdrop scrolls; stacked across several cards that's a measured FPS drop, not a theoretical one. Any `bg-surface` element that lives inside a continuously-scrolling or scroll-transformed track (Projects' coverflow and mobile card lists) adds `perf-flat` alongside it — the tinted glass color stays, the blur drops. This is the one place `bg-surface` does not get its automatic blur; it's a documented, deliberate exception, not a regression.

## Shapes

Restrained corner language: cards and framed panels use `rounded-lg`/`rounded-xl` (8–12px), never `rounded-2xl` or larger. Full pill radius (`rounded-full`) is reserved for controls and tags — the theme toggle track, submit buttons, role/stack badges, carousel dot indicators — never for content cards. The portrait photo sits inside a bordered "plate" frame (`rounded-xl border border-border bg-surface-solid p-2` wrapping a `rounded-lg` image) rather than being cropped directly to a rounded corner.

## Components

### Primitives (`src/components/ui/`)

Three shared primitives own the system's repeated marks. Compose these rather than re-typing their classes.

- **`MetaLabel`** — the annotation register: mono, uppercase, tracked, `text-ink-muted`. Sizes `xs` (10px / `0.22em`, the default field label) and `sm` (12px / `0.2em`, standalone captions); `size="custom"` drops the built-in size and tracking so a caller can scale it (the coverflow card sizes everything against `--fit`, and date rails tighten to `0.12em`). Renders a `span` unless given `as`.
- **`SectionHeading`** — the chapter head: display-serif title, optional standfirst, closed by a full-width hairline rule. Sizes `md` and `lg`.
- **`Tag`** — `variant="badge"` is a specimen label (pill, uppercase: role badges, academic honors); `variant="stack"` is a literal token that keeps its own casing (`rounded-md`: languages, libraries). `tone="brass"` marks cataloguing, `tone="default"` is neutral. `size="custom"` drops padding/size for `--fit` scaling.

### Buttons
- **Shape:** full pill (`rounded-full`).
- **Primary:** `bg-accent text-accent-ink`, `px-6 py-2.5`, `font-semibold`; used for form submits (Send message, Post).
- **Hover / Focus:** background shifts to `accent-hover`; global `:focus-visible` draws a 2px accent outline with 2px offset (set once on `:root`, not per-component).
- **Ghost text button:** underline-on-hover, `text-ink-muted`, mono uppercase tracking — used for "Send another message."

### Chips / Badges
- **Role badge** (Projects): `Tag tone="brass"` — reads as a specimen/catalog tag, distinct from the interactive accent. Sits in a metadata row with the timeline, above the title.
- **Tech-stack tag:** `Tag variant="stack"` — mono, original casing, `rounded-md`.
- **Honor tag** (About/Education): `Tag` default tone, so awards read as awards rather than stray muted text.

### Contact directory (Connect)
Not chips. A ruled ledger: each channel is a full-width row (`border-b border-border`, `py-3.5`) with a fixed `sm:w-20` mono label in the margin, the value in `text-ink` semibold, and a faint chevron at the right edge that goes accent on hover. Rows stack label-over-value below `sm`. The panel supplies the boundary, so the block carries no border of its own.

### Cards / Containers
- **Corner Style:** `rounded-lg` (image frames, skill cards) to `rounded-xl` (panels, project cards).
- **Background:** `bg-surface` (opaque paper in light, translucent glass in dark); `bg-surface-solid` for photographic mounts (the Home portrait plate).
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** `border border-border` on every card/panel.
- **Internal Padding:** `p-4`–`p-8` depending on density (mobile project card vs. desktop Connect panel).
- **Project card:** a catalog plate — image plate, then a metadata row (role tag + timeline), title in display serif, description, then a hairline rule separating the entry from its specs (key features, stack).
- **Skill card:** an index card — `MetaLabel` head, hairline, the skill list, hairline, then the count line pinned at the base.

### Named Rules
**The One-Rule-Per-Break Rule.** A hairline separates *kinds* of content, not every block. A card carries at most one internal rule (entry vs. specs); an index card carries two because its head and footer are distinct registers from its body.

### Inputs / Fields
- **Style:** `border border-border`, transparent background, `rounded-lg`, `min-h-11`.
- **Focus:** border shifts to `accent`, `focus:ring-2 focus:ring-accent/20`.
- **Error:** `text-danger` message below the field, not an inline border-color error state.

### Navigation
- **Style:** sticky header, `border-b border-border`, solid `bg-bg/95` in light and `bg-bg/75` + `backdrop-blur-md` only in dark (light stays paper-opaque; dark reads as glass — see The No-Blur-On-A-Moving-Backdrop Rule for why blur is scoped this deliberately). Desktop links are plain `text-ink-muted`, hover to `text-ink`; the active link is `text-accent font-semibold` with a `layoutId`-animated 1px accent underline. Mobile: a full-screen `bg-bg/98` drawer (dark: `bg-bg/85` + blur) with `font-display font-bold text-3xl` links stacked with hairline dividers, active link in accent.
- **Theme toggle:** a pill track (`border-border bg-surface`) with a solid `bg-accent` knob carrying a drawn sun/moon SVG glyph (no emoji) that slides via Motion `layout`.
- **Scroll chaining:** wheeling past a section's bottom (or past its top, going up) navigates to the next (or previous) section in nav order — Home ↔ About ↔ Projects ↔ Connect, clamped at both ends, never wrapping. `useScrollChainNavigation` (`src/hooks/`) owns this: it requires an accumulated overscroll past the boundary (one deliberate mouse-wheel click, or a sustained trackpad push) before it fires, and locks out re-triggering for the length of the camera pan, so one gesture can't skip two sections. It always defers to a nested scrollable region that still has room to move (Connect's comment feed, any future inner panel) — a nested scroller never gets hijacked mid-scroll.
- **Horizontal-hijack carousels:** both the Projects coverflow and About's Skills row redirect a vertical wheel gesture into horizontal movement while the pointer is anywhere over their section — vertical wheel has nothing else to do there. The coverflow (no CSS snap, its own fling physics) nudges `scrollLeft` continuously and claims the gesture unconditionally (`stopPropagation`, so it never also triggers scroll-chain navigation mid-drag). The Skills row *is* `snap-x snap-mandatory`, and a mandatory-snap container fights small incremental `scrollLeft` nudges — the browser pulls straight back to the nearest snap point, so a per-tick nudge there visually does nothing. `useWheelSnapScroll` (`src/hooks/`) instead pages it one card at a time via `scrollTo(card.offsetLeft)`, gated by the same accumulate-then-fire cadence as scroll-chain navigation, and releases the event untouched at either end — so wheeling past the last card hands off cleanly to scroll-chain navigation. **The mechanism a horizontal carousel needs depends on whether it uses CSS scroll-snap — check that before reusing either hook.**

  `useWheelSnapScroll` takes two refs, not one, and the split matters: `hitAreaRef` (the whole Skills `<section>`) is where the listener attaches, `scrollRef` (the row itself, a few hundred px tall) is what actually scrolls. A `snap-x` row is usually far shorter than the section around it — a cursor resting anywhere natural while the page scrolls has no reason to be hovering that exact narrow band, and listening only on the row misses most real gestures. But the hit area can't be the trigger condition either: it additionally checks `scrollRef`'s own `getBoundingClientRect()` and only claims the event once the row has *some* on-screen presence, so scrolling still behaves normally while only the section heading is in view and the row is still below the viewport — the row being visible is the real condition, cursor position over the wider hit area is just how the listener reaches it. See The Horizontal-Hijack Rule.

### Named Rules
**The Horizontal-Hijack Rule.** A component that redirects vertical wheel into its own horizontal scroll must call `stopPropagation`, at minimum while it still has scroll room — otherwise the same wheel tick also reaches `useScrollChainNavigation` on the ancestor `Section` and fires a second, unrelated behavior (section navigation) from one gesture. Releasing the event at the scroll boundary (letting it bubble, uninterrupted) is what hands off to scroll-chain navigation on purpose — that's a choice per carousel, not accidental.

### Decorative marks (`src/components/decor/`)

The journal's illustration layer — thin, ink-like, non-representational marks that read as an annotator's hand rather than UI chrome. Five shapes plus one mounting primitive:

- **`OrbitalArc`** — a partial elliptical sweep (`sweep`/`offset` as percent of circumference, `flatten` for how squashed the ellipse is, `rotate` in degrees). The signature celestial motif.
- **`Ring`** — the same ellipse, fully closed. The plain "circle" in the vocabulary.
- **`TrajectoryLine`** — a fine, gently bowed path (`bow` controls the curve depth). Always curved, never straight, so it can never be mistaken for a structural `border-t`/`h-px` divider.
- **`MarkerTick`** — a small crosshair with a hollow center dot: a field-journal habit of marking one exact point, not a generic UI dot.
- **`WindCurrent`** — a long ink stroke of moving air, in four authored variants (`drift`, `swell`, `veer`, `eddy`). Every path enters left of its viewBox and exits right of it, so a current always passes *through* the frame instead of floating inside it; `vectorEffect="non-scaling-stroke"` keeps it hairline-thin however far it is stretched. Used by `DayCurrents`, not placed inside sections.
- **`MaskedArt`** — renders an authored SVG asset as a CSS `mask-image` rather than an `<img>`: the file supplies the shape via its alpha, `currentColor` supplies the colour. This is what lets hand-drawn artwork obey the token system — the artwork's own baked hex never reaches the page, and a caller tints it with the same `text-*` tokens every other primitive uses. It also keeps large path data in a cached, gzipped external file instead of the JS bundle. Size the element to the artwork's own aspect ratio (`aspect-[744/214]`), never to a fixed height, or `mask-size: 100% 100%` will stretch the drawing.
- **`DecorField`** — the mandatory wrapper every mark ships inside: `absolute inset-0 overflow-hidden pointer-events-none` on a `relative` ancestor. It clips its contents to that ancestor's box (so an off-center or transformed mark can never grow a scrolling ancestor's scrollable area — the same class of bug the coverflow track guards against for its own cards) and is fully inert (`aria-hidden`, no pointer events) by construction, not by call-site discipline.

Every shape takes color and opacity from the caller's `className` (they draw in `currentColor`). Section-scoped marks all use `text-ink-faint` — the one token defined as decorative-only and sub-body-contrast by design — so a mark inside a composition is never mistaken for legible content, and never competes with the interactive/labeling accents. The background atmospheres are the deliberate exception: `DayCurrents` draws in `accent` and `brass` at 0.10–0.16 opacity, because a colored ink wash on paper is the whole point of that layer. It still introduces no new hue — it reuses the same two accents the rest of the system already owns.

### The background atmospheres (`NightSky` and `DayCurrents`)

These are architecturally different from the section-scoped marks above: they are the persistent environment, not an illustration inside one section. Each mounts exactly once, in `App.tsx`, as a sibling *before* `StickyNavbar` and `SpatialCanvas` — never inside a section, never inside the panned canvas — so navigating between Home/About/Projects/Connect moves the camera across one continuous environment instead of cutting to a new background per section. Both are `position: fixed; inset: 0`, `pointer-events-none`, `aria-hidden`, `overflow-hidden`, and both carry the opaque `bg-bg` ground.

They are mutually exclusive and theme-gated by their only piece of theme logic: `NightSky` is `hidden dark:block`, `DayCurrents` is `dark:hidden`. Exactly one is displayed at any time, which is what lets the sections stop painting a ground of their own.

- **`NightSky` (dark).** Two large, near-invisible (`opacity-[0.07]`–`opacity-[0.09]`) `Ring`/`OrbitalArc` instances for celestial depth, plus a sparse field of ~80 `<circle>` points across three size/brightness tiers (55 dim and tiny, 20 mid, 8 near-and-brighter — a real sky has far more dim points than bright ones). Positions come from a seeded `mulberry32` PRNG at module load, never `Math.random()` in a render path.
- **`DayCurrents` (light).** Three hand-placed `WindCurrent` strokes — moving air over paper, the counterpart to the star — on `accent` and `ink-faint` at 0.10–0.14 opacity. Two are dropped below `sm`. Placement is authored per stroke, never looped (see The Sparse-and-Asymmetric Rule).

The background layers hold texture only. **Representational artwork never goes in them** — the hand-drawn clouds and flourishes are placed marks inside sections instead (below), because a drawing stretched across the whole viewport stops being a drawing and becomes wallpaper.

For the ground layers to be visible, the sections stopped painting their own: `Section.tsx`'s content wrapper and `About.tsx`'s root carry no `bg-*` class at all, in either theme. This is also *why* the dark-mode glass panels (`bg-surface` + backdrop-blur, from Elevation & Depth above) have real atmosphere to show through rather than a flat navy fill.

**Motion.** Both layers animate, both are gated inside one `@media (prefers-reduced-motion: no-preference)` block in `src/index.css`, and both are property-choices made for compositor cost rather than for looks:

- Stars use `star-twinkle` (opacity 1 ↔ 0.5), each with its own `--twinkle-delay`/`--twinkle-duration`.
- Currents use `wind-drift`, a `translate3d` of ~1% over 46–70s, each with its own `--drift-x`/`--drift-y`/`--drift-duration`/`--drift-delay` set through Tailwind arbitrary-property utilities. Transform is the one property that animates on the compositor *without* repainting, which matters because these strokes are viewport-sized — animating `stroke-dashoffset` here would repaint a full-viewport path every frame. Negative delays start each current mid-cycle so nothing sweeps in lockstep.

A visitor who has asked for reduced motion gets both layers fully static, at each element's resting state — not a slowed-down animation. The large depth shapes in `NightSky` never animate in either preference.

### Artwork marks (where the drawings live)

The hand-drawn assets are **section-scoped marks, not background** — each is placed through `DecorField` in one section's negative space, sized in `rem` rather than viewport units, and tinted `text-ink-faint` at 0.25–0.45 like every other decorative mark. Small and specific beats large and ambient: at viewport scale the engraved hatching smears into a wash and the drawing stops reading as a drawing.

**Clouds are shared; flourishes are theme-split.** A cloud appears in both themes. The lineart curls are the *day* flourish (`dark:hidden`) and the star clusters the *night* one (`hidden dark:block`), and the two are placed as a pair in the same slot. So a section shows the same number of marks in either theme — the drawing just changes with the light, which is the same "two versions of one world" thesis the palette runs on.

| Section | Cloud (both) | Day flourish | Night flourish |
|---|---|---|---|
| Home | `cloud-2` upper left | `lineart-4` lower left | `stars-4` lower left |
| About — opening statement | `cloud-2` upper right | `lineart-1` upper left | `stars-1` upper left |
| About — inspiration | `cloud-3` upper right | `lineart-3` lower left | `stars-3` lower left |
| Projects | `cloud-3` beside the chapter head | `lineart-2` lower right | `stars-2` lower right |
| Connect | `cloud-2` upper left | — (`MarkerTick`, both themes) | — |

Plus `line-halo`, which rings the Home portrait in both themes — a frame, not a mark. Only two distinct clouds ship (`cloud-2`, `cloud-3`); `cloud-1` and `cloud-4` are prepared and unused, retired in favor of `cloud-2` (the lightest file) reused at a second size everywhere `cloud-1` used to sit — reuse is free, a third distinct cloud is not. Each mark obeys The Sparse-and-Asymmetric Rule and The Never-On-Cards Rule: a section carries at most two visible marks per theme, so adding one means retiring one, not stacking.

**Cost.** The decorative set is ~90 KB gzipped, and the two clouds are ~70 KB of it — they are dense hatching, and hatching does not compress the way a hairline does. All of it is cached, parallel, and non-blocking, and reusing a cloud at a second size is free. Adding a *third* distinct cloud is the line where this stops being cheap.

### Authored SVG assets

Hand-drawn artwork lives in `src/assets/` in two forms, and the distinction matters:

- **Originals** (`Cloud2.svg`, `Cloud3.svg`, `Line Halo.svg`, `Lineart1–4.svg`, and the unused rest) are the designer's exports — a matched set on one 750×750 artboard. They are source material: never edited, never imported by the app.
- **Derivatives** (`cloud-2.svg`, `cloud-3.svg`, `line-halo.svg`, `lineart-1…4.svg`, `stars-1…4.svg`) are what ship. Each is SVGO-optimized at `--precision=2` and re-cropped via `viewBox` to the artwork's real content bounds — the originals draw inside the middle ~28–60% of an otherwise empty square, which makes precise anchoring impossible. Crop bounds are computed from the path data, not eyeballed. Vite emits the larger files as cached assets and inlines the ~2 KB lineart as data URIs. `cloud-1.svg` was generated, used, and then deleted when it was retired in favor of `cloud-2` — regenerate it from the untouched original (`Cloud1.svg`) if it returns. `cloud-4.svg` is generated and present but was never imported by any component; both are candidates before cropping a new cloud from scratch.

The optimization is not cosmetic: the originals carry six decimal places per coordinate (`425.871094` — sub-nanometer precision on a decorative cloud), and stripping it cut `Cloud2.svg` from 50 KB to 18 KB gzipped with no visible change. Regenerate a derivative rather than hand-editing it, and keep the original untouched so it stays regenerable.

### Named Rules
**The One-Sky Rule.** A background atmosphere lives once, at the App root, outside the spatially-panned canvas. It is never re-mounted or re-positioned per section — a per-section starfield or wind field would visibly jump on every camera transition, which defeats the entire point of a "continuous" environment. Exactly one atmosphere is displayed per theme, and it owns the ground color, because no section paints one any more.
**The Sparse-and-Asymmetric Rule.** One or two marks per section, in its emptiest region, never mirrored or centered on the content. A section this dense with content (Projects' coverflow, Connect's two panels) earns at most one small mark near its heading, never one per card or per region. This is illustration, not a repeating background pattern — if a placement could be generated by a loop, it's wrong.
**The Never-On-Cards Rule.** Decorative marks live in section-level negative space (hero margins, statement-page corners, header gutters) — never inside a card, panel, or list item, and never overlapping body text. They support a composition; they never sit inside the content itself.

## Do's and Don'ts

### Do:
- **Do** compose `MetaLabel`, `SectionHeading`, and `Tag` from `src/components/ui/` instead of re-typing their class strings; if a new mark repeats three times, it becomes a primitive there too.
- **Do** open every content region with a `SectionHeading` so its hairline rule keeps the chapter rhythm consistent across About, Projects, and Connect.
- **Do** keep every color reference to a token (`bg-*`, `text-*`, `border-*` on `--color-*`) so light/dark stay one system; never hardcode a hex or a Tailwind neutral-slate class in a component.
- **Do** use IBM Plex Mono only for literal data (dates, stack names, counts, timestamps) — it is a measurement register, not a decoration.
- **Do** reserve `font-display` headings for `font-bold` only (see The Weight Floor Rule).
- **Do** define depth with a 1px `border-border`; add `backdrop-blur` only where a fixed layer sits over moving content, and never on a surface inside a scrolling or scroll-transformed track (see The No-Blur-On-A-Moving-Backdrop Rule).
- **Do** wrap every decorative mark in `DecorField` and place it via `src/components/decor/`; never hand-roll an absolutely-positioned SVG in a section file.
- **Do** mount any persistent, cross-section background effect (like `NightSky` or `DayCurrents`) once at the App root, outside `SpatialCanvas`'s panned layer — see The One-Sky Rule.
- **Do** keep a section's own background transparent. The atmosphere layers own the ground color now; a `bg-bg` added back onto a section, a section root, or a full-bleed region will silently paint over the whole environment.
- **Do** gate any new decorative motion behind `@media (prefers-reduced-motion: no-preference)`, and generate any pseudo-random decorative layout (star positions and similar) with a seeded PRNG at module scope, never `Math.random()` in a render path.

### Don't:
- **Don't** add `box-shadow` to cards, buttons, or panels — the system is flat-by-default.
- **Don't** use `rounded-2xl` or larger on content cards; pill radius is for controls/tags only.
- **Don't** reach for Unicode glyphs or emoji as icons (the theme toggle and carousel arrows are drawn SVG for this reason) — draw a matching-stroke SVG instead.
- **Don't** introduce a third accent color; the system deliberately has exactly two (`accent` for interaction, `brass` for labeling).
- **Don't** nest a bordered card inside a bordered panel. When a group needs separation inside a panel, use hairline-divided rows (the contact directory) rather than a second box.
- **Don't** repeat one vertical spacing value down a section; see The Breathe-Above Rule.
- **Don't** animate the four section-scoped decorative marks (`OrbitalArc`, `Ring`, `TrajectoryLine`, `MarkerTick`); they stay static illustration. `NightSky`'s star twinkle is the one deliberate exception, and it is a background-atmosphere concern, not a precedent for animating marks inside a section's own composition.
- **Don't** grow either atmosphere into a full particle system, ribbon field, or scroll/pointer-reactive effect. Both are deliberately a fixed composition plus one cheap, compositor-only ambient animation; anything reactive is a later, separate decision.
- **Don't** animate `stroke-dashoffset`, `filter`, or `backdrop-filter` on a viewport-sized decorative element. Ambient background motion is limited to `transform` and `opacity`, the two properties that animate without repainting.
