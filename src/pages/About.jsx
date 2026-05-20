import React from 'react';
import { BookOpen, Award, Users, Heart, ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: <BookOpen className="w-5 h-5 text-indigo-600" />, count: "150+", label: "Articles Published" },
    { icon: <Users className="w-5 h-5 text-indigo-600" />, count: "50K+", label: "Monthly Readers" },
    { icon: <Award className="w-5 h-5 text-indigo-600" />, count: "5+", label: "Years Blogging" },
    { icon: <Heart className="w-5 h-5 text-indigo-600" />, count: "10K+", label: "Subscribers" },
  ];

  const topics = ["Web Development", "UI/UX Design", "Tech Trends", "Career Growth", "Remote Work"];

  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About The Blog</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Behind the Pixels & Paragraphs
          </p>
          <div className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto border-b-2 border-indigo-100 pb-4">
            A space dedicated to sharing tech insights, tutorials, and developer stories.
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Author Image & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r content-[''] from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-md">
                <img 
                  className="w-full h-80 object-cover" 
                  src="https://unsplash.com" 
                  alt="Blog Author" 
                />
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-slate-900">Alex Morgan</h3>
                  <p className="text-indigo-600 font-medium text-sm mb-4">Founder & Lead Writer</p>
                  
                  {/* Social Links */}
                  <div className="flex space-x-4 border-t border-slate-100 pt-4">
                    <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission and Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-indigo text-slate-600 max-w-none">
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Why I Started This Blog</h4>
              <p className="text-lg leading-relaxed mb-4">
                Hey there! Welcome to my digital living room. I started this platform as a way to document my coding journey and break down complex technical frameworks into simple, bite-sized tutorials. 
              </p>
              <p className="text-lg leading-relaxed">
                Whether you are a seasoned software engineer looking to optimize your stack, or a complete beginner writing your very first line of HTML, you will find practical tips, deep dives, and honest perspectives right here.
              </p>
            </div>

            {/* Core Topics Tags */}
            <div>
              <h5 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">What we cover:</h5>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-3">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900">{stat.count}</div>
                    <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call To Action */}
            <div className="pt-2">
              <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-200 group">
                Subscribe to Newsletter
                <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;























// import React, { useState } from 'react';
// import axios from 'axios';

// const About = () => {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);

//     // Create a local preview URL
//     if (selectedFile) {
//       setPreview(URL.createObjectURL(selectedFile));
//     }
//   };

//   // Handle upload logic
//   const handleUpload = async (e) => {
//   e.preventDefault();
//   if (!file) return alert("Please select a file!");

//   const formData = new FormData();
//   formData.append('profile', file);

//   try {
//     setLoading(true);
//     // Note the added "/api/user" prefix and port 3001
//     const response = await axios.post('http://localhost:3001/api/user/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//       withCredentials: true // Important since you use cookie-parser/cors credentials
//     });

//     console.log("Success:", response.data);
//     setMessage("Uploaded! URL: " + response.data.imageUrl);
//   } catch (err) {
//     console.error("Upload Error:", err.response?.data || err.message);
//     setMessage("Upload failed: " + (err.response?.data?.message || "Server Error"));
//   } finally {
//     setLoading(false);
//     setFile("")
//   }
// };

//   return (
//     <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
//       <h3>Upload Profile Picture</h3>
      
//       <form onSubmit={handleUpload}>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
        
//         {preview && (
//           <div style={{ marginTop: '10px' }}>
//             <img src={preview} alt="Preview" style={{ width: '150px', borderRadius: '50%' }} />
//           </div>
//         )}

//         <button
//         className='border px-2 rounded cursor-pointer'
//          type="submit" disabled={loading} style={{ marginTop: '10px', display: 'block' }}>
//           {loading ? 'Uploading...' : 'Upload to Cloudinary'}
//         </button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default About;
