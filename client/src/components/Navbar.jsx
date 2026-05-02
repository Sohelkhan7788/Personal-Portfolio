import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { HiMoon, HiSun, HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact Me', href: '#contact' },
  ];

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#0f0f1a]/80 backdrop-blur-xl shadow-lg'
          : 'bg-white dark:bg-[#0f0f1a]'
      }`}
    >
      {/* 🔥 Container Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg group-hover:scale-110 transition-transform">
            S
          </div>
          <span className="font-bold text-lg sm:text-xl dark:text-white">
            Sohel Khan
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition-all duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className="p-2 rounded-xl bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-300 hover:scale-110"
          >
            {dark ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:scale-110 transition-all"
          >
            {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* 🔥 Mobile Menu (Animated) */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 dark:bg-[#0f0f1a]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col gap-4">

          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-left text-gray-700 dark:text-gray-300 hover:text-primary font-medium py-2 transition-all"
            >
              {link.label}
            </button>
          ))}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;