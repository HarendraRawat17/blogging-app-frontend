import React, { useState } from 'react';
import toast from "react-hot-toast";
import { api } from '../services/axiosconfig';
import { apiHandler } from '../utils/apiHandler';
import coverImg from '../assets/cover.png'; 


function SignUp({ onClose, onSuccess, onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });



  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await apiHandler(() => api.post("user/register", form));

    if (result.success) {
      toast.success(result.data.message || "OTP sent! Please check your email.");
      onSuccess(form);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white lg:bg-gray-100">
      {/* Main Container - Full Viewport on Mobile, Large Card on Desktop */}
      <div className="relative flex h-full w-full overflow-hidden bg-white shadow-2xl lg:h-[90vh] lg:w-[95vw] lg:rounded-3xl">
        
        {/* Left Side: Visual/Branding (Hidden on small screens) */}
        <div className="relative hidden w-[70%] lg:block">
          <img 
            src={coverImg} 
            loading='lazy'
            alt="Blogging workspace" 
            className="h-full w-full object-cover"
          />
          {/* Overlay for branding */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-12">
            <h1 className="text-4xl font-bold text-white mb-4">Share your story with the world.</h1>
            <p className="text-gray-200 text-lg">Join our community of writers and thinkers today.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16">
          {/* Close button for full-screen feel */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-8 text-gray-400 hover:text-red-600 transition-colors"
          >
            <span className="text-3xl cursor-pointer">&times;</span>
          </button>

          <div className="mx-auto w-full max-w-md">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
              <p className="mt-2 text-sm text-gray-600">Start your journey as a creator.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
                { label: 'Email Address', name: 'email', type: 'email', placeholder: 'john@example.com' },
                { label: 'Password', name: 'password', type: 'password', placeholder: 'create strong password' },
                { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: 'Enter you contact no.' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
              ))}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg cursor-pointer shadow-blue-500/30 hover:bg-blue-700 hover:shadow-none transition-all active:scale-[0.98]"
                >
                  Create Account
                </button>
              </div>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button type="button" className="font-bold text-blue-600 cursor-pointer hover:underline"
                onClick={onLogin}
                >Log in</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
