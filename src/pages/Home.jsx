import React, { useEffect, useState } from 'react';
import { apiHandler } from '../utils/apiHandler';
import { api } from '../services/axiosconfig';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const getBlogs = async () => {
    const res = await apiHandler(() => api.get(`/user/all-blogs`));
    if (res?.success) {
      setBlogs(res.data.data);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col transition-transform hover:scale-[1.02]">
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
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs uppercase">
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
                className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold cursor-pointer"
                onClick={() => navigate(`/blog/${blog._id}`)} // FIXED: Removed extra space
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
