import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { apiHandler } from '../utils/apiHandler';
import { api } from '../services/axiosconfig';


function Dashboard({ onLogout }) {
  const [blogs, setBlogs] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      const result = await apiHandler(() => api.get(`/user/get-details/${userId}`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      })
    );
      if (result.success) {
        setUserData(result.data.userData);
        setBlogs(result.data.userData.blogs || []);
      } else {
        if (result.message == "jwt malformed") return 
      }
      
    };
    getUserDetails();
  }, []);



  const handleUpload = ()=> {

  }



  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar remains on the left */}
      <Sidebar onLogout={onLogout} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-10">
        {/* User Info Section - Minimalist */}
        <div className="mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Your Blogs :-</h1>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
            {userData?.name} • {userData?.email}
          </p>
        </div>

        <div className="space-y-12">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
               <p className="text-gray-400 font-serif italic text-lg"> Your story is waiting to be told </p>
               <button 
                onClick={() => navigate('/dashboard/new-story')}
                className="mt-4 text-green-600 font-medium hover:underline"
               >
                 Write on Medium
               </button>
            </div>
          ) : (
            blogs.map((blog) => (
              <article 
                key={blog.id || blog._id} 
                className="group flex flex-col md:flex-row justify-between px-2 py-2 gap-8 cursor-pointer"
                  onClick={() => navigate(`/dashboard/edit/${blog._id || blog.id}`, { state: { blog } })}
              >
                <div className="flex-1">
                  {/* Author Line */}
                  <div className="flex items-center gap-2 mb-2 text-sm">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                      {userData?.name?.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-700">{userData?.name}</span>
                    <span className="text-gray-400">· Jan 12</span> {/* Mock Date */}
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-xl md:text-2xl font-bold font-serif mb-2 text-blue-700 group-hover:text-gray-600 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-gray-500 font-serif leading-relaxed line-clamp-3">
                    {blog.description}
                  </p>

                  {/* Footer of card */}
                  <div className="mt-4 flex items-center justify-between text-gray-500 hover:text-red-500 text-xs">
                   
                      <span>read more</span>
                    
                  </div>
                </div>

                {/* Optional Image Placeholder (Medium Style) */}
                <div className="w-full md:w-40 h-32 bg-gray-50 rounded-sm overflow-hidden shrink-0">
                  <div className="w-full h-full border bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-300">
                   Image
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
