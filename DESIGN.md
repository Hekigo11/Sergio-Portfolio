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

Single-page spatial canvas: Home/About/Projects/Connect are absolutely positioned `SECTION_SPAN` **measured viewports** apart — currently 2.75, with About directly above Home, Projects to the right, Connect up and to the left — and the viewport pans between them via a Motion transform (`ease [0.22, 1, 0.36, 1]`, 0.7–1.35s by distance). `App.tsx` holds only the arrangement (`col`/`row`); `src/spatial/journey.ts` owns how far apart that is, how long crossing takes, and which way it went; `SpatialCanvas` measures its own box and multiplies. The canvas between sections is empty and paints nothing. Each section scrolls independently inside a `h-[calc(100vh-4rem)]` frame under the sticky 64px header. Content is centered in a `max-w-6xl` (or `max-w-3xl`/`max-w-2xl` for reading columns) container with `px-6 sm:px-10 lg:px-8` gutters. Regions are divided by hairline `border-t` rules rather than background changes.

Each section is a different *page type* in the same journal, and the composition says which:

- **Home — title page.** Asymmetric `[1fr, 0.72fr]` split; the name runs at display scale over a short `w-16` title rule; the portrait sits as a mounted plate across a full-height `lg:border-l` gutter rule. Its `sm`-sized `ThemeToggle` carries a `MetaLabel` caption ("For a change in atmosphere") at `gap-2` beneath it — the same distance a `MetaLabel` sits from the control it names everywhere else (Connect's form labels), so a caption always reads as bound to the one thing beside it, not as a third item in the row. A visitor's note closes the intro column itself — under the tagline, not as a separate full-bleed band — so it reads as the page's own closing thought rather than a distinct section; it inherits the column's `text-center lg:text-left` and its `items-center lg:items-start` matches, so the note's box, not just its text, sits flush left from `lg` up like everything above it.
- **About — essay pages and ledgers.** Full-viewport statement spreads (opening claim, inspiration) alternate with ledger regions (Education, Experience) where the date sits in an `8rem` right-aligned margin rail and the entry body runs in the wide column. Nested sub-roles indent behind a 1px `border-l`.
- **Projects — catalog plates.** A height-bounded region: chapter head, coverflow track (`flex-1`), scroll hint. Card internals shrink-to-fit against `--fit` rather than scrolling. The coverflow is chosen on **height as well as width** — `(min-width: 1024px) and (min-height: 620px), (min-width: 640px) and (min-height: 760px)` — because a plate is a fixed-height object, and the two-column card from `lg` needs less height than the stacked one below it. Anything shorter falls back to the same scrolling stacked list mobile uses; a landscape phone is 844px wide and has no business rendering a coverflow.
- **Connect — correspondence page.** Two panels: a ruled contact directory above the message form, and the visitor-notes feed.

Vertical rhythm is asymmetric by rule (below), not one repeated value: statement regions get viewport height, ledger regions `pt-24 pb-20` (`lg:pt-28 lg:pb-24`), and entries inside them `py-12`.

### Named Rules
**The Viewport-Step Rule.** Section coordinates are a multiple of the measured viewport, never fixed pixels. Fixed coordinates fail at both ends of the range: a step smaller than the widest supported viewport lets the neighbouring section's box overlap the active one and bleed into the edge of the screen (the old 1800px step did this on any display 1800px or wider), and a step written for a desktop is a wildly different amount of *travel* on a phone — 1800px is 1.4 screen-widths on a laptop and 4.6 in the hand, so one pan reads as a glide at a desk and a whip-pan in the hand. Expressed in viewports the journey is the same gesture everywhere, and `SECTION_SPAN` becomes a free dial: the space between sections paints nothing and nothing off-screen is rasterised, so it can be raised as far as the design wants. Its only hard floor is ~1.15, below which two sections share the screen.

**The Distance-Sets-Duration Rule.** A canvas this wide cannot use one fixed pan duration. `journeyDuration` scales it as the **square root** of distance, deliberately between the two wrong answers: linear scaling holds speed constant so a longer canvas is only more waiting, and a fixed duration makes a 2.5× longer journey 2.5× faster, which is a blur. The root gives ~1.6× the time for 2.5× the distance — further apart *and* quicker, which is the point of the effect. Anything measured against the pan derives from the same number rather than hard-coding one: the atmosphere's burst (`burstMs`), how far the star field surges and how long its trails linger (`journeyScale`), and the scroll-chain lockout in `useSectionScrollFlow`, which takes `MAX_JOURNEY_SECONDS` so a fast scroll can never skip a section mid-pan.

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

## Motion & Interaction States

Every control on the site shares one easing and one small vocabulary of
responses, defined once in `src/index.css` rather than per component. The
curve is `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-journal`) — the same curve
the spatial camera travels on — so a hover rule and an 1800px pan are
recognisably the same hand. Two durations: `--dur-press` (110ms) for
acknowledgement, `--dur-state` (200ms) for a routine state change. Nothing in
the system bounces, glows, or scales on hover.

