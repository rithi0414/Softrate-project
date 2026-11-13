import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Save,
  ArrowLeft,
  Calendar,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { postService } from '../../api/postService';
import { categoryService } from '../../api/categoryService';
import { tagService } from '../../api/tagService';
import { authorService } from '../../api/authorService';
import AdminLayout from '../../components/admin/AdminLayout';
import RichTextEditor from '../../components/admin/RichTextEditor';
import ImageUploader from '../../components/admin/ImageUploader';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PostEditorPage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [status, setStatus] = useState('published');
  const [scheduledFor, setScheduledFor] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Options State
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [authors, setAuthors] = useState([]);

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Auto-slugify helper
  const slugify = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing || !slug) {
      setSlug(slugify(val));
    }
    if (!seoTitle) {
      setSeoTitle(val);
    }
  };

  // Fetch initial data (options and post if editing)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [catsRes, tagsRes, authorsRes] = await Promise.all([
          categoryService.getCategories(),
          tagService.getTags(),
          authorService.getAuthors()
        ]);

        if (catsRes.success) setCategories(catsRes.data);
        if (tagsRes.success) setTags(tagsRes.data);
        if (authorsRes.success) {
          setAuthors(authorsRes.data);
          if (authorsRes.data.length > 0 && !author) {
            setAuthor(authorsRes.data[0]._id);
          }
        }

        // If editing existing post
        if (isEditing) {
          // Fetch existing post details
          const postRes = await postService.getPosts({ status: 'all' });
          const existing = postRes.data.find((p) => p._id === id);
          if (existing) {
            setTitle(existing.title || '');
            setSlug(existing.slug || '');
            setContent(existing.content || '');
            setSummary(existing.summary || '');
            setFeaturedImage(existing.featuredImage || '');
            setAuthor(existing.author?._id || existing.author || '');
            setSelectedCategories(existing.categories?.map((c) => c._id || c) || []);
            setSelectedTags(existing.tags?.map((t) => t._id || t) || []);
            setStatus(existing.status || 'published');
            if (existing.scheduledFor) {
              setScheduledFor(new Date(existing.scheduledFor).toISOString().slice(0, 16));
            }
            setIsFeatured(Boolean(existing.isFeatured));
            setSeoTitle(existing.seoTitle || '');
            setMetaDescription(existing.metaDescription || '');
          }
        }
      } catch (err) {
        console.error('Error fetching editor data:', err);
        setError('Failed to load initial form data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, isEditing]);

  const toggleCategory = (catId) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };

  const toggleTag = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Article title and content are required');
      return;
    }

    if (selectedCategories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    if (!author) {
      setError('Please assign an author');
      return;
    }

    if (status === 'scheduled' && !scheduledFor) {
      setError('Please specify a scheduled publication date and time');
      return;
    }

    setError('');
    setSuccessMsg('');
    setIsSaving(true);

    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim() || slugify(title),
        content,
        summary: summary.trim(),
        featuredImage: featuredImage.trim(),
        author,
        categories: selectedCategories,
        tags: selectedTags,
        status,
        scheduledFor: status === 'scheduled' ? new Date(scheduledFor) : null,
        isFeatured,
        seoTitle: seoTitle.trim(),
        metaDescription: metaDescription.trim()
      };

      if (isEditing) {
        await postService.updatePost(id, payload);
        setSuccessMsg('Article updated successfully!');
      } else {
        const res = await postService.createPost(payload);
        setSuccessMsg('Article published successfully!');
        setTimeout(() => {
          navigate('/admin/posts');
        }, 1200);
      }
    } catch (err) {
      console.error('Save post error:', err);
      setError(err.response?.data?.message || 'Error saving post');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title={isEditing ? 'Edit Publication' : 'Compose New Article'}
      actionButton={
        <Link
          to="/admin/posts"
          className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-300 hover:border-slate-400 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Articles</span>
        </Link>
      }
    >
      {isLoading ? (
        <div className="py-20">
          <LoadingSpinner size="lg" text="Loading article editor..." />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Column (8 Cols): Title, Slug, Summary, Content, SEO */}
            <div className="lg:col-span-8 space-y-6">
              {/* Title & Slug Box */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Building Resilient Microservices with Event-Driven Architecture..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-base font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-zoho-red focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    URL Slug (SEO-friendly)
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-xs text-slate-500 font-mono">
                      /blog/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(slugify(e.target.value))}
                      placeholder="post-url-slug"
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-r-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Summary / Short Description *
                  </label>
                  <textarea
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief 2-3 sentence overview shown on blog cards and search results..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-zoho-red leading-relaxed"
                  />
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Article Body Content *
                </label>
                <RichTextEditor value={content} onChange={setContent} />
              </div>

              {/* SEO Metadata Box */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Search className="w-4 h-4 text-zoho-red" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    SEO & Meta Controls
                  </h3>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      SEO Title
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {seoTitle.length}/70 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Custom page title for search engines..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Meta Description
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {metaDescription.length}/160 chars
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Search engine snippet describing this article..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
                  />
                </div>

                {/* Google Search Snippet Preview */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Google Search Preview
                  </span>
                  <p className="text-sm font-semibold text-blue-700 line-clamp-1 hover:underline cursor-pointer">
                    {seoTitle || title || 'Article Title'} | Softrate Tech
                  </p>
                  <p className="text-[11px] text-emerald-700 font-mono truncate">
                    https://softrate.io/blog/{slug || 'post-slug'}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {metaDescription || summary || 'Article summary description snippet...'}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar (4 Cols): Status, Categories, Tags, Author, Image */}
            <div className="lg:col-span-4 space-y-6">
              {/* Publishing Controls */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                  Publishing Settings
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
                  >
                    <option value="published">Published (Visible Immediately)</option>
                    <option value="draft">Draft (Private in CMS)</option>
                    <option value="scheduled">Scheduled (Future Date)</option>
                  </select>
                </div>

                {/* Scheduled DateTime picker */}
                {status === 'scheduled' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Scheduled Date & Time *
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={scheduledFor}
                        onChange={(e) => setScheduledFor(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
                      />
                    </div>
                  </div>
                )}

                {/* Featured Toggle */}
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-zoho-red focus:ring-zoho-red border-slate-300"
                    />
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-zoho-red" />
                      Highlight on Homepage (Featured Story)
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-2.5 px-4 bg-zoho-red hover:bg-zoho-redHover text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Post...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{isEditing ? 'Save Changes' : 'Publish Article'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Author Assignment */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Author *
                </h3>
                <select
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-zoho-red"
                >
                  <option value="">Select Author...</option>
                  {authors.map((auth) => (
                    <option key={auth._id} value={auth._id}>
                      {auth.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Image Uploader */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <ImageUploader
                  value={featuredImage}
                  onChange={setFeaturedImage}
                  label="Featured Image"
                />
              </div>

              {/* Categories Selector */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Categories * (Select at least 1)
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {categories.map((cat) => {
                    const checked = selectedCategories.includes(cat._id);
                    return (
                      <label
                        key={cat._id}
                        className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCategory(cat._id)}
                          className="w-3.5 h-3.5 text-zoho-red rounded border-slate-300 focus:ring-zoho-red"
                        />
                        <span>{cat.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Tags Selector */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Article Tags
                </h3>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                  {tags.map((tag) => {
                    const isSelected = selectedTags.includes(tag._id);
                    return (
                      <button
                        key={tag._id}
                        type="button"
                        onClick={() => toggleTag(tag._id)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                          isSelected
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
            </div>
          </div>
        </form>
      )}
    </AdminLayout>
  );
};

export default PostEditorPage;
