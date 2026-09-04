/* ------------------------------------------------------------------ *
 * app.js — three small, independent enhancements. Each checks for its
 * own markup and does nothing if the page has none, so one script is
 * safe to load everywhere.
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

/* 3. Accent switcher — PROTOTYPE ONLY. Lets the palette be judged against
 *    the photograph rather than against a swatch. Deleted when an accent
 *    is chosen; nothing else depends on it. */
(function accentPicker() {
  // ?accent=madder pins one for a side-by-side frame, and skips the picker
  const pinned = new URLSearchParams(location.search).get('accent');
  if (pinned) {
    document.documentElement.dataset.accent = pinned;
    const p = document.querySelector('.accent-picker');
    if (p) p.remove();
    return;
  }

  const picker = document.querySelector('.accent-picker');
  if (!picker) return;

  const saved = localStorage.getItem('accent') || 'slate';
  const apply = (name) => {
    document.documentElement.dataset.accent = name;
    localStorage.setItem('accent', name);
    picker.querySelectorAll('button').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.accent === name)));
  };

  picker.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) apply(b.dataset.accent);
  });

  apply(saved);
})();
