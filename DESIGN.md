# The meadow: design guide for onserioogeto.org

This is the standing brief for the site's design. Read it before changing any
page. It records decisions that were made deliberately with Onserio, including
things that were tried and rejected.

## The idea

The site is one painting: a wildflower meadow under a deep sky, with a man
sitting in the grass looking at it. Every page is the same field seen at a
different hour and from a different spot. The feeling to protect is the one
you get from staring at a painting or sitting in nature: quiet, unhurried,
looked-at-for-a-long-time. Onserio's words for the first version, which was
bold blue and lime with pill buttons: "less ad-like texture; more soft".

Competence is shown by restraint and precision, not by effects. The site
should only reveal that it is alive when someone stops and looks.

## What must stay true

1. **One field.** All scenery is the same layered painting in
   `public/meadow/`. Do not add stock photos, gradients-as-decoration, or a
   second illustration style.
2. **The name is the sun and the moon.** In "Onserio Ogeto" the first O is an
   ochre disc (sun) and the second a pale one (moon). This is the logo. An
   earlier version made the O's into eyes that blinked and followed the
   cursor; Onserio found it out of place. Do not bring eyes back.
3. **The figure belongs to the field.** He is seated, seen from behind, broad
   shouldered, dark skinned, in a pale shirt, with the grass closing over his
   lower half. He is small and never the focus. A standing figure "floating"
   on the grass was rejected. At night he has a candle, just enough light to
   make him out.
4. **Each page has an hour.** Home follows the visitor's clock (day or
   night). Writing is dusk. Projects is day. Each essay or project sets its
   own with `hour:` (dawn, day, dusk, night). The field is mirrored on some
   pages so the figure turns up somewhere new.
5. **Pages end at night.** Every page closes on the deep-blue footer with the
   single moon.
6. **Honest when empty.** No sample content, no lorem ipsum, no placeholder
   titles on the live site. An empty list prints one plain sentence.
7. **Motion is weather, not interface.** Slow wind in the flowers, a slight
   lean away from the pointer, two birds by day, fireflies and a candle by
   night. Nothing bounces, pops or slides in on scroll. Everything respects
   `prefers-reduced-motion`.

## Palette

| Role | Value | Use |
| --- | --- | --- |
| Paper | `#eee7d8` | Page ground |
| Ink | `#211e1b` | Text |
| Ink, soft | `#3a342e` | Long body copy |
| Muted | `#5a524a` | Captions, metadata |
| Rule | `#bdb09a`, `#d6ccb9` | Hairlines |
| Rust | `#b5452c` | Link underlines, hover `#9a3a24` |
| Night | `#101f45` | Footer, hero ground |
| Bone | `#f3ecd9` | Text on night |
| Ochre | `#f0c050` | Accent on night only |
| Dabs | `#db981c` essay, `#b5452c` paper, `#3f6e2c` idea | Small painted discs |
| Mats | `#8d6f78`, `#b08a2e`, `#3f5a4c` | Behind project images |

Colours come from the painting. Do not introduce new hues; if something needs
emphasis, use size, space or italic first.

## Type

- **Newsreader** (serif), light to regular weight, sentence case: the name,
  headings, essay text, asides in italic.
- **Instrument Sans**: navigation, metadata, captions, short body copy.
- No uppercase labels, no letter-spaced monospace, no bold display type.
- Reading column: about 680px, 1.7 line height.

## Recurring pieces

- **Painted dab**: a slightly irregular disc. Marks the kind of a piece of
  writing; three in a row make the section break inside an essay.
- **Sun and moon**: the wordmark, and the pair that closes every essay.
- **Mat**: project images sit on a coloured mat with a museum-style caption
  ("*Title*, year. Medium."). Lab pieces run inside the mat.
- **Underlined text links** instead of buttons. No pills, no filled buttons.
- **Facts strip**: small label-and-value pairs between two hairlines.

## Avoid

Gradient washes, glassy cards, drop shadows, rounded cards with a coloured
left border, emoji, icon grids, stat counters, scroll-triggered animation,
carousels, dark mode toggles (the hour already does this), snow (it is a
Nairobi meadow), and anything that reads as a template or an advertisement.

## How the code is laid out

All paths are under `my-new-website/frontend/frontend/`.

- `src/meadow/meadow.css`: every style, scoped under `.oo`. The first block
  undoes the old brutalist `GlobalStyles`, which older pages still load.
- `src/meadow/MeadowScene.jsx`: the painting (sky, ground, figure, three
  flower depths, birds, fireflies, candle). Props: `time`, `strip`, `mirrored`.
- `src/meadow/PageHeader.jsx`: the band of meadow on inner pages.
- `src/meadow/Wordmark.jsx`, `SiteNav.jsx`, `SiteFooter.jsx`, `WritingRow.jsx`,
  `WorkCard.jsx`, `NotHere.jsx`.
- `src/lib/content.js`: loads the Markdown files. `src/lib/frontmatter.js`
  parses them. `src/lib/markdown.jsx` renders them (no Markdown dependency).
- `src/pages/`: `Home`, `Writing`, `Essay`, `Projects`, `Project`. `Contact`
  and `ComingSoon` are older pages in the old layout, repainted to this
  palette; they are the next candidates for a proper redesign.
- `public/meadow/`: the painting's layers. They were generated by script; if
  one must be redrawn, keep its size (2400 by 1400 for layers) and horizon
  (60% down) so the layers still line up.

## Publishing

Writing and projects are Markdown files. Adding a file publishes it on the
next deploy.

- **An essay, paper or idea**: copy `src/content/writing/_template.md`, rename
  it, fill in the fields at the top. `my-essay.md` appears at
  `/writing/my-essay`.
- **A project or lab piece**: copy `src/content/projects/_template.md`.
  `my-project.md` appears at `/projects/my-project`.
- `status: draft` on a piece of writing lists it under "In progress" without
  a page. On a project it hides it.
- `featured: true` on one piece of writing shows it large at the top of
  `/writing`.
- Images go in `public/images/` and are referenced as `/images/name.jpg`.
- The portrait and outside links are in `src/content/site.js`.

The bar for a project is high on purpose. Three strong pieces beat eight.
Earlier projects (Jamii, Emergence, Constitutive Topology) were left off
because Onserio does not consider them strong enough yet; their files are
still in `public/`.

## Ideas agreed but not built

- Rain or mist on roughly one visit in ten. Rare on purpose.
- The sun and moon as the favicon, and as a page transition (setting on one
  page, rising on the next).
- Contact page redesigned in this language.
- A share image per essay showing its hour of the meadow.
