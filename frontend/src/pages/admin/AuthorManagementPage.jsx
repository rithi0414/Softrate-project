import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users, AlertCircle, CheckCircle2, X, Twitter, Linkedin, Github, Globe } from 'lucide-react';
import { authorService } from '../../api/authorService';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AuthorManagementPage = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);

  // Form Fields
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [website, setWebsite] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAuthors = async () => {
    setIsLoading(true);
    try {
      const res = await authorService.getAuthors();
      if (res.success) setAuthors(res.data);
    } catch (err) {
      console.error('Error fetching authors:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const openAddModal = () => {
    setEditingAuthor(null);
    setName('');
    setBio('');
    setAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
    setTwitter('');
    setLinkedin('');
    setGithub('');
    setWebsite('');
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (a) => {
    setEditingAuthor(a);
    setName(a.name);
    setBio(a.bio || '');
    setAvatar(a.avatar || '');
    setTwitter(a.socialLinks?.twitter || '');
    setLinkedin(a.socialLinks?.linkedin || '');
    setGithub(a.socialLinks?.github || '');
    setWebsite(a.socialLinks?.website || '');
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Author name is required');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        name: name.trim(),
        bio: bio.trim(),
        avatar: avatar.trim(),
        socialLinks: {
          twitter: twitter.trim(),
          linkedin: linkedin.trim(),
          github: github.trim(),
          website: website.trim()
        }
      };

      if (editingAuthor) {
        await authorService.updateAuthor(editingAuthor._id, payload);
        setSuccess('Author profile updated successfully');
      } else {
        await authorService.createAuthor(payload);
        setSuccess('Author profile created successfully');
      }
      setModalOpen(false);
      fetchAuthors();
    } catch (err) {
      console.error('Author error:', err);
      setError(err.response?.data?.message || 'Error saving author');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, authorName) => {
    if (!window.confirm(`Are you sure you want to delete author "${authorName}"?`)) return;
    try {
      await authorService.deleteAuthor(id);
      fetchAuthors();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting author');
    }
  };

  return (
    <AdminLayout
      title="Contributing Authors & Staff"
      actionButton={
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-zoho-red hover:bg-zoho-redHover text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Author</span>
        </button>
      }
    >
      <div className="space-y-6 max-w-5xl">
        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{success}</span>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-16">
              <LoadingSpinner size="md" text="Loading authors..." />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Author Profile</th>
                    <th className="py-3 px-4">Bio</th>
                    <th className="py-3 px-4">Articles</th>
                    <th className="py-3 px-4">Social</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {authors.map((auth) => (
                    <tr key={auth._id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={auth.avatar}
                            alt={auth.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <span className="font-bold text-slate-900">{auth.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                        {auth.bio || '—'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded-full text-[10px]">
                          {auth.postCount || 0} articles
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          {auth.socialLinks?.twitter && (
                            <Twitter className="w-3.5 h-3.5 hover:text-zoho-red" />
                          )}
                          {auth.socialLinks?.linkedin && (
                            <Linkedin className="w-3.5 h-3.5 hover:text-blue-600" />
                          )}
                          {auth.socialLinks?.github && (
                            <Github className="w-3.5 h-3.5 hover:text-slate-900" />
                          )}
                          {auth.socialLinks?.website && (
                            <Globe className="w-3.5 h-3.5 hover:text-emerald-600" />
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(auth)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-100 inline-block"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(auth._id, auth.name)}
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

      {/* Add / Edit Author Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {editingAuthor ? 'Edit Author Profile' : 'Add New Contributing Author'}
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Jane Mitchell"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Biography
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Role, domain expertise, background..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Twitter / X
                  </label>
                  <input
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="https://twitter.com/..."
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                </div>
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
                  {isSubmitting ? 'Saving...' : editingAuthor ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AuthorManagementPage;
