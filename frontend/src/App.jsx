import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public Pages
import HomePage from './pages/public/HomePage';
import BlogListingPage from './pages/public/BlogListingPage';
import BlogDetailPage from './pages/public/BlogDetailPage';
import CategoryPage from './pages/public/CategoryPage';
import TagPage from './pages/public/TagPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import PostManagementPage from './pages/admin/PostManagementPage';
import PostEditorPage from './pages/admin/PostEditorPage';
import CategoryManagementPage from './pages/admin/CategoryManagementPage';
import TagManagementPage from './pages/admin/TagManagementPage';
import AuthorManagementPage from './pages/admin/AuthorManagementPage';

// Protected Route Wrapper for Admin Area
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="w-8 h-8 border-3 border-slate-700 border-t-zoho-red rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogListingPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/tag/:slug" element={<TagPage />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin-panel" element={<Navigate to="/admin/login" replace />} />
        <Route path="/adminpanel" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/panel" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/pannel" element={<Navigate to="/admin/login" replace />} />

        {/* Protected Admin CMS Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Navigate to="/admin/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/posts"
          element={
            <ProtectedRoute>
              <PostManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/posts/new"
          element={
            <ProtectedRoute>
              <PostEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/posts/edit/:id"
          element={
            <ProtectedRoute>
              <PostEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <CategoryManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tags"
          element={
            <ProtectedRoute>
              <TagManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/authors"
          element={
            <ProtectedRoute>
              <AuthorManagementPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
