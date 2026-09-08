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
  surface-dark: "#ffffff0c"
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
- **Paper Card** (`#fbf7ec` — `surface`) / **Glass Panel** (`rgba(255,255,255,0.047)` — `surface-dark`): card and chrome backgrounds; light is an opaque warm paper tone, dark is a translucent overlay meant to be read against the navy ground (pairs with `backdrop-blur` where a header or drawer needs legibility over moving content).
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

Flat by design — no card, button, or panel in the system carries `box-shadow`. Depth reads instead from the hairline border plus, in dark mode only, a translucent glass surface (`--color-surface: rgba(255,255,255,0.047)`) layered over the near-black ground, paired with `backdrop-blur` on the sticky header and the mobile nav drawer so it stays legible while content moves behind it.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest; the only depth cue is the 1px hairline border (opaque paper tone in light, low-alpha glass in dark) plus backdrop-blur where a fixed chrome layer sits above scrolling content.

## Shapes

Restrained corner language: cards and framed panels use `rounded-lg`/`rounded-xl` (8–12px), never `rounded-2xl` or larger. Full pill radius (`rounded-full`) is reserved for controls and tags — the theme toggle track, submit buttons, role/stack badges, carousel dot indicators — never for content cards. The portrait photo sits inside a bordered "plate" frame (`rounded-xl border border-border bg-surface p-1.5` wrapping a `rounded-lg` image) rather than being cropped directly to a rounded corner.

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
- **Style:** sticky header, `bg-bg/85` + `backdrop-blur-md`, `border-b border-border`. Desktop links are plain `text-ink-muted`, hover to `text-ink`; the active link is `text-accent font-semibold` with a `layoutId`-animated 1px accent underline. Mobile: a full-screen `bg-bg/97` drawer with `font-display font-bold text-3xl` links stacked with hairline dividers, active link in accent.
- **Theme toggle:** a pill track (`border-border bg-surface`) with a solid `bg-accent` knob carrying a drawn sun/moon SVG glyph (no emoji) that slides via Motion `layout`.

## Do's and Don'ts

### Do:
- **Do** compose `MetaLabel`, `SectionHeading`, and `Tag` from `src/components/ui/` instead of re-typing their class strings; if a new mark repeats three times, it becomes a primitive there too.
- **Do** open every content region with a `SectionHeading` so its hairline rule keeps the chapter rhythm consistent across About, Projects, and Connect.
- **Do** keep every color reference to a token (`bg-*`, `text-*`, `border-*` on `--color-*`) so light/dark stay one system; never hardcode a hex or a Tailwind neutral-slate class in a component.
- **Do** use IBM Plex Mono only for literal data (dates, stack names, counts, timestamps) — it is a measurement register, not a decoration.
- **Do** reserve `font-display` headings for `font-bold` only (see The Weight Floor Rule).
- **Do** define depth with a 1px `border-border`; add `backdrop-blur` only where a fixed layer sits over moving content.

### Don't:
- **Don't** add `box-shadow` to cards, buttons, or panels — the system is flat-by-default.
- **Don't** use `rounded-2xl` or larger on content cards; pill radius is for controls/tags only.
- **Don't** reach for Unicode glyphs or emoji as icons (the theme toggle and carousel arrows are drawn SVG for this reason) — draw a matching-stroke SVG instead.
- **Don't** introduce a third accent color; the system deliberately has exactly two (`accent` for interaction, `brass` for labeling).
- **Don't** nest a bordered card inside a bordered panel. When a group needs separation inside a panel, use hairline-divided rows (the contact directory) rather than a second box.
- **Don't** repeat one vertical spacing value down a section; see The Breathe-Above Rule.
