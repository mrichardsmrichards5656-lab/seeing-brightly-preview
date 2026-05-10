# Accessibility audit and improvement plan

The site is already strong (skip link, focus-visible outlines, aria-labels, aria-live regions, theme/text-size controls, dark + high-contrast + yellow-on-black + Welsh). Below are the gaps I found and what I'll add to make it best-in-class for blind and partially sighted users in the UK (WCAG 2.2 AA, plus practical JAWS/NVDA/VoiceOver/TalkBack behaviour).

## Fixes to apply (no design changes)

**Screen reader correctness**
- Wrap every decorative Unicode/emoji symbol (✦ ◉ ◎ ◇ ◈ ◭ ↔ ☀ ◑ ⬡ 🎯 ⬤ 💧 👓 🔍 etc.) used purely as an icon in `<span aria-hidden="true">`. JAWS currently reads "white four pointed star, Stargardt disease". After fix it reads only the label.
- Add `role="list"` to the conditions grid container that holds `role="listitem"` children (orphan listitems are dropped by some readers).
- Give every `<button>` that toggles state (Welsh CY, theme, dark/light, accordions) a correct `aria-pressed` / `aria-expanded` that updates in JS.
- Add `aria-current="page"` to the active sidebar link / nav item.
- Add a visually hidden `<label for>` to each search input (keeping the placeholder), not just `aria-label` — improves voice-control software ("Click search box").
- Add `aria-live="polite"` announcement when language switches to Welsh, when text size changes, and when a condition panel opens ("Stargardt disease panel opened").
- Set `lang="cy"` on individual Welsh strings that appear inside English pages (and vice versa) so the screen reader switches voice/pronunciation.

**Keyboard & focus**
- Trap focus inside any modal/overlay (condition panels, contact form success) and restore focus to the trigger on close. Add `Esc` to close.
- Make the back-to-top button reachable in tab order with a visible focus ring (already styled — verify it's not `tabindex="-1"`).
- Ensure the sidebar drawer on mobile is `inert` when closed so screen reader focus doesn't leak into hidden content.

**Visual / low-vision**
- Add `@media (prefers-reduced-motion: reduce)` to disable all transitions/animations.
- Add `@media (prefers-contrast: more)` to auto-enable high-contrast theme.
- Honour the user's saved text-size and theme on every page load (looks like it does — I'll verify).
- Bump minimum body line-height to 1.6 and paragraph max-width to ~70ch for easier tracking with magnification.
- Ensure focus outlines are 3px and 3:1 contrast against every theme background (HC, yellow-on-black, dark, light).
- Add a "dyslexia-friendly font" toggle (OpenDyslexic / Atkinson Hyperlegible) — widely requested alongside sight-loss tools.
- Add a "reading ruler" / line-focus toggle and a "letter spacing +" button — both standard low-vision aids.

**Document structure / SEO that also helps SR users**
- One `<h1>` per page; verify heading order doesn't skip levels.
- Wrap content in `<main id="main">`, `<nav>`, `<aside>`, `<footer>` landmarks (some present — fill gaps).
- Add a visible "Listen to this page" button using the browser SpeechSynthesis API (free, offline, no API key). Huge value for users without a screen reader who still struggle to read.

## Recommendations to make this the best UK partial-sight site

1. **RNIB / Sight Scotland / Macular Society / Guide Dogs helpline numbers** prominently on every page, plus 999 / 111 eye-emergency guidance.
2. **Postcode lookup → local ECLO (Eye Clinic Liaison Officer) and low-vision clinic finder** (RNIB has an open dataset).
3. **Certificate of Vision Impairment (CVI) walkthrough** — what it is, how to register as Sight Impaired / Severely Sight Impaired with your council, what unlocks (Blind Person's Allowance £3,070, free TV licence half price, Disabled Persons Railcard, council tax discount, free NHS sight tests, free bus pass).
4. **PIP / Attendance Allowance form-filling templates** with example wording for each descriptor written from a sight-loss perspective.
5. **"Audio descriptions on" guides** for Sky, BBC iPlayer, Netflix, Disney+, ITVX.
6. **Be My Eyes / Aira / Seeing AI / Envision / Lookout** setup guides.
7. **NHS England Accessible Information Standard** — a one-click letter template users can send to their GP / hospital requesting large print, braille, audio, or email correspondence (this is a legal right since 2016 and most patients don't know).
8. **Tactile household hacks** + buyer's guide to bump-ons, talking microwaves, liquid level indicators (RNIB shop links).
9. **Mental-health crisis line** (Samaritans 116 123) and the RNIB Sight Loss Counselling team — sight-loss diagnosis is strongly linked with depression.
10. **Newsletter signup with audio + large-print formats**, and an RSS feed (screen-reader users heavily use feed readers).
11. **Page-level "Was this helpful?" feedback**, with an accessible-by-default plain HTML form.
12. **Print stylesheet** with 18pt minimum, high contrast, no background images — many older users still print.
13. **Offline / PWA** — already partially set up (service worker present). Make condition pages fully offline-readable.
14. **Plain-English reading level** — target Year 9 (RNIB guideline). I can run a pass on the longest articles.

## Technical scope of this change

- All edits are inside `public/vision-hub.html` (and the mirror copy `public/original/index.html`).
- Symbol-wrapping done with a Python regex script over the existing button list — no manual edits to 8000 lines.
- New CSS added inside the existing `<style>` block (reduced-motion, prefers-contrast, dyslexia font, reading ruler).
- New JS added inside the existing inline script (focus trap, live announcer, "listen to page", aria-pressed sync).
- Nothing is removed; no dependencies added; no framework code touched.

## What I'd like to confirm before I start

1. Apply **all** the "Fixes to apply" section (safe, mostly invisible) — yes / no?
2. Of the recommendations, which do you want me to build now? My suggestion: **1, 3, 7, 9** first — they're high-impact, mostly content, and don't need new data sources. **2** (postcode → ECLO) is the biggest win but needs the RNIB dataset; I can add a placeholder + instructions.
3. Add the **dyslexia font + reading ruler + listen-to-page** toggles to the existing accessibility toolbar?
