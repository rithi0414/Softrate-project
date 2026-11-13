import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ShieldCheck, Newspaper, Sparkles, BookOpen } from 'lucide-react';
import SearchBar from './SearchBar';
import Logo from './Logo';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ categories = [] }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro bar for corporate feel */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Official Engineering & Architecture Publication by Softrate Technologies
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              XML Sitemap
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Robots.txt
            </a>
            {isAuthenticated ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Signed in as {user?.username}
              </span>
            ) : (
              <Link to="/admin/login" className="hover:text-white transition-colors">
                Admin Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Unique Softrate Logo */}
          <Logo to="/" size="md" />

          {/* Search Bar Desktop */}
          <div className="hidden lg:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-zoho-red' : 'hover:text-slate-900 transition-colors'
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? 'text-zoho-red' : 'hover:text-slate-900 transition-colors'
              }
            >
              All Articles
            </NavLink>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1 hover:text-slate-900 transition-colors py-2"
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 hidden group-hover:block transition-all duration-200 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Browse by Topic
                </div>
                {categories && categories.length > 0 ? (
                  categories.map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/category/${cat.slug}`}
                      className="flex items-center justify-between px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-zoho-red transition-colors"
                    >
                      <span className="truncate">{cat.name}</span>
                      {cat.postCount !== undefined && (
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {cat.postCount}
                        </span>
                      )}
                    </Link>
                  ))
                ) : (
                  <div className="px-3 py-2 text-xs text-slate-400">Loading categories...</div>
                )}
                <div className="border-t border-slate-100 mt-1 pt-1 px-3">
                  <Link
                    to="/blog"
                    className="text-xs font-semibold text-zoho-red hover:underline block py-1"
                  >
                    View All Topics &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Admin Dashboard Action */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-2">
                <Link
                  to="/admin/dashboard"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  CMS Dashboard
                </Link>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-semibold transition-colors"
              >
                Admin Portal
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-zoho-red"
          >
            Home
          </NavLink>
          <NavLink
            to="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-zoho-red"
          >
            All Articles
          </NavLink>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Featured Categories
            </span>
            <div className="space-y-1">
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat._id}
                  to={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-xs text-slate-600 hover:text-zoho-red"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            {isAuthenticated ? (
              <Link
                to="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold"
              >
                Go to CMS Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block py-2.5 border border-slate-300 text-slate-800 rounded-lg text-sm font-semibold"
              >
                Admin Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
