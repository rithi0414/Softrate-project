import React from 'react';
import { Sparkles } from 'lucide-react';
import PostCard from '../common/PostCard';

const RelatedPosts = ({ posts = [] }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-slate-200">
      <div className="flex items-center gap-2 mb-8">
        <div className="p-1.5 bg-red-100 text-zoho-red rounded-lg">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Related Engineering Deep Dives
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} layout="grid" />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
