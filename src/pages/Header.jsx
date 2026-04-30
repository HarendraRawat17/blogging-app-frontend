import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo-blogWeb2.png';
import ProfileModal from '../components/ProfileModal';
import { api } from '../services/axiosconfig';
import { apiHandler } from '../utils/apiHandler';

function Header({ onAddClick, onLogin, isLoggedIn, onLogout }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // UPDATED: Function moved outside useEffect to be reusable
  const fetchUser = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    if (isLoggedIn && userId) {
      const result = await apiHandler(() => api.get(`/user/get-details/${userId}`));
      if (result.success) {
        setUserData(result.data.userData);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const navLinkClass = ({ isActive }) =>
    `relative py-1 transition-all duration-300 hover:text-[#8BB004] tracking-tight font-medium ${isActive
      ? 'text-[#8BB004] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8BB004]'
      : 'text-gray-500'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `w-full text-left px-6 py-4 border-b border-gray-100 text-lg font-medium transition-colors ${isActive ? 'text-[#8BB004] bg-[#8BB004]/5' : 'text-gray-600'
    }`;

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-12 py-2 bg-[#F2EFE7] border-b border-gray-200/60 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 w-12 md:h-15 md:w-15 object-contain" />
            <span className="text-xl font-bold tracking-tight text-[#2D2D2D]">
              The <span className="text-[#8BB004]">Unfolding</span>
            </span>
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-12 text-[15px]">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          {isLoggedIn && <NavLink to="/dashboard" className={navLinkClass}> Dashboard </NavLink>}
        </div>

        <div className="hidden md:flex items-center gap-6">
          {!isLoggedIn ? (
            <>
              <button onClick={onLogin} className="text-[#2D2D2D] font-semibold hover:text-[#8BB004] cursor-pointer">Log In</button>
              <button onClick={onAddClick} className="px-4 py-2.5 text-sm font-bold text-white bg-[#8BB004] rounded-full hover:bg-[#7aa003] shadow-md cursor-pointer transition-all hover:scale-105">
                Get Started
              </button>
            </>
          ) : (
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 cursor-pointer rounded-full shadow-sm hover:border-[#8BB004]/50 transition-all">
              <div className="w-8 h-8 rounded-full bg-[#8BB004]/10 flex items-center justify-center text-[#8BB004] font-bold text-xs overflow-hidden">
                {/* UPDATED: Show Profile Pic if it exists */}
                {userData?.profilePic ? (
                  <img src={userData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  userData?.name?.charAt(0) || 'U'
                )}
              </div>
              <span className="text-sm font-bold text-gray-700 pr-1">Account</span>
            </button>
          )}
        </div>

        <button className="md:hidden p-2 text-gray-600 focus:outline-none" onClick={() => setIsMenuOpen(true)}>
          <svg xmlns="http://w3.org" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer remains the same... */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-60 md:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-70 bg-white shadow-2xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <span className="font-bold text-gray-800 uppercase tracking-widest text-xs">Navigation</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-3xl text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div className="flex flex-col">
              <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={mobileLinkClass}>Home</NavLink>
              <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={mobileLinkClass}>About</NavLink>
              <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={mobileLinkClass}>Contact</NavLink>
              {isLoggedIn && <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)} className={mobileLinkClass}> Dashboard </NavLink>}

              <button onClick={onLogin} className="mb-2 text-left ml-6 text-gray-500 font-semi-bold text-lg w-25 cursor-pointer">Log In</button>
              <button onClick={onAddClick} className="px-2 py-2 text-sm font-bold text-white bg-[#8BB004] rounded-full hover:bg-[#7aa003] shadow-md cursor-pointer transition-all hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPDATED: Added onRefreshUser prop */}
      {isModalOpen && (
        <ProfileModal
          user={userData}
          onClose={() => setIsModalOpen(false)}
          onLogout={onLogout}
          onRefreshUser={fetchUser}
        />
      )}
    </>
  );
}

export default Header;
