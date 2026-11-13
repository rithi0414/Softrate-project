import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock,
  FileEdit,
  AlertTriangle
} from 'lucide-react';
import { postService } from '../../api/postService';
import { categoryService } from '../../api/categoryService';
import AdminLayout from '../../components/admin/AdminLayout';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PostManagementPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, postId: null, postTitle: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch categories
  useEffect(() => {
    categoryService.getCategories().then((res) => {
      if (res.success) setCategories(res.data);
    });
  }, []);

  // Fetch posts
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 10,
        status: statusFilter
      };
      if (categoryFilter) params.category = categoryFilter;
      if (searchQuery) params.search = searchQuery;

      const res = await postService.getPosts(params);
      if (res.success) {
        setPosts(res.data);
        setTotalPosts(res.total);
        setTotalPages(res.totalPages);
      }
    } catch (err) {
      console.error('Error fetching admin posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, statusFilter, categoryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts();
  };

  const handleDeletePost = async () => {
    if (!deleteModal.postId) return;
    setIsDeleting(true);
    try {
      await postService.deletePost(deleteModal.postId);
      setDeleteModal({ isOpen: false, postId: null, postTitle: '' });
      fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout
      title="Articles & Content Management"
      actionButton={
        <Link
          to="/admin/posts/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-zoho-red hover:bg-zoho-redHover text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Post</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold overflow-x-auto">
            {['all', 'published', 'draft', 'scheduled'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-md capitalize transition-colors whitespace-nowrap ${
                  statusFilter === status
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title or content..."
                className="pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-zoho-red w-48 sm:w-60"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            </form>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20">
              <LoadingSpinner size="md" text="Loading posts..." />
            </div>
          ) : posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-semibold">Article Title</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold">Author</th>
                    <th className="py-3.5 px-4 font-semibold">Category</th>
                    <th className="py-3.5 px-4 font-semibold">Date</th>
                    <th className="py-3.5 px-4 font-semibold">Views</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-slate-50 transition-colors">
                      {/* Title & Featured Badge */}
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/posts/edit/${post._id}`}
                            className="font-bold text-slate-900 hover:text-zoho-red line-clamp-1"
                          >
                            {post.title}
                          </Link>
                          {post.isFeatured && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 bg-red-100 text-zoho-red rounded flex-shrink-0">
                              Featured
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 block truncate mt-0.5">
                          /blog/{post.slug}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase inline-flex items-center gap-1 ${
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

                      {/* Author */}
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {post.author?.name || 'Admin'}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-slate-600">
                        {post.categories && post.categories[0]?.name
                          ? post.categories[0].name
                          : 'Unassigned'}
                      </td>

                      {/* Published Date */}
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {post.publishedDate
                          ? format(new Date(post.publishedDate), 'MMM dd, yyyy')
                          : '—'}
                      </td>

                      {/* Views */}
                      <td className="py-3.5 px-4 text-slate-600 font-semibold">
                        {post.viewsCount || 0}
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
                        {post.status === 'published' && (
                          <Link
                            to={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 text-slate-400 hover:text-zoho-red rounded hover:bg-slate-100 inline-block transition-colors"
                            title="View Public Post"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          to={`/admin/posts/edit/${post._id}`}
                          className="p-1.5 text-slate-400 hover:text-slate-900 rounded hover:bg-slate-100 inline-block transition-colors"
                          title="Edit Post"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteModal({
                              isOpen: true,
                              postId: post._id,
                              postTitle: post.title
                            })
                          }
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 inline-block transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-sm font-semibold text-slate-700 mb-1">No articles found</p>
              <p className="text-xs text-slate-400 mb-4">
                No articles matching your current filter criteria.
              </p>
              <Link
                to="/admin/posts/new"
                className="px-4 py-2 bg-zoho-red hover:bg-zoho-redHover text-white rounded-lg text-xs font-bold transition-colors inline-block"
              >
                Create First Article
              </Link>
            </div>
          )}

          {/* Pagination */}
          <div className="p-4 border-t border-slate-100">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Confirm Deletion</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Are you sure you want to permanently delete "
              <span className="font-semibold text-slate-800">{deleteModal.postTitle}</span>"?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteModal({ isOpen: false, postId: null, postTitle: '' })}
                disabled={isDeleting}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeletePost}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
              >
                {isDeleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default PostManagementPage;
