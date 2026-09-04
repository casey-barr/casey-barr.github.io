# Restyling casey-barr.github.io — design

**Date:** 2026-09-04
**Branch:** `tufte-restyle`
**Reference:** <https://collusion.wiki/explorer/index.html> (and its essay half, `collusion.wiki/index.html`)

## Goal

Replace the minimal-mistakes theme with a hand-written one in the spirit of
collusion.wiki: a Tufte-derived essay layout built for long-form reading, owned
outright rather than overridden.

## Generator: Eleventy, not Jekyll

The site was Jekyll on GitHub Pages, and the plan was to stay there. Ruby was
installed to get a local preview and Malwarebytes quarantined the RubyInstaller
DevKit — an unsigned MSYS2 compiler toolchain spawning build processes is a
known false-positive shape, but working around a user's antivirus is not a
call to make on their behalf. Ruby was uninstalled and the site moved to
Eleventy, which runs on the Node already present and needs no compiler.

What that costs: a GitHub Actions workflow replaces Pages' built-in Jekyll
build, and **Pages must be switched to "GitHub Actions" as its source** or it
will keep serving the last Jekyll output.

What it buys: `npm run serve` works, so every page of this port was built and
checked locally rather than guessed at.

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
| Accent | slate `#31566f` |

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

**Sidenotes.** Posts are written with ordinary markdown footnotes (`[^1]`).
`app.js` lifts each note to its reference and hides the list; CSS decides
whether it sits in the margin or in the flow. With JS off the footnotes remain
exactly as kramdown wrote them, so the enhancement is not load-bearing. The
number must be prepended *inside* the note's `<p>` — the renderer wraps every
note in one, and a number placed before that block lands on a line of its own.
`markdown-it-footnote`'s ids are overridden in the config to match kramdown's
`fn:1` / `fnref:1`, so the script is unchanged from the prototype.

**Contents rail.** Read back off each post's rendered HTML, so it lists exactly
the headings that got ids and there is no second slugifier to drift out of
step. Shown only when a post has more than one heading. An IntersectionObserver
marks the section being read.

**Search.** lunr is dropped. The archive filters a list that is already fully
in the page, so it needs no index, no bundle and no network. Its input is
revealed by the script that makes it work, so a reader without JS is never
shown a dead search box.

**Math.** KaTeX at **build time**, not in the browser. Client-side rendering
cannot work: CommonMark's escape rule consumes `\{` and `\,` before any script
runs, so `\max\{\,` reached the page as `\max{,`. Building it also removes the
CDN and leaves math working with JS off. Only pages with `math: true` load the
stylesheet; the fonts are vendored beside it.

**Topics.** Posts declare `topics:`, not `tags:` — in Eleventy `tags` drives
collection membership, and a post's own topic list would silently evict it from
the posts collection. Topics are grouped by slug rather than by raw string: the
posts spell one subject both "machine learning" and "machine-learning", and
that is one topic with three posts, not two fighting over one URL. The label
shown is the most-used spelling.

## Home page

Unchanged in structure pending review: the Rome photograph, then the masthead,
then the post list. The photo is set as a **plate** — with a caption beneath it
reading "Photo credit: Casey C. Barr" — rather than as a full-bleed banner with
an overlaid caption chip. The reference has no images at all, so this is the site's own
decision rather than a borrowed one.

The plate spans the whole frame (rail, column and sidenote margin together)
rather than the text measure: it is the only image on the site, the arch's
inscription is unreadable at column width, and everything beneath it stays in
the column so the widening reads as deliberate. It uses `subgrid`, so it
follows the frame's columns at every breakpoint without restating them.

In the post list the date is set in the rail column, ranged right, instead of
being joined to the read time on the title's line. It is the field the list is
scanned by, and giving it a column keeps the titles on a clean left edge.

## URLs

Every URL the live site serves is preserved, and all sixteen were checked
against the new build. Post permalinks keep the original casing of their
filenames (`/Trained-to-Deny/`, not a re-slugified form) via
`permalink: "/{{ page.fileSlug }}/"`. `/simple.canvas.core2/` is passed
through untemplated because `core.js` under it answers 200 today.

The one casualty is `/page2/`, which existed only because minimal-mistakes
paginated the home page at five posts. Ten posts now sit on one page.

## Build order

1. ~~Prototype~~ — done, and deleted once ported.
2. ~~Port the CSS and layouts~~ — done.
3. ~~Drop the theme~~ — done.
4. ~~Fix the two posts with no front matter; typeset the formula~~ — done.
5. **Switch GitHub Pages to "GitHub Actions" as its build source.** Until this
   is done the workflow will build and deploy nothing visible. ← *only
   remaining step, and it is the user's to take*

## Decisions taken

- **Accent: slate `#31566f`.** Cool on purpose. The Rome photograph is the only
  warm, saturated thing on the site; a warm accent would compete with it rather
  than recede into being machinery.
- **The bio card is gone.** Its image was never a portrait — it is a raw
  Voyager frame of Jupiter and Amalthea, which the old sidebar cropped to 90px
  and stood above a name like a headshot. It is now the About page's plate, at
  a size where the reticle marks are visible, captioned for what it is.
- **Plate width follows the image.** A panoramic photograph earns the whole
  frame; a square or tall one keeps the text measure, because at frame width it
  would be over a thousand pixels deep. Rome is wide, Amalthea is square.
