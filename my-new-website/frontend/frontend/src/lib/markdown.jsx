// src/lib/markdown.jsx
// A small Markdown renderer for essays and project write-ups. It covers what
// long-form prose needs and nothing more, so the site carries no Markdown
// dependency:
//
//   ## Heading, ### Subheading        > quotation
//   paragraphs, *italic*, **bold**    - and 1. lists
//   `code`, ``` fenced blocks         --- section break
//   [links](https://…)                ![alt](/images/x.jpg "caption")
//   footnotes: a marker[^1] and, anywhere, a line "[^1]: The note."
//
// Raw HTML is not interpreted; it prints as text.
import React from 'react';

const INLINE =
  /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\n]+\*)|(_[^_\n]+_)|(\[\^[^\]]+\])|(\[[^\]]+\]\([^)\s]+\))/;

function inline(text, notes, keyPrefix = 'i') {
  const out = [];
  let rest = text;
  let n = 0;
  while (rest) {
    const m = INLINE.exec(rest);
    if (!m) {
      out.push(rest);
      break;
    }
    if (m.index > 0) out.push(rest.slice(0, m.index));
    const tok = m[0];
    const key = `${keyPrefix}-${n++}`;
    if (m[1]) out.push(<code key={key}>{tok.slice(1, -1)}</code>);
    else if (m[2]) out.push(<strong key={key}>{inline(tok.slice(2, -2), notes, key)}</strong>);
    else if (m[3] || m[4]) out.push(<em key={key}>{inline(tok.slice(1, -1), notes, key)}</em>);
    else if (m[5]) {
      const id = tok.slice(2, -1);
      if (!notes.order.includes(id)) notes.order.push(id);
      const num = notes.order.indexOf(id) + 1;
      out.push(
        <sup key={key} id={`fnref-${id}`}>
          <a href={`#fn-${id}`} aria-label={`Footnote ${num}`}>
            {num}
          </a>
        </sup>,
      );
    } else {
      const parts = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(tok);
      const href = parts[2];
      const external = /^https?:/.test(href);
      out.push(
        <a key={key} href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
          {inline(parts[1], notes, key)}
        </a>,
      );
    }
    rest = rest.slice(m.index + tok.length);
  }
  return out;
}

const IMAGE = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/;
const NOTE = /^\[\^([^\]]+)\]:\s*(.*)$/;
const isBreak = (l) => /^(-{3,}|\*{3,})$/.test(l.trim());
const startsBlock = (l) =>
  /^(#{2,3}\s|>|[-*]\s|\d+\.\s|```)/.test(l) || IMAGE.test(l.trim()) || NOTE.test(l) || isBreak(l);

// The painted section break: three dabs instead of a rule.
const Break = () => (
  <div className="oo-break" role="separator">
    <span className="oo-dab essay" />
    <span className="oo-dab paper" />
    <span className="oo-dab idea" />
  </div>
);

export function Markdown({ source }) {
  const lines = (source || '').replace(/\r\n/g, '\n').split('\n');
  const notes = { order: [], text: {} };
  const blocks = [];
  let i = 0;
  let k = 0;
  const key = () => `b-${k++}`;

  // Footnote definitions can sit anywhere; lift them out first.
  const kept = [];
  for (const line of lines) {
    const m = NOTE.exec(line);
    if (m) notes.text[m[1]] = m[2];
    else kept.push(line);
  }

  while (i < kept.length) {
    const line = kept[i];
    if (!line.trim()) {
      i += 1;
    } else if (line.startsWith('```')) {
      const code = [];
      i += 1;
      while (i < kept.length && !kept[i].startsWith('```')) code.push(kept[i++]);
      i += 1;
      blocks.push(
        <pre key={key()}>
          <code>{code.join('\n')}</code>
        </pre>,
      );
    } else if (isBreak(line)) {
      blocks.push(<Break key={key()} />);
      i += 1;
    } else if (/^#{2,3}\s/.test(line)) {
      const Tag = line.startsWith('###') ? 'h3' : 'h2';
      blocks.push(<Tag key={key()}>{inline(line.replace(/^#{2,3}\s+/, ''), notes)}</Tag>);
      i += 1;
    } else if (IMAGE.test(line.trim())) {
      const [, alt, src, caption] = IMAGE.exec(line.trim());
      blocks.push(
        <figure key={key()}>
          <img src={src} alt={alt} loading="lazy" />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>,
      );
      i += 1;
    } else if (line.startsWith('>')) {
      const quote = [];
      while (i < kept.length && kept[i].startsWith('>')) quote.push(kept[i++].replace(/^>\s?/, ''));
      blocks.push(<blockquote key={key()}>{inline(quote.join(' '), notes)}</blockquote>);
    } else if (/^([-*]|\d+\.)\s/.test(line)) {
      const ordered = /^\d+\.\s/.test(line);
      const marker = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
      const items = [];
      while (i < kept.length && marker.test(kept[i])) items.push(kept[i++].replace(marker, ''));
      const Tag = ordered ? 'ol' : 'ul';
      blocks.push(
        <Tag key={key()}>
          {items.map((item, n) => (
            <li key={n}>{inline(item, notes)}</li>
          ))}
        </Tag>,
      );
    } else {
      const para = [];
      while (i < kept.length && kept[i].trim() && !(para.length && startsBlock(kept[i]))) {
        para.push(kept[i++].trim());
      }
      blocks.push(<p key={key()}>{inline(para.join(' '), notes)}</p>);
    }
  }

  return (
    <div className="oo-prose">
      {blocks}
      {notes.order.length > 0 && (
        <ol className="oo-notes" aria-label="Footnotes">
          {notes.order.map((id) => (
            <li key={id} id={`fn-${id}`}>
              {inline(notes.text[id] || '', { order: [], text: {} }, `fn-${id}`)}{' '}
              <a href={`#fnref-${id}`} aria-label="Back to the text">
                ↩
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Markdown;
