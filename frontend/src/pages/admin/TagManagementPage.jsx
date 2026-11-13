import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Tag, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { tagService } from '../../api/tagService';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const TagManagementPage = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchTags = async () => {
    setIsLoading(true);
    try {
      const res = await tagService.getTags();
      if (res.success) setTags(res.data);
    } catch (err) {
      console.error('Error fetching tags:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const openAddModal = () => {
    setEditingTag(null);
    setName('');
    setSlug('');
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (t) => {
    setEditingTag(t);
    setName(t.name);
    setSlug(t.slug);
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Tag name is required');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      if (editingTag) {
        await tagService.updateTag(editingTag._id, {
          name: name.trim(),
          slug: slug.trim()
        });
        setSuccess('Tag updated successfully');
      } else {
        await tagService.createTag({
          name: name.trim(),
          slug: slug.trim()
        });
        setSuccess('Tag created successfully');
      }
      setModalOpen(false);
      fetchTags();
    } catch (err) {
      console.error('Tag error:', err);
      setError(err.response?.data?.message || 'Error saving tag');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, tagName) => {
    if (!window.confirm(`Are you sure you want to delete tag "#${tagName}"?`)) return;
    try {
      await tagService.deleteTag(id);
      fetchTags();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting tag');
    }
  };

  return (
    <AdminLayout
      title="Article Tags Management"
      actionButton={
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-zoho-red hover:bg-zoho-redHover text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Tag</span>
        </button>
      }
    >
      <div className="space-y-6 max-w-4xl">
        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{success}</span>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-16">
              <LoadingSpinner size="md" text="Loading tags..." />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Tag Name</th>
                    <th className="py-3 px-4">Slug</th>
                    <th className="py-3 px-4">Linked Articles</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tags.map((tag) => (
                    <tr key={tag._id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-slate-900">#{tag.name}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">/tag/{tag.slug}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded-full text-[10px]">
                          {tag.postCount || 0} articles
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(tag)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-100 inline-block"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(tag._id, tag.name)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 inline-block"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Tag Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {editingTag ? 'Edit Tag' : 'Create New Tag'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tag Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingTag) {
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '')
                      );
                    }
                  }}
                  placeholder="e.g. Kubernetes"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="kubernetes"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-bold text-white bg-zoho-red hover:bg-zoho-redHover rounded-lg shadow-sm"
                >
                  {isSubmitting ? 'Saving...' : editingTag ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default TagManagementPage;
