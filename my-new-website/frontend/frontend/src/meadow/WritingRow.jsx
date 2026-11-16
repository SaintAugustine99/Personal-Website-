// src/meadow/WritingRow.jsx
// One line in a list of writing. Published pieces open their page (or an
// outside `link`, for work that lives elsewhere); drafts carry a premise and
// go nowhere yet.
import React from 'react';
import { Link } from 'react-router-dom';
import { KIND_LABEL } from '../content/site.js';

const WritingRow = ({ entry, draft = false }) => {
  const { kind = 'essay', title, premise, dateLabel, slug, link } = entry;
  const body = (
    <>
      <span className="oo-row-kind">
        <span className={`oo-dab ${kind}`} aria-hidden="true" />
        {KIND_LABEL[kind] || kind}
      </span>
      <span className="oo-row-main">
        <span className="oo-row-title">{title}</span>
        {premise && <span className="oo-row-premise">{premise}</span>}
      </span>
      <span className="oo-row-meta">{draft ? 'Drafting' : dateLabel}</span>
    </>
  );
  if (draft) return <div className="oo-row">{body}</div>;
  return link ? (
    <a className="oo-row" href={link} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    <Link className="oo-row" to={`/writing/${slug}`}>
      {body}
    </Link>
  );
};

export default WritingRow;
