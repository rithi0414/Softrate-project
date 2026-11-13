import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layers } from 'lucide-react';

const CategoryNav = ({ categories = [], activeSlug = '' }) => {
  return (
    <div className="w-full bg-white border-y border-slate-200 py-3 mb-10 sticky top-16 sm:top-20 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-2 flex-shrink-0">
            <Layers className="w-3.5 h-3.5 text-zoho-red" />
            Categories:
          </span>

          {/* All Articles Pill */}
          <NavLink
            to="/blog"
            end
            className={({ isActive }) =>
              `px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                isActive && !activeSlug
                  ? 'bg-zoho-red text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`
            }
          >
            All Articles
          </NavLink>

          {/* Dynamic Categories */}
          {categories.map((cat) => {
            const isCurrent = activeSlug === cat.slug;
            return (
              <NavLink
                key={cat._id}
                to={`/category/${cat.slug}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-zoho-red text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.name}</span>
                {cat.postCount !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isCurrent ? 'bg-red-800 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cat.postCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
