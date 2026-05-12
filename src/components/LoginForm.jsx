import React, { useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { api } from '../services/axiosconfig';

function LoginForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('user/login', form);

      // save locally
      localStorage.setItem("userId", response.data.userId); 
      localStorage.setItem('token', response.data.token);

      // passed the same token value up to app.js
      onSuccess(response.data.token); 
      toast.success("Welcome back!");
    } catch (error) {
      toast.error("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center z-50 p-6">
      
      {/* Container with a subtle animated gradient border effect */}
      <div className="relative w-full max-w-105">
        <div className="absolute -inset-1 bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-4xl blur-lg opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-slate-900 border border-slate-800 rounded-[1.8rem] shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="pt-10 pb-6 px-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <div className="w-6 h-6 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">System Login</h2>
            <p className="text-slate-400 text-sm mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-5">
            {[
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'name@example.com' },
              { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                  {field.label}
                </label>
                <input 
                  type={field.type}
                  name={field.name}
                  required
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-slate-800 outline-none transition-all duration-300 text-slate-100 placeholder:text-slate-600"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div className="pt-4 flex flex-col space-y-3">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] active:scale-[0.97] cursor-pointer"
              >
                Continue
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-transparent hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-medium py-2.5 rounded-xl transition-all duration-200 text-sm cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </form>
          
          {/* Subtle bottom accent */}
          <div className="h-1 w-full bg-linear-to-r from-transparent via-indigo-500/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
