import React, { useMemo } from 'react';
import './Sidebar.css';

const Sidebar: React.FC<any> = ({
  isCollapsed = false,
}) => {
  const sidebarColor = 'rgb(255, 132, 138)';
  const textColor = 'rgb(137,69,70)';
  const activeTabColor = 'rgb(255,245,244)';
  
  const darkerBgColor = useMemo(() => {
    const rgbaMatch = sidebarColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/);
    
    if (rgbaMatch) {
      const r = Math.max(0, parseInt(rgbaMatch[1]) * 0.94);
      const g = Math.max(0, parseInt(rgbaMatch[2]) * 0.94);
      const b = Math.max(0, parseInt(rgbaMatch[3]) * 0.94);
      
      return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    }
    
    return 'rgb(255, 132, 138)';
  }, [sidebarColor]);

  return (
    <div
      className="sidebar h-full flex flex-col transition-all duration-300 ease-in-out z-20"
      style={{
        backgroundColor: sidebarColor,
        width: isCollapsed ? '72px' : '16rem',
      }}
    >
      <div className="p-3">
        <div className="flex items-center justify-between">
          {/* <div className="flex space-x-1.5">
            <button className="w-4 h-4 rounded-full bg-[#ff605c]" aria-label="Close"></button>
            <button className="w-4 h-4 rounded-full bg-[#ffbd44]" aria-label="Minimize"></button>
            <button className="w-4 h-4 rounded-full bg-[#00ca4e]" aria-label="Maximize"></button>
          </div> */}
          <div className="flex space-x-1">
            <button className="p-1 rounded-full hover:bg-white/10" style={{ color: textColor }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="p-1 rounded-full hover:bg-white/10" style={{ color: textColor }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button className="p-1 rounded-full hover:bg-white/10" style={{ color: textColor }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="px-3 pt-0 pb-2">
        <div className="flex items-center rounded-xl px-3 py-2 " style={{ backgroundColor: darkerBgColor }}>
          <span className="text-sm font-medium" style={{ color: textColor }}>mminhome.io</span>
          <div className="ml-auto flex space-x-2">
            <button className="p-1 rounded-full hover:bg-white/10" style={{ color: textColor }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 rounded-full hover:bg-white/10" style={{ color: textColor }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="px-3 pt-1 pb-2">
        <div className="flex justify-between space-x-2 mb-4">
          <button 
            className="flex-1 rounded-xl p-4 flex items-center justify-center transition-colors hover-darker"
            style={{ backgroundColor: darkerBgColor, color: textColor }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            className="flex-1 rounded-xl p-4 flex items-center justify-center transition-colors hover-darker"
            style={{ backgroundColor: darkerBgColor, color: textColor }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </button>
          <button 
            className="flex-1 rounded-xl p-4 flex items-center justify-center transition-colors hover-darker"
            style={{ backgroundColor: darkerBgColor, color: textColor }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <button 
          className="flex items-center px-3 py-2 w-full rounded-lg transition-colors mb-2 hover:bg-white/10"
          style={{ color: textColor }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">New Tab</span>
        </button>
        
        <div className="rounded-lg flex items-center px-3 py-2 mb-1 group" style={{ backgroundColor: activeTabColor }}>
          <div className="w-6 h-6 bg-neutral-700 flex items-center justify-center rounded-sm mr-2.5 flex-shrink-0">
            <span className="text-sm font-bold text-white">M</span>
          </div>
          <span className="text-sm font-medium flex-1 truncate" style={{ color: textColor }}>MMMHome</span>
          
          <button className="opacity-0 hover:opacity-100 p-1 rounded-full text-black/60 hover:bg-black/10 hover:text-black/80 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="rounded-lg flex items-center px-3 py-2 mb-1 group hover:bg-opacity-90 transition-colors" style={{ backgroundColor: darkerBgColor }}>
          <div className="w-6 h-6 bg-blue-600 flex items-center justify-center rounded-sm mr-2.5 flex-shrink-0">
            <span className="text-sm font-bold text-white">G</span>
          </div>
          <span className="text-sm font-medium flex-1 truncate" style={{ color: textColor }}>GitHub</span>
          
          <button className="opacity-0 hover:opacity-100 p-1 rounded-full text-white/60 hover:bg-white/10 hover:text-white/80 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-auto"></div>
      
      <div className="p-3">
        <div className="rounded-lg flex justify-between items-center py-2 px-3">
          <button className="p-1 rounded-full hover:bg-white/10" style={{ color: textColor }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </button>
          <div className="flex space-x-1">
            <button className="w-2 h-2 bg-white/40 rounded-full"></button>
            <button className="w-2 h-2 bg-white/40 rounded-full"></button>
            <button className="w-2 h-2 bg-yellow-400 rounded-full"></button>
          </div>
          <button className="p-1 rounded-full hover:bg-white/10" style={{ color: textColor }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;