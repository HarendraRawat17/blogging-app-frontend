import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/axiosconfig';
import { apiHandler } from '../utils/apiHandler';
import toast from 'react-hot-toast';

function BlogEditor({ mode }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const contentRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("3");

  useEffect(() => {
    const blog = location.state?.blog;
    if (mode === 'edit' && blog) {
      if (titleRef.current) titleRef.current.innerHTML = blog.title || "";
      if (descRef.current) descRef.current.innerHTML = blog.description || "";
      if (contentRef.current) contentRef.current.innerHTML = blog.content || "";
    }
  }, [location.state, mode]);

  const handleFormat = (e, command, value = null) => {
    e.preventDefault(); 
    document.execCommand(command, false, value);
  };

  const handlePublish = async () => {
    const userId = localStorage.getItem("userId");
    
    const payload = {
      // Use .innerText to strip the <font> tags for title and description
      title: titleRef.current.innerText,
      description: descRef.current.innerText, 
      content: contentRef.current.innerHTML
    };

    if (!payload.title || payload.title.trim() === "" || payload.title === "\n") {
      return toast.error("Please add a title");
    }

    setLoading(true);
    const endpoint = mode === 'create' ? `/user/post-blog/${userId}` : `/user/update-blog/${id}`;
    const method = mode === 'create' ? 'post' : 'put';

    const res = await apiHandler(() => api[method](endpoint, payload));
    
    if (res.success) {
      toast.success(mode === 'create' ? "Story Published!" : "Story Updated!");
      navigate('/dashboard');
    }
    setLoading(false);
  };


 const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this blog?")) return;

  setLoading(true);
  // Added /user prefix to fix your 404 error
  const res = await apiHandler(() => api.delete(`/user/delete-blog/${id}`));

  if (res.success) {
    toast.success("Blog deleted successfully");
    navigate('/dashboard');
  } else {
    toast.error(res.message || "Failed to delete");
  }
  setLoading(false);
};

  return (
    <div className="min-h-screen bg-white text-black pb-20 font-serif">
      
      {/* TOOLBAR */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 p-4 flex justify-center gap-6 items-center shadow-sm">
       
        <div className="flex gap-1 border-r pr-4 border-gray-200">
          <button onMouseDown={(e) => handleFormat(e, 'bold')} className="w-10 h-10 hover:bg-gray-100 rounded font-bold">B</button>
          <button onMouseDown={(e) => handleFormat(e, 'italic')} className="w-10 h-10 hover:bg-gray-100 rounded italic">i</button>
        </div>

        <select 
          value={selectedSize}
          onChange={(e) => {
            setSelectedSize(e.target.value);
            document.execCommand('fontSize', false, e.target.value);
          }}
          className="bg-gray-50 border border-gray-200 rounded px-3 py-1 text-sm outline-none"
        >
          <option value="3">Small</option>
          <option value="5">Heading</option>
          <option value="7">Extra Large</option>
        </select>

        <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
          <span className="text-[10px] uppercase font-sans font-bold text-gray-400">Text Color</span>
          <input 
            type="color" 
            onInput={(e) => document.execCommand('foreColor', false, e.target.value)}
            className="w-8 h-8 border-none bg-transparent cursor-pointer"
          />
        </div>

        <button 
          onClick={handlePublish}
          disabled={loading}
          className="ml-6 bg-[#ea4c89] text-white px-8 py-2 rounded-full font-bold hover:bg-[#f082ac] transition-all disabled:bg-gray-300"
        >
          {loading ? "Saving..." : "Publish"}
        </button>
      </div>

      {/* WRITING AREA */}
      <article className="max-w-3xl mx-auto px-6 mt-20">
        
        {/* TITLE */}
        <div
          ref={titleRef}
          contentEditable
          className="editor-content w-full text-6xl font-black outline-none mb-4"
          data-placeholder="Enter your title..."
        />

        {/* DESCRIPTION (SUBTITLE) */}
        <div
          ref={descRef}
          contentEditable
          className="editor-content w-full text-2xl text-gray-400 outline-none mb-10 italic leading-snug"
          data-placeholder="Add a short subtitle..."
        />

        <div className="w-20 h-1 bg-black mb-12" />

        {/* BODY CONTENT */}
        <div 
          ref={contentRef}
          contentEditable
          className="editor-content outline-none text-xl leading-relaxed min-h-125 text-gray-800"
          data-placeholder="Write your story..."
        />

        <div className='mt-11 flex gap-17'>
          <button className='border px-3 rounded hover:bg-emerald-400 transition cursor-pointer text-xl'
          onClick={()=> navigate("/dashboard")}
          >⇚</button>
          <button className='border py-1 px-4 font-bold transition hover:shadow-gray-700 rounded cursor-pointer hover:bg-red-500 hover:text-white'
          onClick={handleDelete}
          disabled={loading}
          >{loading ? "Deleting..": "Delete"}</button>
        </div>
      </article>

      <style>{`
        .editor-content:empty:before {
          content: attr(data-placeholder);
          color: #d1d5db;
          pointer-events: none;
          display: block;
        }
        .editor-content {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
}

export default BlogEditor;
