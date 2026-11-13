import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tag as TagIcon, ArrowLeft, BookOpen } from 'lucide-react';
import { postService } from '../../api/postService';
import { tagService } from '../../api/tagService';
import { categoryService } from '../../api/categoryService';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';
import PostCard from '../../components/common/PostCard';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const TagPage = () => {
  const { slug } = useParams();
  const [tag, setTag] = useState(null);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categoryService.getCategories().then((res) => {
      if (res.success) setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    const fetchTagAndPosts = async () => {
      setIsLoading(true);
      try {
        const tagRes = await tagService.getTagBySlug(slug);
        if (tagRes.success) setTag(tagRes.data);

        const postsRes = await postService.getPosts({
          tag: slug,
          page: currentPage,
          limit: 9
        });
        if (postsRes.success) {
          setPosts(postsRes.data);
          setTotalPages(postsRes.totalPages);
        }
      } catch (err) {
        console.error('Error fetching tag data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchTagAndPosts();
      window.scrollTo(0, 0);
    }
  }, [slug, currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <SEO
        title={tag ? `#${tag.name} Articles | Zoho Blog Tech` : 'Tag Archive'}
        description={`Articles tagged with #${slug}.`}
      />

      <Navbar categories={categories} />

      <section className="bg-white border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-zoho-red mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Publications</span>
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-zoho-red uppercase tracking-wider">
              Tag Collection
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            #{tag?.name || slug}
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Showing all articles and architectural insights tagged with #{tag?.name || slug}
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {isLoading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" text="Loading tagged publications..." />
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} layout="grid" />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">
              No articles found with this tag
            </h3>
            <Link
              to="/blog"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors inline-block mt-3"
            >
              Browse All Articles
            </Link>
          </div>
        )}
      </main>

      <Footer categories={categories} />
    </div>
  );
};

export default TagPage;
