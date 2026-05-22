import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 flex justify-between items-center relative">
        <Link to="/" className="text-2xl font-bold text-primary" onClick={closeMenu}>
          📚 LMS
        </Link>

        <button 
          className="md:hidden text-2xl text-textDark px-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul className={`
          md:flex md:items-center md:gap-8 md:relative md:bg-transparent md:shadow-none md:p-0 md:max-h-none md:flex-row md:overflow-visible
          ${menuOpen 
            ? 'absolute top-full left-0 right-0 bg-white shadow-lg p-5 flex flex-col gap-4 max-h-96' 
            : 'absolute top-full left-0 right-0 bg-white max-h-0 overflow-hidden md:max-h-none md:overflow-visible'
          }
          transition-all duration-300
        `}>
          <li>
            <Link 
              to="/" 
              className="block py-2 px-4 rounded text-textDark font-medium hover:text-primary hover:bg-bg md:hover:bg-transparent transition"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className="block py-2 px-6 rounded-md bg-primary text-white font-medium hover:bg-primary-dark transition text-center"
              onClick={closeMenu}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;