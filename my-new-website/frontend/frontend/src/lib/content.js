// src/lib/content.js
// The site's writing and projects are Markdown files. Drop a file into
// src/content/writing or src/content/projects and it is published on the next
// deploy; see the _template.md in each folder for the fields.
import { collect, isDraft } from './frontmatter.js';

const writingFiles = import.meta.glob('../content/writing/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const projectFiles = import.meta.glob('../content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const allWriting = collect(writingFiles);
const allProjects = collect(projectFiles);

// Published pieces, newest first. Each has /writing/<slug>.
export const WRITING = allWriting.filter((e) => !isDraft(e));
// `status: draft` pieces: listed under "In progress" with no page of their own.
export const DRAFTS = allWriting.filter(isDraft);
// Projects and lab pieces. Each has /projects/<slug>.
export const PROJECTS = allProjects.filter((e) => !isDraft(e));

export const findWriting = (slug) => WRITING.find((e) => e.slug === slug);
export const findProject = (slug) => PROJECTS.find((e) => e.slug === slug);
