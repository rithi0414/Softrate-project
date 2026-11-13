import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 text-zoho-red font-black text-2xl flex items-center justify-center mx-auto mb-4">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          The page or article you are looking for does not exist, has been removed, or has moved to another URL.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="px-4 py-2.5 bg-zoho-red hover:bg-zoho-redHover text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            to="/blog"
            className="px-4 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Articles</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
