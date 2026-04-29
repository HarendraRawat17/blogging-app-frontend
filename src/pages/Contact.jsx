import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import img from '../assets/logo-blogWeb2.png';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message sent successfully!"); // Placeholder feedback
  };

  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
            Let's <span className="text-blue-600">Connect</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Have a project in mind or just want to chat about tech? Drop me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Column: Visuals & Info */}
          <div className="flex flex-col space-y-6">
            {/* Logo/Photo Card */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden h-48">
              <img 
                src={img} 
                alt="Blog Logo" 
                className="h-full w-auto object-contain hover:scale-105 transition-transform duration-500" 
              />
            </div>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="mailto:yt2022a3@gmail.com" className="flex items-center space-x-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
                <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Me</p>
                  <p className="text-sm font-semibold text-slate-900 truncate">yt2022a3@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center space-x-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-purple-200 transition-all group">
                <div className="bg-purple-50 p-3 rounded-xl group-hover:bg-purple-600 transition-colors">
                  <MapPin className="w-6 h-6 text-purple-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-slate-900">Noida, India</p>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="grow min-h-75 rounded-3xl overflow-hidden shadow-md border-4 border-white relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.8414233717913!2d77.35358277528678!3d28.57452417569645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce59619aa2793%3A0x23357bd5d1033527!2sNoida%20City%20Center!5e0!3m2!1sen!2sin!4v1776787672231!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Noida City Center Map"
                className="grayscale-20 contrast-[1.1] hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
            <div className="flex items-center space-x-3 mb-8">
                <div className="h-10 w-1 bg-blue-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-slate-900">Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-blue-600 transition-colors">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                  placeholder="e.g. Alex Rivera"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-blue-600 transition-colors">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                  placeholder="alex@example.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-blue-600 transition-colors">Message</label>
                <textarea
                  rows="5"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none placeholder:text-slate-400"
                  placeholder="Tell me about your project..."
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full group flex items-center justify-center space-x-3 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform active:scale-[0.98]"
              >
                <span>Send Message</span>
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