**The vocabulary.** Definition lives on the page's ground, in ink:

- **Hover** shifts material, never size: a hairline goes `border` →
  `border-strong`, muted ink goes to full ink or to accent, a ledger row takes
  a 5% accent wash the width of its rule.
- **A rule draws in.** `.rule-draw` is the shared hover underline — a hairline
  scaled in from the left under a nav link or the wordmark. It is the pencil
  version of the accent rule that marks the section you are actually in, and
  that accent rule is the same mark inked: one `layoutId` span that travels
  between links rather than being redrawn on each.
- **Press** is `.press` — `translateY(1px)`, and nothing else. One pixel, on
  buttons and links only.
- **Focus** is the global `:focus-visible` accent outline at 2px offset, with
  two documented exceptions below.
- **State changes cross over.** A word, a visitor note, a project photo, or
  the contact form's success panel replaces its predecessor through
  `AnimatePresence` with `mode="wait"` — out in ~140ms, in at 280–340ms.
  Nothing ever cuts, and nothing ever overlaps mid-sentence.

**The one authored moment** is the check on a sent contact message: the stroke
is drawn (`pathLength` 0 → 1) rather than shown. Sending the message is what
the page is for, and a stroke being written is the journal's own idea of
something being recorded. There is exactly one of these; a second would make
neither of them special.

### Named Rules

**The Exit-Faster Rule.** Leaving is always quicker than arriving — the mobile
drawer enters at 280ms and exits at 160ms, every cross-fade exits at ~140ms. A
panel on its way out is already the wrong answer to what the visitor just
asked for, and waiting for it to finish reads as latency.

**The Transition-Is-A-List Rule.** The control transition contract is an
explicit property list held in `--transition-control`, never `transition: all`.
`all` transitions the focus outline, so the ring fades in 200ms after the key
press and reads as lag, and it fights any transform Motion is driving on the
same element. `transition` is a shorthand, so any class adding transform easing
(`.press`) must restate the contract rather than replace it.

**The Reduced-Motion-Keeps-Feedback Rule.** `prefers-reduced-motion` removes
travel, not confirmation. Under it: auto-advancing carousels stop advancing
entirely (the plate holds and the dots are how you read the rest), entrances
lose their `y` offset but keep their fade, the hover rule fades in place
instead of drawing, smooth scrolling becomes instant, and the drawn check
appears complete. The 1px press and every colour change survive — a control
that does not visibly answer a press is broken, not calm. In React this is
`useReducedMotion()`; in CSS it is a `reduce` block, and any new decorative
loop stays gated inside the existing `no-preference` block.

**The Never-A-False-Affordance Rule.** Only things that do something get a
hover state. `Tag`, `MetaLabel`, skill cards, and the decorative marks stay
inert. Where a label should visibly belong to something interactive — the
brass role tag on a project card — it warms from its *card's* `group-hover`,
never from a hover of its own.

**The Focus-Over-Media Rule.** A control sitting on a photograph cannot use the
accent focus ring: it lands on whatever colour that pixel happens to be. The
plate's arrows and dots carry `.focus-on-media` instead — a white outline
inside a `rgb(0 0 0 / 0.5)` halo, legible over any image in either theme.
Those two values, like the existing `bg-black/45` arrow scrim, are photographic
legibility, not palette; they are the only literals in the system outside the
token set, and no new one is added without the same justification. The halo is
a focus indicator, not depth, so it does not breach The Flat-By-Default Rule.

