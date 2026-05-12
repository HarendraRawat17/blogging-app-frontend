import React, { useEffect, useState } from 'react';
import { apiHandler } from '../utils/apiHandler';
import { api } from '../services/axiosconfig';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // 1. Added loading state
  const navigate = useNavigate();

  const getBlogs = async () => {
    setLoading(true); 
    const res = await apiHandler(() => api.get(`/user/all-blogs`));
    if (res?.success) {
      setBlogs(res.data.data);
    }
    setLoading(false); // 2. Stop loading
  };

  useEffect(() => {
    getBlogs();
  }, []);

  // 3. Creative Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col animate-pulse">
      <div className="h-8 bg-slate-700 rounded-lg w-3/4 mb-4"></div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
      </div>
      <div className="flex items-center justify-between border-t border-slate-700 pt-4 mt-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-slate-700"></div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-700 rounded w-20"></div>
            <div className="h-2 bg-slate-700 rounded w-12"></div>
          </div>
        </div>
        <div className="h-4 bg-slate-700 rounded w-16"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* 4. Conditional Rendering */}
        {loading ? (
          // Show 6 skeleton cards while loading
          Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col transition-transform hover:scale-[1.02] hover:border-indigo-500/50">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                  {blog.title}
                </h2>
                <p className="text-slate-400 line-clamp-3">
                  {blog.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-700 pt-4 mt-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs uppercase shadow-[0_0_10px_rgba(99,102,241,0.4)]">
                    {blog.author?.name?.charAt(0) || 'U'}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-200 capitalize">
                      {blog.author?.name || "Unknown Author"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <button 
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold cursor-pointer transition-colors"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  Read More →
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-slate-500 text-xl">No blogs found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
