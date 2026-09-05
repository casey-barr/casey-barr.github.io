/* ------------------------------------------------------------------ *
 * app.js — two small, independent enhancements. Each checks for its own
 * markup and does nothing if the page has none, so one script is safe to
 * load on every page.
 * ------------------------------------------------------------------ */

/* 1. Sidenotes.
 *    Posts are written with ordinary kramdown footnotes ([^1]). Kramdown
 *    emits a <sup> at the reference and an <ol> of notes at the foot of
 *    the page. This lifts each note up to its reference and hides the
 *    list. CSS decides where it then sits: in the margin where there is
 *    a margin, indented in the flow where there is not.
 *
 *    With JS off, the footnotes stay exactly as kramdown wrote them and
 *    still work — the enhancement is not load-bearing. */
(function sidenotes() {
  const list = document.querySelector('.footnotes ol');
  if (!list) return;

  list.querySelectorAll('li').forEach((note) => {
    const id = note.id;                                  // "fn:1"
    const ref = document.querySelector('[id="fnref:' + id.split(':')[1] + '"]');
    if (!ref) return;

    const n = ref.textContent.trim();

    // the note's own body, less kramdown's backlink
    const body = note.cloneNode(true);
    body.querySelectorAll('.reversefootnote').forEach((a) => a.remove());

    const aside = document.createElement('span');
    aside.className = 'sidenote';
    aside.innerHTML = body.innerHTML.trim();

    // Kramdown wraps every note in a <p>, so the number has to go *inside*
    // that paragraph to run into its first line; prepended to the aside it
    // would be knocked onto a line of its own by the block that follows it.
    const num = document.createElement('span');
    num.className = 'sidenote-number';
    num.textContent = n;
    (aside.querySelector('p') || aside).prepend(num, document.createTextNode(' '));

    const marker = document.createElement('span');
    marker.className = 'sidenote-number';
    marker.textContent = n;

    ref.replaceWith(marker, aside);
  });

  document.querySelector('.footnotes').hidden = true;
})();

/* 2. Rail. Marks the section you are currently reading. The rail is
 *    generated markup on the real site; here it is written by hand. */
(function rail() {
  const links = document.querySelectorAll('.rail a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;

  const byId = new Map();
  const targets = [];
  links.forEach((a) => {
    const el = document.getElementById(decodeURIComponent(a.hash.slice(1)));
    if (el) { byId.set(el, a); targets.push(el); }
  });

  let current = null;
  const seen = new Set();

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target));

    // the highest heading still on screen, else the last one passed
    let pick = targets.find((t) => seen.has(t));
    if (!pick) {
      for (const t of targets) {
        if (t.getBoundingClientRect().top < 100) pick = t; else break;
      }
    }
    if (pick === current) return;
    if (current) byId.get(current).classList.remove('is-current');
    if (pick) byId.get(pick).classList.add('is-current');
    current = pick;
  }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });

  targets.forEach((t) => io.observe(t));
})();

/* 3. Archive filter. Hides post entries that do not match what is typed.
 *    The whole archive is already in the page, so this needs no index and
 *    no network — and the input is revealed only from here, so a reader
 *    without JS is never shown a search box that cannot search. */
(function archiveFilter() {
  const input = document.querySelector('[data-filter]');
  const list = document.querySelector('.posts');
  if (!input || !list) return;

  const status = document.querySelector('[data-filter-status]');
  const entries = [...list.querySelectorAll('li')].map((li) => ({
    li,
    text: li.textContent.toLowerCase(),
  }));

  input.closest('.searchbox').hidden = false;

  const run = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    entries.forEach((e) => {
      const hit = !q || e.text.includes(q);
      e.li.hidden = !hit;
      if (hit) shown++;
    });
    if (!status) return;
    status.hidden = !q;
    status.textContent = shown === 1 ? '1 post' : shown + ' posts';
  };

  input.addEventListener('input', run);
  run();
})();
