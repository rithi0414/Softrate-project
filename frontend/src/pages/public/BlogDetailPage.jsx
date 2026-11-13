import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Clock,
  Eye,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Twitter,
  Linkedin,
  Github,
  Globe
} from 'lucide-react';
import { postService } from '../../api/postService';
import { categoryService } from '../../api/categoryService';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';
import Badge from '../../components/common/Badge';
import TableOfContents from '../../components/blog/TableOfContents';
import ShareButtons from '../../components/blog/ShareButtons';
import RelatedPosts from '../../components/blog/RelatedPosts';
import PrevNextNav from '../../components/blog/PrevNextNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [navigation, setNavigation] = useState({ previous: null, next: null });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch categories for navbar
  useEffect(() => {
    categoryService.getCategories().then((res) => {
      if (res.success) setCategories(res.data);
    });
  }, []);

  // Fetch article data by slug
  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await postService.getPostBySlug(slug);
        if (res.success && res.data) {
          setPost(res.data);
          setRelatedPosts(res.relatedPosts || []);
          setNavigation(res.navigation || { previous: null, next: null });
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Article not found or has been removed.');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar categories={categories} />
        <div className="flex-1 flex items-center justify-center py-20">
          <LoadingSpinner size="lg" text="Loading publication..." />
        </div>
        <Footer categories={categories} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar categories={categories} />
        <div className="flex-1 max-w-xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Article Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">{error || 'The requested article could not be loaded.'}</p>
          <Link
            to="/blog"
            className="px-5 py-2.5 bg-zoho-red hover:bg-zoho-redHover text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Articles</span>
          </Link>
        </div>
        <Footer categories={categories} />
      </div>
    );
  }

  const primaryCategory = post.categories && post.categories.length > 0 ? post.categories[0] : null;
  const formattedDate = post.publishedDate
    ? format(new Date(post.publishedDate), 'MMMM dd, yyyy')
    : 'Recently Published';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Dynamic SEO Tags */}
      <SEO
        title={post.seoTitle || post.title}
        description={post.metaDescription || post.summary}
        ogType="article"
        ogImage={post.featuredImage}
        canonical={window.location.origin + `/blog/${post.slug}`}
        articleData={post}
      />

      <Navbar categories={categories} />

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto scrollbar-none">
            <Link to="/" className="hover:text-zoho-red transition-colors flex-shrink-0">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <Link to="/blog" className="hover:text-zoho-red transition-colors flex-shrink-0">
              Blog
            </Link>
            {primaryCategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <Link
                  to={`/category/${primaryCategory.slug}`}
                  className="hover:text-zoho-red transition-colors flex-shrink-0"
                >
                  {primaryCategory.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-slate-800 font-semibold truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-white pt-10 pb-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.categories?.map((cat) => (
              <Badge key={cat._id} to={`/category/${cat.slug}`} variant="red" size="md">
                {cat.name}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt Summary */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-medium">
            {post.summary}
          </p>

          {/* Meta Information & Share row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={
                  post.author?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                }
                alt={post.author?.name || 'Author'}
                className="w-11 h-11 rounded-full object-cover border-2 border-slate-200"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {post.author?.name || 'Softrate Contributor'}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formattedDate}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime || '5 min read'}
                  </span>
                  {post.viewsCount > 0 && (
                    <>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Eye className="w-3.5 h-3.5" />
                        {post.viewsCount} views
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <ShareButtons title={post.title} url={window.location.href} />
          </div>
        </div>
      </header>

      {/* Main Content Area: Article + Sticky Table of Contents */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Featured Image */}
        <div className="max-w-4xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 aspect-[16/9] sm:aspect-[21/9]">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* Main Article Body (8 Cols) */}
          <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            {/* Rich Content Output */}
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags Cloud */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Related Topics & Tags
                </span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag._id}
                      to={`/tag/${tag.slug}`}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full border border-slate-200 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Profile Box */}
            {post.author && (
              <div className="mt-10 p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src={
                    post.author.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                  }
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                    <h4 className="text-base font-bold text-slate-900">
                      About {post.author.name}
                    </h4>
                    {/* Social links */}
                    <div className="flex items-center gap-2 text-slate-500">
                      {post.author.socialLinks?.twitter && (
                        <a
                          href={post.author.socialLinks.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-zoho-red transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {post.author.socialLinks?.linkedin && (
                        <a
                          href={post.author.socialLinks.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-zoho-red transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {post.author.socialLinks?.github && (
                        <a
                          href={post.author.socialLinks.github}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-zoho-red transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {post.author.socialLinks?.website && (
                        <a
                          href={post.author.socialLinks.website}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-zoho-red transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {post.author.bio ||
                      'Contributing writer and technical specialist at Softrate Technologies, focused on cloud software and modern application architectures.'}
                  </p>
                </div>
              </div>
            )}

            {/* Previous / Next Article Navigation */}
            <PrevNextNav
              previous={navigation.previous}
              next={navigation.next}
            />
          </article>

          {/* Sticky Table of Contents & Side Actions (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <TableOfContents content={post.content} />

            {/* Newsletter widget */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-xl shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block mb-1">
                Engineering Weekly
              </span>
              <h4 className="text-sm font-bold mb-2">
                Stay Ahead of Cloud Architectures
              </h4>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Receive our hand-curated engineering articles, benchmarks, and architectural designs directly in your inbox.
              </p>
              <Link
                to="/blog"
                className="w-full py-2 px-3 bg-zoho-red hover:bg-zoho-redHover text-white rounded-lg text-xs font-bold text-center block transition-colors"
              >
                Browse All Topics
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
      </main>

      <Footer categories={categories} />
    </div>
  );
};

export default BlogDetailPage;