**The Off-Camera-Is-Inert Rule.** The three sections you are not in are still
mounted, parked thousands of pixels off-camera. They carry `inert`, not just
`aria-hidden`: `aria-hidden` silences a screen reader but leaves every link,
field, and card in the tab order, so tabbing out of the navbar walks the focus
ring off the edge of the world — visible nowhere, and dragging the section's
own scroller around as it goes.

## Components

### Primitives (`src/components/ui/`)

Five shared primitives own the system's repeated marks. Compose these rather than re-typing their classes.

- **`MetaLabel`** — the annotation register: mono, uppercase, tracked, `text-ink-muted`. Sizes `xs` (10px / `0.22em`, the default field label) and `sm` (12px / `0.2em`, standalone captions); `size="custom"` drops the built-in size and tracking so a caller can scale it (the coverflow card sizes everything against `--fit`, and date rails tighten to `0.12em`). Renders a `span` unless given `as`.
- **`SectionHeading`** — the chapter head: display-serif title, optional standfirst, closed by a full-width hairline rule. Sizes `md` and `lg`.
- **`CarouselDots`** — the position marker shared by every carousel (focus
  areas, visitor notes, a project's image plate): a 6px dot in a ~26px hit
  target, `tone="ink"` on the page and `tone="media"` over a photograph. It is
  a group of buttons with `aria-current`, deliberately **not** a
  `role="tablist"` — there are no tab panels here, and promising a screen
  reader tabs then giving it none describes the control wrongly.
- **`Tag`** — `variant="badge"` is a specimen label (pill, uppercase: role badges, academic honors); `variant="stack"` is a literal token that keeps its own casing (`rounded-md`: languages, libraries). `tone="brass"` marks cataloguing, `tone="default"` is neutral. `size="custom"` drops padding/size for `--fit` scaling.
- **`ThemeToggle`** — the pill-track-with-sliding-glyph control itself, not just its documented shape. Originally hand-rolled twice (the navbar's full version with the sun/moon cross-fade, Home's own copy as a bare undecorated dot) — a drift between what this file already specified and what one of the two call sites actually shipped. One component now, sized `md` (navbar, `h-8 w-14`) or `sm` (Home, `h-7 w-12`, sitting beside a small directional chevron rather than nav chrome).

### Buttons
- **Shape:** full pill (`rounded-full`).
- **Primary:** `bg-accent text-accent-ink`, `px-6 py-2.5`, `font-semibold`; used for form submits (Send message, Post).
- **Hover / Focus / Press:** background shifts to `accent-hover`; global `:focus-visible` draws a 2px accent outline with 2px offset (set once on `:root`, not per-component); `.press` adds the 1px press offset. A submitting button carries `aria-busy` and `cursor-wait` alongside its `disabled:opacity-60` — see Motion & Interaction States.
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
- **Hover:** border shifts to `border-strong`, so a field reads as writable before it is focused.
- **Focus:** border shifts to `accent`, `focus:ring-2 focus:ring-accent/20`. Fields are the one documented exception to the global focus outline — they suppress it (`outline: none` on `input`/`textarea`/`select`), because the border-plus-ring treatment already *is* the indicator and the outline on top of it draws a third concentric ring around one input.
- **Caret and placeholder:** `caret-color` is `accent` and `::placeholder` is `ink-muted`, both set globally — browser surfaces that otherwise ship belonging to no design system.
- **Error:** `text-danger` message below the field, not an inline border-color error state.

### Navigation
- **Style:** sticky header, `border-b border-border`, solid `bg-bg/95` in light and `bg-bg/75` + `backdrop-blur-md` only in dark (light stays paper-opaque; dark reads as glass — see The No-Blur-On-A-Moving-Backdrop Rule for why blur is scoped this deliberately). Desktop links are plain `text-ink-muted`, hover to `text-ink` and draw a `.rule-draw` hairline in from the left; the active link is `text-accent font-semibold` with `aria-current="page"` and a `layoutId`-animated 1px accent underline — the same mark, inked, travelling between links rather than being redrawn on each. Mobile: a full-screen `bg-bg/98` drawer (dark: `bg-bg/85` + blur) with `font-display font-bold text-3xl` links stacked with hairline dividers, active link in accent.
- **Theme toggle:** `ThemeToggle` (`src/components/ui/ThemeToggle.tsx`) — a pill track (`border-border bg-surface`) with a solid `bg-accent` knob carrying a drawn sun/moon SVG glyph (no emoji) that slides via Motion `layout`. The two glyphs cross-fade and turn ~50° rather than swapping on one frame mid-slide, and the track's border goes `accent/60` on press. The navbar and Home use the same component at two sizes (`md`/`sm`) — not two implementations that happen to agree — so the two toggles cannot drift out of sync with each other again.
- **Scroll flow** (`src/scroll/`): one wheel listener per active section resolves every tick in a fixed order — (1) a registered horizontal region that has arrived on screen with room to move, (2) a nested vertical scroller with room (Connect's comment feed), (3) the section's own vertical scroll, (4) navigate to the neighbouring section. Chaining runs Home ↔ About ↔ Projects ↔ Connect, clamped at both ends, never wrapping; it needs accumulated overscroll past the boundary before firing and locks out for the length of the camera pan, so one gesture can't skip two sections.

  Carousels **do not listen for wheel events themselves.** They register a `HorizontalConsumer` (`canConsume` / `consume`) via `useHorizontalScrollConsumer` and wait to be asked. This is the point of the subsystem: several listeners at different DOM depths each grabbing wheel events and calling `stopPropagation` means the winner depends on where the cursor happens to hover — a carousel pages only when hovered exactly, and section navigation fires from the same tick meant to scroll a row. One decision point, in a fixed order, removes that race and makes behaviour depend on where the *reader* is in the page.

- **The L motion (About → Skills → Projects):** scrolling down travels vertically until the whole Skills **section** is settled in the viewport — heading, row and trailing padding, not just the row — at which point the row takes the wheel and travels across one card at a time, and once it reaches its scroll end the wheel returns to the page and carries on to Projects. Down, then across, then on. Paging is deliberately stepped (roughly one wheel click per card, with the smooth scroll allowed to settle between cards) so the travel reads rather than flings. Entering the section resets the row to its first card, so the L plays the same way on every visit.

- **Two carousels, two mechanisms.** The Projects coverflow (no CSS snap, its own fling physics) eases `scrollLeft` toward an accumulating target. The Skills row *is* `snap-x snap-mandatory`, and a mandatory-snap container fights small incremental `scrollLeft` nudges — the browser pulls straight back to the nearest snap point, so per-tick nudges visually do nothing; `useSnapCarousel` pages it via `scrollTo(card.offsetLeft)` instead, a position the snap machinery already agrees with. **Which mechanism a horizontal region needs depends on whether it uses CSS scroll-snap — check that first.**

### Named Rules
**The Release-On-Boundary Rule.** A horizontal consumer must decide it is finished from the container's *real* scroll boundary (`scrollLeft` against `scrollWidth - clientWidth`), never from card indices. The last card's `offsetLeft` is almost always greater than `maxScroll` — a row cannot scroll far enough to put its final card at the left edge — so `scrollTo` clamps, and at that clamped position the *nearest* card is the second to last. Index arithmetic therefore keeps proposing a target the row can never reach, holds the wheel forever, and makes the next section unreachable by scrolling. This has already been shipped as a bug once.

**The Arrived-Not-Glimpsed Rule.** A horizontal region claims the wheel only once its **whole section** is within the viewport — not when its first pixel appears, and not merely when the row itself fits. Reacting to a glimpse stalls the descent halfway and destroys the L; gating on the bare row fires while the heading and lower padding are still cut off, which reads as the page giving up on the descent early. `canConsume` receives the section's own box for this measurement, and `useSnapCarousel` takes a separate `gateRef` so the element that must be visible can differ from the element that scrolls.

**The Fresh-On-Entry Rule.** Entering a section resets it — vertical scroll *and* every registered horizontal region. A carousel left parked at its far end reports "nothing to do" on the next visit, so the reader scrolls straight through into the next section and the interaction silently disappears the second time. Resetting only the vertical scroll is the easy half of this bug.

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

- **`NightSky` (dark).** Two large, faint (`opacity-[0.14]`–`opacity-[0.17]`) `Ring`/`OrbitalArc` instances for celestial depth, plus a sparse field of ~117 `<circle>` points across three size/brightness tiers (72 dim and tiny, 30 mid, 15 near-and-brighter — a real sky has far more dim points than bright ones). Positions come from a seeded `mulberry32` PRNG at module load, never `Math.random()` in a render path. The nearest tier draws in `ink-muted` and carries a second, much fainter disc at ~3.8× its radius: a bloom painted as *fill*, never a `filter` — a drop-shadow on an element that twinkles forever would repaint every frame of the site's life.
- **`DayCurrents` (light).** Four hand-placed `WindCurrent` strokes — moving air over paper, the counterpart to the star — on `accent`, `brass` and `ink-faint` at 0.20–0.30 opacity. One is unconditional, two more arrive at `sm`, and the brass one at `lg`, so a phone still carries a single current. Placement is authored per stroke, never looped (see The Sparse-and-Asymmetric Rule).

**Both layers were raised twice from where they first shipped** (stars 0.14–0.75 on three dimmer, sparser tiers; currents 0.10–0.14 on three thinner strokes). At those values the night sky read as a near-black rectangle and light mode as blank paper on any screen that was not in a dark room — the "two lights, one world" thesis was invisible in both, and the supersonic burst below had nothing to work with. They remain far under the content: the glass panels that sit on the sky carry a 16px backdrop blur, and a hairline current behind #211b14 ink on ivory does not move its 12.9:1 contrast.

The background layers hold texture only. **Representational artwork never goes in them** — the hand-drawn clouds and flourishes are placed marks inside sections instead (below), because a drawing stretched across the whole viewport stops being a drawing and becomes wallpaper.

For the ground layers to be visible, the sections stopped painting their own: `Section.tsx`'s content wrapper and `About.tsx`'s root carry no `bg-*` class at all, in either theme. This is also *why* the dark-mode glass panels (`bg-surface` + backdrop-blur, from Elevation & Depth above) have real atmosphere to show through rather than a flat navy fill.

**Motion.** Both layers animate, all of it is gated inside one `@media (prefers-reduced-motion: no-preference)` block in `src/index.css`, and every property is chosen for compositor cost rather than for looks:

- Stars use `star-twinkle` (opacity 1 ↔ 0.5), each with its own `--twinkle-delay`/`--twinkle-duration`.
- Currents use `wind-drift`, a `translate3d` of ~1% over 46–70s, each with its own `--drift-x`/`--drift-y`/`--drift-duration`/`--drift-delay` set through Tailwind arbitrary-property utilities. Transform is the one property that animates on the compositor *without* repainting, which matters because these strokes are viewport-sized — animating `stroke-dashoffset` here would repaint a full-viewport path every frame. Negative delays start each current mid-cycle so nothing sweeps in lockstep.

A visitor who has asked for reduced motion gets both layers fully static, at each element's resting state — not a slowed-down animation. The large depth shapes in `NightSky` never animate in either preference.

### The supersonic burst

The site's one moment of spectacle, and the only thing on it that reacts to navigation. Travelling between two sections is the portfolio's signature gesture; for ~78% of the pan the atmosphere acknowledges that the camera just crossed the canvas, and then it is gone. It is deliberately shorter than the pan itself, so the air clears before the destination arrives.

**It follows the actual journey.** `App.tsx` derives a `Travel` (`src/components/decor/travel.ts`) from the two sections' own canvas cells — an id, an angle in screen axes, and a unit vector — and hands it to both atmospheres as a prop. The sky is *told* where the camera went; it does not work it out, and it holds no opinion about section names or coordinates. Home → Projects streaks flat, Home → About streaks vertically, Home → Connect streaks along the diagonal it actually travels.

- **Night: light trails.** The nearer half of the same seeded star field (every star at `r ≥ 1`, ~45 of 117) becomes a gradient-cored streak in `ink-muted`. Motion orchestrates the field as a whole — one transform surging 132px × `journeyScale` *against* the camera, because the sky is what the camera moves over — and a CSS keyframe stretches and fades each trail on its own delay so they never fire in lockstep. Under the burst the star chart itself dips to 0.32 in 160ms and returns over 450ms, so the streaks carry the frame rather than competing with the points they came from.
- **Day: a gust.** Five `WindCurrent` strokes — the same authored vocabulary as the resting air, not a new mark — inside a frame rotated once to the travel vector, so each stroke only ever travels a local `-x` and no stroke needs to know which way the journey went. The resting currents and the sections' cloud artwork are deliberately untouched: they are the scenery the gust passes *through*. Moving everything at once reads as the page lurching, not as air being displaced.

### Named Rules

**The Burst-Is-Borrowed Rule.** The supersonic layer only ever borrows marks the atmosphere already owns — a subset of the existing stars, the existing `WindCurrent` curves — and it exists only while a journey is in flight. It introduces no shape, no hue, and no element that outlives the 640ms. Anything that would need to persist belongs in the resting composition or nowhere.

**The Against-The-Camera Rule.** The atmosphere is the thing the camera moves over, so it streaks *opposite* the travel vector. Both layers take the vector's sign from the same `Travel`; neither hard-codes a direction per section pair, and adding a fifth section requires no change to either sky.

**The Promote-Only-In-Flight Rule.** `will-change: transform` on the panned canvas lives only for the length of a pan, not permanently. A composited layer costs GPU memory proportional to its extent, and the extent is now several viewports across in both axes — a permanent promotion is the one thing that would have made a longer `SECTION_SPAN` expensive on a low-end device. It is applied in the same commit that starts the animation, since both come from the same navigation, so the layer is promoted on the first frame rather than part-way through it.

**The Burst-Costs-Nothing-At-Rest Rule.** Every element of the burst is mounted only for the length of one journey and only when the visitor has not asked for reduced motion, which is what makes `will-change` legitimate on it — it is scoped to elements that exist exclusively while they animate. Nothing in the burst touches layout, filter, or backdrop-filter; it is transform and opacity on composited boxes, which is why the trails are positioned HTML rather than SVG geometry. At rest the cost of the whole feature is zero nodes.

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
- **Do** give every new control the full set — hover, focus-visible, active, and disabled — from the vocabulary in Motion & Interaction States, rather than inventing a one-off response for it.
- **Do** stop an auto-advancing carousel while it is hovered *or* holds keyboard focus, and stop it entirely under `prefers-reduced-motion`.

### Don't:
- **Don't** add `box-shadow` to cards, buttons, or panels — the system is flat-by-default.
- **Don't** use `rounded-2xl` or larger on content cards; pill radius is for controls/tags only.
- **Don't** reach for Unicode glyphs or emoji as icons (the theme toggle and carousel arrows are drawn SVG for this reason) — draw a matching-stroke SVG instead.
- **Don't** introduce a third accent color; the system deliberately has exactly two (`accent` for interaction, `brass` for labeling).
- **Don't** nest a bordered card inside a bordered panel. When a group needs separation inside a panel, use hairline-divided rows (the contact directory) rather than a second box.
- **Don't** repeat one vertical spacing value down a section; see The Breathe-Above Rule.
- **Don't** animate the four section-scoped decorative marks (`OrbitalArc`, `Ring`, `TrajectoryLine`, `MarkerTick`); they stay static illustration. The two deliberate exceptions — `NightSky`'s star twinkle and the supersonic burst — are both background-atmosphere concerns, and neither is a precedent for animating marks inside a section's own composition.
- **Don't** grow either atmosphere into a full particle system, ribbon field, or scroll- or pointer-reactive effect. The line is drawn precisely: each atmosphere is a fixed composition, one cheap compositor-only ambient animation, and one transient burst on a *discrete* navigation event. Anything that reacts continuously — to the wheel, the pointer, a scroll position — would run every frame the visitor is reading, which is a different thing entirely and a separate decision.
- **Don't** animate `stroke-dashoffset`, `filter`, or `backdrop-filter` on a viewport-sized decorative element. Ambient background motion is limited to `transform` and `opacity`, the two properties that animate without repainting.
- **Don't** write `transition: all`, or give a control a scale, glow, or bounce on hover. Hover shifts material — a hairline, a colour, a wash — and never size.
- **Don't** put a hover state on something that isn't interactive, or a press offset on an element that is also a drag surface (the coverflow card is both a button and the track's drag handle; its acknowledgement is the glide to centre).
