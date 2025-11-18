// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem 3rem;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9); // Subtle backdrop
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: ${({ theme }) => theme.colors.text};
  
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  
  @media (max-width: 768px) {
    display: none; /* Implement mobile menu if needed */
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textSecondary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${({ theme }) => theme.colors.accent};
    transition: width 0.3s ease;
  }

  &:hover::after, &.active::after {
    width: 100%;
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Navbar = () => {
  return (
    <NavWrapper>
      <Logo to="/">
        OO<span>.</span>
      </Logo>
      <NavLinks>
        <StyledNavLink to="/">Index</StyledNavLink>
        <StyledNavLink to="/about">Narrative</StyledNavLink>
        <StyledNavLink to="/portfolio">Work</StyledNavLink>
        <StyledNavLink to="/blog">Journal</StyledNavLink>
        <StyledNavLink to="/contact">Connect</StyledNavLink>
      </NavLinks>
    </NavWrapper>
  );
};

export default Navbar;