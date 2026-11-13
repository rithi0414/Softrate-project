import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { postService } from '../../api/postService';
import { categoryService } from '../../api/categoryService';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';
import PostCard from '../../components/common/PostCard';
import FeaturedHero from '../../components/blog/FeaturedHero';
import CategoryNav from '../../components/blog/CategoryNav';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const HomePage = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch categories
        const catRes = await categoryService.getCategories();
        if (catRes.success) setCategories(catRes.data);

        // Fetch featured posts for hero
        const featRes = await postService.getPosts({ featured: 'true', limit: 4 });
        if (featRes.success) setFeaturedPosts(featRes.data);

        // Fetch popular posts (sorted by viewsCount)
        const popRes = await postService.getPosts({ sort: '-viewsCount', limit: 5 });
        if (popRes.success) setPopularPosts(popRes.data);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch latest posts with pagination
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await postService.getPosts({
          page: currentPage,
          limit: 6,
          sort: '-publishedDate'
        });
        if (res.success) {
          setLatestPosts(res.data);
          setTotalPages(res.totalPages);
        }
      } catch (err) {
        console.error('Error fetching latest posts:', err);
      }
    };

    fetchLatest();
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <SEO
        title="Softrate Tech - Modern Engineering, Cloud & AI Architecture"
        description="Explore in-depth technical articles, cloud engineering paradigms, AI research, and software architecture insights from Softrate."
      />

      <Navbar categories={categories} />
      <CategoryNav categories={categories} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        {isLoading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" text="Loading tech publications..." />
          </div>
        ) : (
          <>
            {/* Featured Hero Section */}
            <FeaturedHero posts={featuredPosts} />

            {/* Main Content Layout: Latest Posts (Left) + Trending Sidebar (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Latest Posts (8 Cols) */}
              <section className="lg:col-span-8">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-100 text-zoho-red rounded-lg">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      Latest Articles
                    </h2>
                  </div>
                  <Link
                    to="/blog"
                    className="text-xs font-bold text-zoho-red hover:text-zoho-redHover flex items-center gap-1 transition-colors"
                  >
                    <span>View All Articles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {latestPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {latestPosts.map((post) => (
                      <PostCard key={post._id} post={post} layout="grid" />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl p-8 text-center border border-slate-200 text-slate-500">
                    No articles found. Seed data or write a new post from the CMS admin portal.
                  </div>
                )}

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }}
                />
              </section>

              {/* Sidebar (4 Cols): Trending / Popular Articles & Categories */}
              <aside className="lg:col-span-4 space-y-8">
                {/* Popular Posts Box */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                    <TrendingUp className="w-4 h-4 text-zoho-red" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Most Read Stories
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {popularPosts.map((post, idx) => (
                      <article key={post._id} className="flex gap-3 group items-start">
                        <span className="text-2xl font-black text-slate-200 group-hover:text-zoho-red transition-colors w-6 flex-shrink-0">
                          0{idx + 1}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-zoho-red transition-colors line-clamp-2 leading-snug">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h4>
                          <span className="text-[11px] text-slate-400 mt-1 block">
                            {post.readingTime || '5 min read'} • {post.viewsCount || 0} views
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Explore Categories Box */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                    <Layers className="w-4 h-4 text-zoho-red" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Topic Hubs
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat._id}
                        to={`/category/${cat.slug}`}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 group transition-colors"
                      >
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-zoho-red truncate">
                          {cat.name}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full group-hover:bg-red-50 group-hover:text-zoho-red">
                          {cat.postCount || 0}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mini Promo Card */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-xl p-6 text-white text-center shadow-md border border-slate-800">
                  <h4 className="text-base font-bold mb-2">Write for Softrate Tech?</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Have architectural insights or scaling war stories to share with 200,000+ engineers?
                  </p>
                  <Link
                    to="/admin/login"
                    className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                  >
                    Open Editor Portal
                  </Link>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>

      <Footer categories={categories} />
    </div>
  );
};

export default HomePage;
