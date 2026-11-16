// src/content/site.js
// Site-wide facts that are not writing or projects. Essays and projects are
// Markdown files in ./writing and ./projects (see src/lib/content.js).

// Path to a portrait in /public (e.g. '/images/portrait.jpg'). Until one is
// set, the About section runs as text only.
export const PORTRAIT = null;

export const LINKS = [
  { label: 'GitHub', href: 'https://github.com/SaintAugustine99' },
  { label: 'X', href: 'https://x.com/OnserioOgeto' },
  { label: 'YouTube', href: 'https://www.youtube.com/watch?v=Sg-hA64-yWs&t=1440s' },
];

export const KIND_LABEL = { essay: 'Essay', paper: 'Paper', idea: 'Idea' };
