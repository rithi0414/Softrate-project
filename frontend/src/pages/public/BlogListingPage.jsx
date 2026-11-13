import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, Search, Filter, X, SlidersHorizontal, BookOpen } from 'lucide-react';
import { postService } from '../../api/postService';
import { categoryService } from '../../api/categoryService';
import { tagService } from '../../api/tagService';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';
import PostCard from '../../components/common/PostCard';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const BlogListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState('grid'); // 'grid' | 'list'

  // Query state derived from URL
  const selectedCategory = searchParams.get('category') || '';
  const selectedTag = searchParams.get('tag') || '';
  const searchQuery = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const sortBy = searchParams.get('sort') || '-publishedDate';

  // Fetch categories and tags
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [catsRes, tagsRes] = await Promise.all([
          categoryService.getCategories(),
          tagService.getTags()
        ]);
        if (catsRes.success) setCategories(catsRes.data);
        if (tagsRes.success) setTags(tagsRes.data);
      } catch (err) {
        console.error('Error fetching metadata:', err);
      }
    };
    fetchMetadata();
  }, []);

  // Fetch posts on query param change
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: 9,
          sort: sortBy
        };
        if (selectedCategory) params.category = selectedCategory;
        if (selectedTag) params.tag = selectedTag;
        if (searchQuery) params.search = searchQuery;

        const res = await postService.getPosts(params);
        if (res.success) {
          setPosts(res.data);
          setTotalPosts(res.total);
          setTotalPages(res.totalPages);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory, selectedTag, searchQuery, currentPage, sortBy]);

  // Helper to update search params
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // Reset to page 1 on filter change
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <SEO
        title="All Engineering Publications & Articles | Softrate Tech"
        description="Browse all technical articles, architecture teardowns, cloud tutorials, and AI engineering insights from Softrate."
      />

      <Navbar categories={categories} />

      {/* Hero Banner Header */}
      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400 block mb-2">
              The Technology Archive
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Explore All Engineering Publications
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              In-depth articles covering modern system architecture, AI automation, container orchestration, and full-stack software development.
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters (3 Cols) */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Filter Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <Filter className="w-4 h-4 text-zoho-red" />
                  <span>Filters</span>
                </div>
                {(selectedCategory || selectedTag || searchQuery) && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs text-zoho-red hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                  <button
                    type="button"
                    onClick={() => updateParam('category', '')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      !selectedCategory
                        ? 'bg-red-50 text-zoho-red font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      type="button"
                      onClick={() => updateParam('category', cat.slug)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-red-50 text-zoho-red font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      {cat.postCount !== undefined && (
                        <span className="text-[10px] text-slate-400">({cat.postCount})</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag Filter */}
              {tags.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Popular Tags
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => {
                      const isActive = selectedTag === tag.slug;
                      return (
                        <button
                          key={tag._id}
                          type="button"
                          onClick={() => updateParam('tag', isActive ? '' : tag.slug)}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                            isActive
                              ? 'bg-slate-900 text-white border-slate-900 font-bold'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          #{tag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Articles Listing Area (9 Cols) */}
          <section className="lg:col-span-9">
            {/* Controls Bar: Search summary, sorting, grid/list view */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div>
                <p className="text-xs text-slate-500">
                  Showing <span className="font-bold text-slate-800">{posts.length}</span> of{' '}
                  <span className="font-bold text-slate-800">{totalPosts}</span> articles
                  {searchQuery && (
                    <span>
                      {' '}
                      matching "<span className="text-zoho-red font-semibold">{searchQuery}</span>"
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => updateParam('sort', e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
                  >
                    <option value="-publishedDate">Newest First</option>
                    <option value="publishedDate">Oldest First</option>
                    <option value="-viewsCount">Most Popular</option>
                  </select>
                </div>

                {/* View Layout Switcher */}
                <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setLayout('grid')}
                    className={`p-1.5 rounded-md transition-colors ${
                      layout === 'grid'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout('list')}
                    className={`p-1.5 rounded-md transition-colors ${
                      layout === 'list'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Articles List / Grid */}
            {isLoading ? (
              <div className="py-20">
                <LoadingSpinner size="md" text="Loading articles..." />
              </div>
            ) : posts.length > 0 ? (
              <div
                className={
                  layout === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} layout={layout} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800 mb-1">No articles found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  No articles matched your current filters. Try searching for a different keyword or resetting filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set('page', page.toString());
                setSearchParams(newParams);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
            />
          </section>
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  );
};

export default BlogListingPage;
