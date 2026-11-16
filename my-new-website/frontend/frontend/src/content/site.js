// src/content/site.js
// Everything the meadow pages print that is not design. Add an entry here and
// it appears on the site; leave a list empty and the page says so honestly
// instead of showing a placeholder.

// kind: 'essay' | 'paper' | 'idea'
// Published pieces. `href` can be an internal route or a full URL.
//   { kind: 'essay', title: '…', date: 'December 2026', href: '/writing/slug' }
export const WRITING = [];

// Pieces being written — listed on /writing under "In progress".
//   { kind: 'essay', title: '…', premise: 'One line on the argument.' }
export const DRAFTS = [];

// Projects worth showing. Images live in /public.
//   { title: '…', meta: 'Civic tech, 2026. React, Django.', text: '…',
//     image: '/images/….png', href: 'https://…', cta: 'Open the live demo' }
export const PROJECTS = [];

// Path to a portrait in /public (e.g. '/images/portrait.jpg'). Until one is
// set, the About section runs as text only.
export const PORTRAIT = null;

export const LINKS = [
  { label: 'GitHub', href: 'https://github.com/SaintAugustine99' },
  { label: 'X', href: 'https://x.com/OnserioOgeto' },
  { label: 'YouTube', href: 'https://www.youtube.com/watch?v=Sg-hA64-yWs&t=1440s' },
];

export const KIND_LABEL = { essay: 'Essay', paper: 'Paper', idea: 'Idea' };
