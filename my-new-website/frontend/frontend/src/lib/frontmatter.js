// src/lib/frontmatter.js
// Turns one Markdown file into an entry. Pure functions only, so they can be
// tested without Vite. The format is deliberately small:
//
//   ---
//   title: The title
//   date: 2026-12-03
//   ---
//   Body in Markdown.
//
// Values are plain strings; `true` / `false` become booleans.

export function parseFile(path, raw) {
  const slug = path.split('/').pop().replace(/\.md$/, '');
  const text = raw.replace(/\r\n/g, '\n');
  const meta = {};
  let body = text;
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (match) {
    body = text.slice(match[0].length);
    for (const line of match[1].split('\n')) {
      const at = line.indexOf(':');
      if (at < 1 || line.trim().startsWith('#')) continue;
      const key = line.slice(0, at).trim();
      let value = line.slice(at + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      if (value !== '') meta[key] = value;
    }
  }
  const date = meta.date ? new Date(`${meta.date}T12:00:00`) : null;
  const valid = date && !Number.isNaN(date.getTime());
  return {
    ...meta,
    slug,
    body: body.trim(),
    time: valid ? date.getTime() : 0,
    year: valid ? String(date.getFullYear()) : String(meta.year || ''),
    dateLabel: valid ? date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : '',
  };
}

// Files whose name starts with "_" are templates and never published.
export function collect(files) {
  return Object.entries(files)
    .map(([path, raw]) => parseFile(path, raw))
    .filter((entry) => !entry.slug.startsWith('_') && entry.title)
    .sort((a, b) => b.time - a.time || a.title.localeCompare(b.title));
}

export const isDraft = (entry) => entry.status === 'draft';

// [{ year: '2026', items: [...] }, ...] newest year first.
export function byYear(entries) {
  const groups = [];
  for (const entry of entries) {
    const year = entry.year || 'Undated';
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.items.push(entry);
    else groups.push({ year, items: [entry] });
  }
  return groups;
}

// A stable yes/no per slug, used to decide which way the field faces.
export const faces = (slug) =>
  [...slug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 2 === 1;
