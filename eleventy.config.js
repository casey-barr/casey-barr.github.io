import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import markdownItAnchor from "markdown-it-anchor";
import markdownItKatex from "@vscode/markdown-it-katex";

const topicSlug = (t) =>
  String(t).toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");

export default function (eleventyConfig) {
  // Static files keep living at the repo root, so image URLs already in the
  // posts ("/images/topos/logo-story.png" and the like) stay correct.
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("images");
  // Published by the Jekyll build and live today (/simple.canvas.core2/core.js
  // answers 200), so it keeps its URLs even though nothing here templates it.
  eleventyConfig.addPassthroughCopy("simple.canvas.core2");

  /* ---------------------------------------------------------- markdown ---
   * Footnotes are the source form of a sidenote: written [^1] in a post,
   * emitted here as a <sup> reference and an <ol> at the foot of the page,
   * and lifted into the margin at read time by app.js. The ids match what
   * kramdown produced, so the script is unchanged from the prototype and a
   * JS-less reader still gets working footnotes.
   *
   * Headings get ids so the contents rail can link to them. */
  const md = markdownIt({ html: true, linkify: true, typographer: true })
    .use(markdownItFootnote)
    // Math is tokenised before CommonMark's escape rule runs, and rendered to
    // HTML here at build time. Client-side KaTeX cannot work: markdown eats
    // the backslashes first, turning \max\{\, into \max{, before any script
    // sees it. Building it also means no CDN, no flash, and math with JS off.
    .use(markdownItKatex.default || markdownItKatex, { throwOnError: false })
    .use(markdownItAnchor, {
      slugify: (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")),
      permalink: false,
    });

  // kramdown wrote fn:1 / fnref:1; markdown-it writes fn1 / fnref1. Matching
  // kramdown keeps one convention across the site and app.js as written.
  md.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
    const id = Number(tokens[idx].meta.id + 1).toString();
    const caption = tokens[idx].meta.subId > 0 ? `:${tokens[idx].meta.subId}` : "";
    return `<sup id="fnref:${id}${caption}" role="doc-noteref"><a href="#fn:${id}" class="footnote" rel="footnote">${id}</a></sup>`;
  };
  md.renderer.rules.footnote_open = (tokens, idx) => {
    const id = Number(tokens[idx].meta.id + 1).toString();
    return `<li id="fn:${id}" role="doc-endnote">`;
  };
  md.renderer.rules.footnote_anchor = () => "";
  md.renderer.rules.footnote_block_open = () =>
    '<div class="footnotes" role="doc-endnotes">\n<ol>\n';
  md.renderer.rules.footnote_block_close = () => "</ol>\n</div>\n";

  eleventyConfig.setLibrary("md", md);

  /* ------------------------------------------------------------ filters --- */
  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    })
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  // ~220 words a minute, floored at one, so no post claims "0 min".
  eleventyConfig.addFilter("readingTime", (content) => {
    const words = String(content).replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  });

  // First paragraph of the rendered post, stripped, as a fallback dek for a
  // post whose front matter sets no description.
  eleventyConfig.addFilter("firstPara", (content) => {
    const m = String(content).match(/<p>([\s\S]*?)<\/p>/);
    if (!m) return "";
    const text = m[1].replace(/<[^>]*>/g, "").trim();
    return text.length > 220 ? text.slice(0, 217).trimEnd() + "…" : text;
  });

  /* Contents rail, read back off the rendered HTML rather than off the
   * markdown source, so it lists exactly the headings that got ids — a
   * heading added by raw HTML in a post is included the same as one written
   * in markdown, and there is no second slugifier to drift out of step. */
  eleventyConfig.addFilter("toc", (content) => {
    const out = [];
    const re = /<h([23])[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
    let m;
    while ((m = re.exec(String(content)))) {
      out.push({
        level: Number(m[1]),
        id: m[2],
        text: m[3].replace(/<[^>]*>/g, "").trim(),
      });
    }
    return out;
  });

  /* --------------------------------------------------------- collections --- */
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  /* Every topic used by at least one post, alphabetical, each with the posts
   * that carry it. Posts declare `topics:` rather than `tags:` — in Eleventy
   * `tags` drives collection membership, and a post's own topic list would
   * silently evict it from the posts collection. */
  eleventyConfig.addCollection("topics", (api) => {
    // Grouped by slug, not by the raw string: the posts spell the same
    // subject both "machine learning" and "machine-learning", and those are
    // one topic with three posts, not two topics fighting over one URL. The
    // label shown is the most-used spelling, preferring the spaced form on a
    // tie because it reads as prose rather than as a slug.
    const bySlug = new Map();
    api.getFilteredByGlob("src/posts/*.md").forEach((post) => {
      (post.data.topics || []).forEach((raw) => {
        const slug = topicSlug(raw);
        if (!bySlug.has(slug)) bySlug.set(slug, { slug, posts: [], names: [] });
        const entry = bySlug.get(slug);
        entry.names.push(String(raw));
        if (!entry.posts.includes(post)) entry.posts.push(post);
      });
    });

    return [...bySlug.values()]
      .map((entry) => {
        const counts = new Map();
        entry.names.forEach((n) => counts.set(n, (counts.get(n) || 0) + 1));
        const name = [...counts.entries()].sort(
          (a, b) => b[1] - a[1] || (b[0].includes(" ") ? 1 : 0) - (a[0].includes(" ") ? 1 : 0)
        )[0][0];
        return { name, slug: entry.slug, posts: entry.posts.sort((a, b) => b.date - a.date) };
      })
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  });

  eleventyConfig.addFilter("topicSlug", topicSlug);

  /* ---------------------------------------------------------------- feed --- */
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: "en",
      title: "Casey C. Barr",
      subtitle: "Mathematics, econometrics, and applied topology.",
      base: "https://casey-barr.github.io/",
      author: { name: "Casey C. Barr" },
    },
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
