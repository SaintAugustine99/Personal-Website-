// src/meadow/WritingRow.jsx
// One line in a list of writing. Published pieces link somewhere; drafts
// carry a premise and no link.
import React from 'react';
import { Link } from 'react-router-dom';
import { KIND_LABEL } from '../content/site.js';

const WritingRow = ({ kind, title, premise, date, href, status }) => {
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
      <span className="oo-row-meta">{date || status}</span>
    </>
  );
  if (!href) return <div className="oo-row">{body}</div>;
  return /^https?:/.test(href) ? (
    <a className="oo-row" href={href} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    <Link className="oo-row" to={href}>
      {body}
    </Link>
  );
};

export default WritingRow;
