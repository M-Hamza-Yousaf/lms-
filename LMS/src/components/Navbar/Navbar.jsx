import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  // State for mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when link clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          📚 LMS
        </Link>

        {/* Hamburger Button (only visible on mobile) */}
        <button 
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Nav Links */}
        <ul className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/login" className="btn-primary" onClick={closeMenu}>Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;