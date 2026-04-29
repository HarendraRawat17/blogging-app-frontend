import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiHandler } from '../utils/apiHandler';
import { api } from '../services/axiosconfig';

function BlogView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await apiHandler(() => api.get(`/user/get-blog/${id}`));
        if (res?.success) {
          setBlog(res.data.blog);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ea4c89] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) return <div className="text-center mt-20">Story not found</div>;

  return (
    <div className="min-h-screen bg-white text-black pb-20 font-serif">
      
      {/* Navigation - Added Home path */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-gray-500 hover:text-black transition-colors flex items-center gap-1">
            ⇚ Home
          </button>
          <div className="text-[10px] uppercase font-sans font-bold text-gray-400 tracking-widest">Reading Story</div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 mt-16">
        
        {/* 1. Author Metadata (Moved Above Title) */}
        <div className="flex items-center gap-3 mb-8">
           <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm border border-gray-100">
              {blog.author?.name?.charAt(0) || 'A'}
           </div>
           <div className="flex flex-col">
              <span className="font-bold text-sm leading-none">{blog.author?.name || "Anonymous"}</span>
              <span className="text-xs text-gray-400 mt-1">
                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
           </div>
        </div>

        {/* 2. Title Section */}
        <h1 className="w-full text-5xl md:text-6xl font-black mb-4 leading-[1.1]">
          {blog.title}
        </h1>
        
        {/* 3. Description Section */}
        <div className="w-full text-2xl text-gray-400 mb-10 italic leading-snug">
          {blog.description}
        </div>

        <div className="w-20 h-1 bg-black mb-12" />

        {/* 4. Main Content Section */}
        <div 
          className="editor-content text-xl leading-relaxed text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* 5. Simple Footer */}
        <footer className="mt-20 pt-10 border-t border-gray-100 text-center">
           <button 
             onClick={() => navigate('/')} 
             className="text-[#ea4c89] font-bold hover:underline"
           >
             Read more stories on Home →
           </button>
        </footer>
      </main>

      <style>{`
        .editor-content {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .editor-content font[size="3"] { font-size: 1.1rem; }
        .editor-content font[size="5"] { font-size: 1.8rem; font-weight: bold; line-height: 1.2; }
        .editor-content font[size="7"] { font-size: 2.8rem; font-weight: 900; line-height: 1.1; }
      `}</style>
    </div>
  );
}

export default BlogView;
