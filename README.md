# casey-barr.github.io

Personal site of Casey C. Barr. Built with [Eleventy](https://www.11ty.dev/).

## Running it

```sh
npm install
npm run serve     # http://localhost:8080, rebuilds as you edit
npm run build     # one-off build into _site/
```

## Writing a post

Drop a markdown file in `src/posts/` named `YYYY-MM-DD-Some-Title.md`. The date
sets the post's date and the rest of the filename becomes its URL **with its
casing preserved** — `2026-08-01-When-Thinking-Becomes-Too-Cheap.md` publishes
at `/When-Thinking-Becomes-Too-Cheap/`. Renaming a published file breaks its
URL.

```yaml
---
title: "When Thinking Becomes Too Cheap"
description: "The one-line summary shown under the title in the post list."
topics: [technology, cognition, AI]
math: true          # only if the post contains LaTeX
---
```

`description` is optional — without it the post list falls back to the first
paragraph. `topics` is optional too; it drives `/topics/<name>/` pages.

Anything in `src/drafts/` is kept in the repo but never published.

### Sidenotes

Write an ordinary markdown footnote and it becomes a margin note:

```markdown
Another round of analysis used to be expensive.[^1]

[^1]: Jevons made the point about coal in 1865.
```

On a wide screen it sits in the margin beside its reference; on a narrow one it
becomes an indented note in the flow; with JavaScript off it stays a footnote at
the foot of the page. All three are the same markup — `assets/js/app.js` moves
it, and nothing depends on that having happened.

### Maths

Set `math: true` and write `$...$` inline or `$$...$$` for display. KaTeX
renders it **at build time**, so a broken expression is a build-time problem
rather than something a reader discovers.

## How it's put together

```
src/
  posts/           the essays; posts.json gives them their layout and permalinks
  drafts/          kept, never published
  pages/           about, cv, projects, reading log, topics, writing archive
  _includes/       base, essay, page layouts and the shared post list
  _data/           site.json (title, links) and nav.json (the bar)
assets/
  css/             tokens.css is the vocabulary; site.css is everything else
  fonts/           ET Book, self-hosted
  katex/           KaTeX stylesheet and fonts, self-hosted
  js/app.js        sidenotes and the contents rail
```

Nothing is fetched from a CDN at read time; the only JavaScript is one 3 KB
file, and every page renders without it.

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes it to GitHub Pages.

**This requires Pages to be set to build from GitHub Actions** — Settings →
Pages → Build and deployment → Source → "GitHub Actions". Until that is
switched, Pages keeps serving whatever the old Jekyll build last produced and
the workflow's output goes nowhere.
