import React, { useState } from 'react';
import { api } from '../services/axiosconfig';

const ProfileModal = ({ user, onClose, onLogout, onRefreshUser }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center">Loading...</div>
    </div>
  );

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('profile', file);

    try {
      setLoading(true);
      const response = await api.post('/user/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (response.data) {
        await onRefreshUser(); // Refetch user data in Header
        setFile(null);
        setPreview(null);
      }
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl relative border border-gray-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl cursor-pointer">&times;</button>

        <div className="flex flex-col items-center">
          {/* UPDATED: Clickable Avatar for Upload */}
          <div className="relative group cursor-pointer">
            <label htmlFor="avatar-input" className="cursor-pointer">
              <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-lg overflow-hidden border-2 border-white">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) :
                  /* Priority 2: Show the Cloudinary URL from the user data */
                  user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    /* Priority 3: Fallback to First Letter if no image exists */
                    user.name?.charAt(0).toUpperCase()
                  )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-[10px] text-white font-bold">CHANGE</span>
                </div>
              </div>
            </label>
            <input id="avatar-input" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 mb-6">{user.email}</p>

          {/* UPDATED: Save Button appeared after file choice */}
          {file && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="mb-4 w-full py-2 bg-[#8BB004] text-white font-bold rounded-lg hover:bg-[#7aa003] transition-all disabled:bg-gray-400"
            >
              {loading ? 'Uploading...' : 'Save New Photo'}
            </button>
          )}

          <div className="w-full space-y-3 pt-4 border-t border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Phone:</span>
              <span className="text-gray-800 font-medium">{user.phone || "Not set"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Total Blogs:</span>
              <span className="text-gray-800 font-medium">{user.blogs?.length || 0}</span>
            </div>
          </div>

          <button onClick={() => { onLogout(); onClose(); }} className="mt-8 w-full py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all cursor-pointer shadow-md">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
