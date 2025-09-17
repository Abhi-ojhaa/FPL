import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="golden-navbar">
      <div className="golden-logo" onClick={() => navigate('/')}>
        <span role="img" aria-label="trophy" className="golden-logo-icon">🏆</span>
        <span className="golden-logo-text">FPL<span style={{fontWeight:400}}>Hub</span></span>
      </div>
      <nav className="golden-nav-links">
        <button
          className={`golden-nav-link${isActive('/') ? ' active' : ''}`}
          onClick={() => navigate('/')}
        >Home</button>
        <button
          className={`golden-nav-link${isActive('/clubs') ? ' active' : ''}`}
          onClick={() => navigate('/clubs')}
        >Clubs</button>
        <button
          className={`golden-nav-link${isActive('/fixtures') ? ' active' : ''}`}
          onClick={() => navigate('/fixtures')}
        >Fixtures</button>
        <button
          className={`golden-nav-link${isActive('/compare') ? ' active' : ''}`}
          onClick={() => navigate('/compare')}
        >Compare</button>
        <button
          className={`golden-nav-link${isActive('/suggestions') ? ' active' : ''}`}
          onClick={() => navigate('/suggestions')}
        >Suggestions</button>
      </nav>
    </header>
  );
}