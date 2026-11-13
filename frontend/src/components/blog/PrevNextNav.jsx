import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PrevNextNav = ({ previous, next }) => {
  if (!previous && !next) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 pt-8 border-t border-slate-200">
      {/* Previous Article */}
      {previous ? (
        <Link
          to={`/blog/${previous.slug}`}
          className="group p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-3 text-left"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-zoho-red group-hover:text-white transition-colors flex-shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Previous Article
            </span>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-zoho-red transition-colors line-clamp-1">
              {previous.title}
            </h4>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {/* Next Article */}
      {next && (
        <Link
          to={`/blog/${next.slug}`}
          className="group p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all flex items-center justify-between gap-3 text-right"
        >
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Next Article
            </span>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-zoho-red transition-colors line-clamp-1">
              {next.title}
            </h4>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-zoho-red group-hover:text-white transition-colors flex-shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default PrevNextNav;
