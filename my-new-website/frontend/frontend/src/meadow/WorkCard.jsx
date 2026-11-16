// src/meadow/WorkCard.jsx
// A project hung like a picture: the image on a coloured mat, a museum-style
// caption beneath. The whole card opens the project's page.
import React from 'react';
import { Link } from 'react-router-dom';

const WorkCard = ({ entry }) => {
  const { slug, title, year, kind, stack, premise, image } = entry;
  const meta = [kind === 'lab' ? 'Lab' : null, stack].filter(Boolean).join('. ');
  return (
    <article className="oo-work">
      <Link className="oo-work-link" to={`/projects/${slug}`} aria-label={title}>
        <div className="oo-mat">
          <div>{image && <img src={image} alt="" loading="lazy" />}</div>
        </div>
      </Link>
      <h3 className="oo-work-title">
        <Link to={`/projects/${slug}`}>
          <em>{title}</em>
          {year ? `, ${year}` : ''}
        </Link>
      </h3>
      {meta && <p className="oo-work-meta">{meta}.</p>}
      {premise && <p className="oo-work-text">{premise}</p>}
    </article>
  );
};

export default WorkCard;
