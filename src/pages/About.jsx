import React from 'react';

const AboutSection = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight mb-4">
            The Unfolding
          </h1>
          <p className="text-xl text-indigo-600 font-medium tracking-wide uppercase">
            Where ideas evolve.
          </p>
          <div className="mt-6 h-1 w-24 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Vision */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              The Story Behind the Stories
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to <strong>The Unfolding</strong>. This platform is a digital canvas created to explore the art of storytelling, technology, and continuous growth. Every article shared here represents a new layer of knowledge being uncovered.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you are here to read about web development, personal growth, or creative insights, this space is built to inspire curiosity and spark meaningful conversations.
            </p>
          </div>

          {/* Right Column: Tech Stack / Learning */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              Built from Scratch
            </h3>
            <p className="text-sm text-gray-500">
              This blog is the culmination of my journey mastering full-stack development, serving as a live playground for practical learning.
            </p>
            
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'REST APIs'].map((tech) => (
                <span 
                  key={tech} 
                  className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-md border border-indigo-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom CTA / Developer Note */}
        <div className="mt-16 text-center border-t border-gray-200 pt-12">
          <p className="text-gray-500 text-sm">
            Thank you for being part of this journey. Keep reading, keep learning, and watch the story unfold.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutSection;
