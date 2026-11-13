import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import { postService } from '../../api/postService';

const SearchBar = ({ placeholder = 'Search articles, architectures, topics...', className = '' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Debounced search for live suggestions
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await postService.searchPosts(query, 5);
        if (res.success) {
          setResults(res.data);
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Live search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    navigate(`/blog?search=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectPost = (slug) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/blog/${slug}`);
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-zoho-red" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-zoho-red focus:border-transparent transition-all shadow-sm"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-3 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Live Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
          <div className="p-2 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50">
            Suggested Articles
          </div>
          <div className="max-h-80 overflow-y-auto">
            {results.map((post) => (
              <div
                key={post._id}
                onClick={() => handleSelectPost(post.slug)}
                className="flex items-start gap-3 p-3 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-12 h-12 rounded object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 line-clamp-1 hover:text-zoho-red">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {post.summary}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    <span>{post.author?.name}</span>
                    <span>•</span>
                    <span>{post.readingTime || '5 min read'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 p-2.5 text-xs font-semibold text-zoho-red bg-red-50/50 hover:bg-red-50 transition-colors"
          >
            <span>See all results for "{query}"</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
