import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Clock, Eye } from 'lucide-react';
import Badge from './Badge';

const PostCard = ({ post, layout = 'grid' }) => {
  if (!post) return null;

  const formattedDate = post.publishedDate
    ? format(new Date(post.publishedDate), 'MMM dd, yyyy')
    : 'Recent';

  const primaryCategory =
    post.categories && post.categories.length > 0 ? post.categories[0] : null;

  if (layout === 'list') {
    return (
      <article className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="sm:w-1/3 relative overflow-hidden bg-slate-100 min-h-[200px]">
          <Link to={`/blog/${post.slug}`}>
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </Link>
          {primaryCategory && (
            <div className="absolute top-3 left-3">
              <Badge to={`/category/${primaryCategory.slug}`} variant="red">
                {primaryCategory.name}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="sm:w-2/3 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
              <span className="font-medium text-slate-700">{formattedDate}</span>
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
                    {post.viewsCount}
                  </span>
                </>
              )}
            </div>

            <h3 className="text-xl font-bold text-slate-900 group-hover:text-zoho-red transition-colors mb-2.5 line-clamp-2">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>

            <p className="text-sm text-slate-600 line-clamp-2 sm:line-clamp-3 mb-4 leading-relaxed">
              {post.summary}
            </p>
          </div>

          {/* Author */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2.5">
              <img
                src={post.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={post.author?.name || 'Author'}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <span className="text-xs font-semibold text-slate-800">
                {post.author?.name || 'Softrate Contributor'}
              </span>
            </div>

            <Link
              to={`/blog/${post.slug}`}
              className="text-xs font-bold text-zoho-red hover:text-zoho-redHover transition-colors"
            >
              Read Article &rarr;
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Grid layout (Default)
  return (
    <article className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <Link to={`/blog/${post.slug}`}>
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
        {primaryCategory && (
          <div className="absolute top-3 left-3">
            <Badge to={`/category/${primaryCategory.slug}`} variant="red">
              {primaryCategory.name}
            </Badge>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-2">
            <span>{formattedDate}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime || '5 min read'}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-zoho-red transition-colors mb-2 line-clamp-2 leading-snug">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-2">
            <img
              src={post.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={post.author?.name || 'Author'}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <span className="text-xs font-semibold text-slate-700">
              {post.author?.name || 'Softrate Contributor'}
            </span>
          </div>

          {post.viewsCount > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
              <Eye className="w-3 h-3" />
              {post.viewsCount}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default PostCard;
