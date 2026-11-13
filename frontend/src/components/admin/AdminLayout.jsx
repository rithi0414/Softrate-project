import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Tags,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  PlusCircle,
  ShieldAlert
} from 'lucide-react';
import Logo, { LogoIcon } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children, title, actionButton }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Posts & Articles', to: '/admin/posts', icon: FileText },
    { name: 'Categories', to: '/admin/categories', icon: FolderTree },
    { name: 'Tags', to: '/admin/tags', icon: Tags },
    { name: 'Authors', to: '/admin/authors', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <LogoIcon className="w-7 h-7" idPrefix="sr-mob" />
          <span className="font-extrabold text-sm tracking-tight">
            Soft<span className="text-cyan-400">rate</span> CMS
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 rounded text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } h-screen`}
      >
        <div>
          {/* Logo & Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <LogoIcon className="w-8 h-8" idPrefix="sr-side" />
              <div>
                <span className="font-black text-base text-white tracking-tight">
                  Soft<span className="text-cyan-400">rate</span>
                  <span className="ml-1 text-[10px] uppercase font-bold text-indigo-400 bg-indigo-950 px-1 py-0.5 rounded border border-indigo-800">CMS</span>
                </span>
                <span className="block text-[10px] text-slate-400 font-medium">
                  Blog Admin Console
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Create Action */}
          <div className="p-4">
            <Link
              to="/admin/posts/new"
              onClick={() => setSidebarOpen(false)}
              className="w-full py-2.5 px-4 bg-zoho-red hover:bg-zoho-redHover text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Write New Post</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-800 text-white border-l-4 border-zoho-red'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">
                {user?.username || 'Admin'}
              </span>
              <span className="text-[10px] text-slate-400 capitalize">
                Role: {user?.role || 'Admin'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            to="/"
            target="_blank"
            className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {title || 'Dashboard'}
            </h1>
          </div>
          {actionButton && <div>{actionButton}</div>}
        </div>

        {/* Body Container */}
        <div className="p-6 max-w-7xl w-full">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
