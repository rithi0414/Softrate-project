import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  FileText,
  FileEdit,
  Clock,
  Eye,
  PlusCircle,
  FolderTree,
  Users,
  ExternalLink,
  Edit,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { postService } from '../../api/postService';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await postService.getDashboardStats();
        if (res.success) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout
      title="CMS Overview & Analytics"
      actionButton={
        <Link
          to="/admin/posts/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-zoho-red hover:bg-zoho-redHover text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      }
    >
      {isLoading ? (
        <div className="py-20">
          <LoadingSpinner size="lg" text="Loading CMS metrics..." />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Total Posts */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Total Posts
                </span>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{stats?.totalPosts || 0}</h3>
              <span className="text-[11px] text-slate-400 mt-1 block">Articles created</span>
            </div>

            {/* Published Posts */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Published
                </span>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-emerald-600">
                {stats?.publishedPosts || 0}
              </h3>
              <span className="text-[11px] text-slate-400 mt-1 block">Live on blog</span>
            </div>

            {/* Draft Posts */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Drafts
                </span>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <FileEdit className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-amber-600">{stats?.draftPosts || 0}</h3>
              <span className="text-[11px] text-slate-400 mt-1 block">Unpublished work</span>
            </div>

            {/* Scheduled Posts */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Scheduled
                </span>
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-purple-600">
                {stats?.scheduledPosts || 0}
              </h3>
              <span className="text-[11px] text-slate-400 mt-1 block">Upcoming release</span>
            </div>

            {/* Total Views */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Total Reads
                </span>
                <div className="p-2 bg-red-50 text-zoho-red rounded-lg">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                {stats?.totalViews?.toLocaleString() || 0}
              </h3>
              <span className="text-[11px] text-slate-400 mt-1 block">Article pageviews</span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/admin/posts/new"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-zoho-red hover:shadow-sm transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-red-50 text-zoho-red flex items-center justify-center group-hover:bg-zoho-red group-hover:text-white transition-colors">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-zoho-red">
                  Compose Article
                </h4>
                <p className="text-[11px] text-slate-500">
                  Rich editor with SEO & tags setup
                </p>
              </div>
            </Link>

            <Link
              to="/admin/categories"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-zoho-red hover:shadow-sm transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FolderTree className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                  Manage Categories
                </h4>
                <p className="text-[11px] text-slate-500">
                  {stats?.totalCategories || 0} active topic hubs
                </p>
              </div>
            </Link>

            <Link
              to="/admin/authors"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-zoho-red hover:shadow-sm transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">
                  Author Profiles
                </h4>
                <p className="text-[11px] text-slate-500">
                  {stats?.totalAuthors || 0} verified contributors
                </p>
              </div>
            </Link>
          </div>

          {/* Tables Section: Recent Articles & Top Articles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Recent Posts Table (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Recent Publications & Drafts
                </h3>
                <Link
                  to="/admin/posts"
                  className="text-xs font-semibold text-zoho-red hover:underline"
                >
                  Manage All &rarr;
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="pb-3 font-semibold">Title</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Author</th>
                      <th className="pb-3 font-semibold">Views</th>
                      <th className="pb-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats?.recentPosts?.map((post) => (
                      <tr key={post._id} className="hover:bg-slate-50">
                        <td className="py-3 pr-4 font-semibold text-slate-900 max-w-xs truncate">
                          <Link
                            to={`/admin/posts/edit/${post._id}`}
                            className="hover:text-zoho-red"
                          >
                            {post.title}
                          </Link>
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              post.status === 'published'
                                ? 'bg-emerald-50 text-emerald-700'
                                : post.status === 'scheduled'
                                ? 'bg-purple-50 text-purple-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="py-3 text-slate-600">{post.author?.name || 'Admin'}</td>
                        <td className="py-3 text-slate-500">{post.viewsCount || 0}</td>
                        <td className="py-3 text-right space-x-2">
                          <Link
                            to={`/admin/posts/edit/${post._id}`}
                            className="p-1 text-slate-400 hover:text-slate-800"
                            title="Edit Post"
                          >
                            <Edit className="w-3.5 h-3.5 inline" />
                          </Link>
                          {post.status === 'published' && (
                            <Link
                              to={`/blog/${post.slug}`}
                              target="_blank"
                              className="p-1 text-slate-400 hover:text-zoho-red"
                              title="View on site"
                            >
                              <ExternalLink className="w-3.5 h-3.5 inline" />
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Viewed Posts (4 Cols) */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="pb-3 mb-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Top Viewed Articles
                </h3>
              </div>

              <div className="space-y-4">
                {stats?.topPosts?.map((post, idx) => (
                  <div key={post._id} className="flex items-start gap-3">
                    <span className="text-lg font-black text-slate-300 w-5">0{idx + 1}</span>
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-xs font-bold text-slate-800 hover:text-zoho-red line-clamp-2"
                      >
                        {post.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
                          <Eye className="w-3 h-3 text-zoho-red" />
                          {post.viewsCount} reads
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DashboardPage;
