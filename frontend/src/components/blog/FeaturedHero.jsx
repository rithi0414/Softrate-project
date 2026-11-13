import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Clock, TrendingUp, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';

const FeaturedHero = ({ posts = [] }) => {
  if (!posts || posts.length === 0) return null;

  const mainFeatured = posts[0];
  const sideFeatured = posts.slice(1, 4);

  return (
    <section className="mb-14">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 bg-red-100 text-zoho-red rounded-lg">
          <Sparkles className="w-4 h-4" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Featured & Trending Stories
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Hero Card */}
        {mainFeatured && (
          <div className="lg:col-span-7 group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Link to={`/blog/${mainFeatured.slug}`}>
                <img
                  src={mainFeatured.featuredImage}
                  alt={mainFeatured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </Link>
              {mainFeatured.categories && mainFeatured.categories[0] && (
                <div className="absolute top-4 left-4">
                  <Badge to={`/category/${mainFeatured.categories[0].slug}`} variant="red" size="md">
                    {mainFeatured.categories[0].name}
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-slate-700">
                    {mainFeatured.publishedDate
                      ? format(new Date(mainFeatured.publishedDate), 'MMMM dd, yyyy')
                      : 'Recently Published'}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {mainFeatured.readingTime || '5 min read'}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-zoho-red transition-colors mb-3 leading-tight">
                  <Link to={`/blog/${mainFeatured.slug}`}>{mainFeatured.title}</Link>
                </h3>

                <p className="text-slate-600 text-sm sm:text-base line-clamp-3 leading-relaxed mb-6">
                  {mainFeatured.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      mainFeatured.author?.avatar ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                    }
                    alt={mainFeatured.author?.name || 'Author'}
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      {mainFeatured.author?.name || 'Softrate Staff Writer'}
                    </h5>
                    <p className="text-[11px] text-slate-500">Author & Technology Lead</p>
                  </div>
                </div>

                <Link
                  to={`/blog/${mainFeatured.slug}`}
                  className="px-4 py-2 bg-slate-900 hover:bg-zoho-red text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Read Full Story
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Side Trending Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 px-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-zoho-red" />
            <span>Editor's Picks</span>
          </div>

          {sideFeatured.map((post, idx) => (
            <article
              key={post._id}
              className="group bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex gap-4 items-center"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 relative">
                <Link to={`/blog/${post.slug}`}>
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              <div className="flex-1 min-w-0">
                {post.categories && post.categories[0] && (
                  <Badge
                    to={`/category/${post.categories[0].slug}`}
                    variant="blue"
                    size="xs"
                    className="mb-1.5"
                  >
                    {post.categories[0].name}
                  </Badge>
                )}

                <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-zoho-red transition-colors line-clamp-2 leading-snug">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>

                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                  <span>
                    {post.publishedDate
                      ? format(new Date(post.publishedDate), 'MMM dd')
                      : 'Recent'}
                  </span>
                  <span>•</span>
                  <span>{post.readingTime || '4 min read'}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHero;
