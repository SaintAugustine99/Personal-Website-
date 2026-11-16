// src/meadow/SiteNav.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const SiteNav = () => (
  <nav className="oo-nav" aria-label="Primary">
    <NavLink to="/writing">Writing</NavLink>
    <NavLink to="/projects">Projects</NavLink>
    <Link to="/#about">About</Link>
    <NavLink to="/contact">Contact</NavLink>
  </nav>
);

export default SiteNav;
