import React, { useMemo } from 'react';
import './Sidebar.css';
import TabList from './TabList';

const Sidebar: React.FC<any> = ({
  tabs = [],
  activeTabId = '',
  isCollapsed = false,
  onNewTab,
  onTabClick,
  onRemoveTab,
  onBack,
  onForward,
  onReload,
  url = '',
  onUrlClick,
  onCopyLink,
  onShowInfo,
  urlLoadingBar,
}) => {
  const sidebarColor = 'rgb(255, 132, 138)';
  const textColor = 'rgb(137,69,70)';
  
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
            <button className="p-1 rounded-full hover:bg-white/10" style={{ color: textColor }} onClick={onBack}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="p-1 rounded-full hover:bg-white/10" style={{ color: textColor }} onClick={onForward}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button className="p-1 rounded-full hover:bg-white/10" style={{ color: textColor }} onClick={onReload}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="px-3 pt-0 pb-2">
        <div className="flex items-center rounded-xl px-3 py-2 relative" style={{ backgroundColor: darkerBgColor }}>
          <span
            className="text-sm font-medium truncate cursor-pointer"
            style={{ color: textColor, maxWidth: isCollapsed ? 0 : 120, flex: 1 }}
            title={url}
            onClick={onUrlClick}
          >
            {url}
          </span>
          <div className="ml-auto flex space-x-2">
            {/* Copy Link */}
            <button className="p-1 rounded-full hover:bg-white/10" style={{ color: textColor }} onClick={onCopyLink} title="Copy Link">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                <rect x="7" y="7" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="4" y="4" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            {/* Info */}
            <button className="p-1 rounded-full hover:bg-white/10" style={{ color: textColor }} onClick={onShowInfo} title="Tab Info">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="9" y="8" width="2" height="5" rx="1" fill="currentColor"/>
                <rect x="9" y="5" width="2" height="2" rx="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
          {/* Animated loading bar */}
          {urlLoadingBar}
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
        

      </div>

      <TabList
        tabs={tabs}
        activeTabId={activeTabId}
        isCollapsed={isCollapsed}
        onNewTab={onNewTab}
        onTabClick={onTabClick}
        onRemoveTab={onRemoveTab}
      />

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