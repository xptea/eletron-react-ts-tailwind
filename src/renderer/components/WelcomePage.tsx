import React from 'react';

const WelcomePage: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-white text-gray-800 overflow-auto">
      <div className="max-w-3xl px-8 py-12 text-center">
        <h1 className="text-5xl font-bold mb-8">Welcome to Arc</h1>
        
        <div className="text-lg mb-8">
          <p className="mb-4">
            Arc is reimagining the way you use the internet. A browser that doesn't feel like a browser.
          </p>
          
          <p className="mb-4">
            All your tabs, bookmarks, and workflows live in the sidebar.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="p-6 rounded-lg bg-gray-50 hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Better organization</h3>
            <p className="text-gray-600">Keep your work organized with spaces and tab groups</p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-50 hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Faster browsing</h3>
            <p className="text-gray-600">Command bar, split view, and smart gestures</p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-50 hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Built-in tools</h3>
            <p className="text-gray-600">Native note taking, picture-in-picture, and more</p>
          </div>
        </div>
        
        <p className="text-lg mb-8">
          Enter a URL in the address bar or try one of these popular sites:
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://google.com" className="px-5 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition">Google</a>
          <a href="https://youtube.com" className="px-5 py-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition">YouTube</a>
          <a href="https://github.com" className="px-5 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition">GitHub</a>
          <a href="https://twitter.com" className="px-5 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition">Twitter</a>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
