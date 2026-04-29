import { HomeIcon, LogIn, LogOut, PlaneIcon, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Sidebar({ onLogout }) {
  const navigate = useNavigate();

  return (
    /* 
       1. Added 'group' to the parent div.
       2. Changed base width to w-20 and hover width to w-64.
       3. Overflow-hidden ensures text doesn't wrap weirdly during animation.
    */
    <div className='w-20 hover:w-44 p-4 h-screen bg-gray-800 text-white flex flex-col gap-6 sticky top-0 shadow-2xl transition-all duration-300 ease-in-out group overflow-hidden z-40'>
      
      {/* Navigation Item: Blogs */}
      <div 
        onClick={() => navigate('/dashboard')} 
        className='cursor-pointer text-lg font-medium hover:text-yellow-500 border border-transparent hover:border-yellow-500 px-4 py-2 rounded transition-all flex items-center gap-4'
      >
        {/* You can add an icon here later for the "collapsed" state */}
        <span className="min-w-6 text-center"> <HomeIcon/> </span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Blogs</span>
      </div>

      {/* Navigation Item: Post */}
      <div 
        onClick={() => navigate('/dashboard/new-story')} 
        className='cursor-pointer text-lg font-medium hover:text-yellow-500 border border-transparent hover:border-yellow-500 px-4 py-2 rounded transition-all flex items-center gap-4'
      >
        <span className="min-w-6 text-center"> <Send/> </span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Post</span>
      </div>

      {/* Logout at bottom */}
      
        <div 
          onClick={onLogout} 
          className='cursor-pointer text-lg font-medium text-red-400 hover:text-red-300 border border-red-900/30 hover:border-red-400 px-4 py-2 rounded transition-all flex items-center gap-4'
        >
          <span className="min-w-6 text-center"> <LogOut/> </span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Logout</span>
        </div>
    </div>
  );
}

export default Sidebar;
