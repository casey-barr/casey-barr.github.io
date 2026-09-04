# Restyling casey-barr.github.io — design

**Date:** 2026-09-04
**Branch:** `tufte-restyle`
**Reference:** <https://collusion.wiki/explorer/index.html> (and its essay half, `collusion.wiki/index.html`)

## Goal

Replace the minimal-mistakes theme with a hand-written one in the spirit of
collusion.wiki: a Tufte-derived essay layout built for long-form reading, owned
outright rather than overridden.

## What was taken from the reference, and what was not

The reference is three hand-written stylesheets (`tokens.css`, `chrome.css`,
`explorer.css`). Its distinguishing traits:

| Trait | Taken? |
| --- | --- |
| ET Book serif for prose, system sans for small labels | Yes |
| Cream `#fffff8` ground, near-black ink | Yes |
| Hairline rules, zero border-radius, no shadows or cards | Yes |
| One text column on a shared grid with the sticky bar | Yes |
| Contents rail beside the column | Yes |
| Margin sidenotes instead of footnotes | Yes |
| Two-tier semantic palette (green = from the dumps, amber = outside them) | **No** |

The green/amber pair carries a provenance claim specific to that
investigation. This site has nothing to signal with a second colour, and the
reference's own stylesheet forbids decorative use of them. One structural
accent replaces both.

## Tokens

| Role | Value |
| --- | --- |
| Ground | `#fffff8` |
| Ink | `#111` |
| Secondary ink | `#5c5c54` |
| Quietest label | `#86867c` |
| Hairline | `#e8e8df` |
| Rule | `#d6d6cc` |
| Panel wash | `#f6f6ee` |
| Accent | **undecided** — slate `#31566f`, madder `#7d2b2b`, or ochre `#8a6209` |

Type: ET Book (MIT, vendored to `assets/fonts/`) for prose and headings; the
system sans stack at 13px for nav, dates, captions and sidenotes; system mono
for code. Body 1.125rem at line-height 1.62 — serif wants more air than a sans.

Measure: 700px column (~80 characters of ET Book at 18px), 200px rail, 250px
sidenote margin, 40px gaps.

## Layout

```
[ rail 200 ] gap [ column 700 ] gap [ margin 250 ]
```

The sticky bar uses the same grid template, so its rule and title land exactly
on the column edge at every width. Both `.frame` and `.chrome` therefore share
one declaration; they must not be allowed to drift apart.

Three narrowing steps:

- **≤1300px** — the rail goes. Post-list dates move from their own column back
  above the title.
- **≤1000px** — the sidenote margin goes. Notes stop floating and become
  indented notes in the flow, marked with a left hairline.
- **≤620px** — type scale steps down; the bar stops being sticky and its six
  nav labels take a row of their own beneath the site name. 80px of pinned
  chrome on a phone costs more than the bar is worth.

## Features

**Sidenotes.** Posts are written with ordinary kramdown footnotes (`[^1]`).
`app.js` lifts each note to its reference and hides the list; CSS decides
whether it sits in the margin or in the flow. With JS off the footnotes remain
exactly as kramdown wrote them, so the enhancement is not load-bearing. The
number must be prepended *inside* the note's `<p>` — kramdown wraps every note
in one, and a number placed before that block lands on a line of its own.

**Contents rail.** Generated from headings with kramdown's `{:toc}`, so no
plugin is needed and GitHub Pages still builds the site. An IntersectionObserver
marks the section being read.

**Search.** lunr is dropped. A generated `search.json` plus a small filter on
the archive page replaces it — a JS bundle on every page is not worth it for
~10 posts.

**Math.** KaTeX from CDN, loaded only on pages with `math: true` in front
matter.

**Tags.** Liquid-generated tag and category archives are kept.

## Home page

Unchanged in structure pending review: the Rome photograph, then the masthead,
then the post list. The photo is set as a **plate** — inside the measure, at
column width, with a caption beneath it crediting the author — rather than as a
full-bleed banner with an overlaid caption chip. The reference has no images at
all, so this is the site's own decision rather than a borrowed one.

In the post list the date is set in the rail column, ranged right, instead of
being joined to the read time on the title's line. It is the field the list is
scanned by, and giving it a column keeps the titles on a clean left edge.

## Build order

1. **Prototype** (`docs/prototype/`) — static HTML, real CSS, real content. No
   Ruby is installed on this machine, so Jekyll cannot preview locally without
   a heavy toolchain install; the prototype decouples the visual decisions from
   that. **← current stage**
2. Port the CSS verbatim into Jekyll layouts: `default`, `essay`, `page`,
   `home`, `archive`, plus includes for head, chrome, rail, footer, KaTeX and
   search.
3. Drop `remote_theme`, `_sass/minimal-mistakes/`, and minimal-mistakes' JS.
4. Fix `_posts/2024-11-17-The-Tchebycheff-Approach.md`, which has no front
   matter at all, and set its formula in real LaTeX.
5. Delete the prototype and its two check harnesses.

## Open decisions

- Which accent.
- Whether the avatar/bio card returns anywhere, having been dropped with the
  minimal-mistakes sidebar.
- Whether the home page keeps the photograph after seeing it in the new type.
