# Working on this repository

This is Onserio Ogeto's personal site (onserioogeto.org), deployed by Vercel
from `main`. The app is in `my-new-website/frontend/frontend/` (React, Vite).
The Django backend in `my-new-website/backend/` is not deployed.

**Read `DESIGN.md` before touching anything visual.** The site has a
deliberate design language (a painted meadow) and a list of things that were
tried and rejected. Follow it; do not restyle pages to a generic look.

## Rules of thumb

- New pages use the pieces in `src/meadow/` and the classes in
  `src/meadow/meadow.css` (all scoped under `.oo`). Do not add a second
  styling approach or new colours.
- Writing and projects are Markdown files in `src/content/writing` and
  `src/content/projects`. To publish something, add a file; do not hard-code
  content in components. Templates are the `_template.md` files.
- Never ship placeholder or sample content. An empty list prints one honest
  sentence.
- Do not add dependencies for things the code already does (Markdown
  rendering, front matter parsing, animation).
- Work on a branch and open a pull request. Vercel builds a preview for every
  pull request; check that it passes before merging.
- Copy is Onserio's voice: plain, exact, a little dry. Do not write marketing
  lines for him.
