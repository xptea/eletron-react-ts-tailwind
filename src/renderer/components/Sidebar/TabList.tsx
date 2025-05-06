import React from 'react';
import TabItem from './TabItem';

const TabList: React.FC<any> = ({
  isCollapsed = false,
}) => {
  const textColor = 'rgb(255, 132, 138)';
  
  return (
    <div className={`flex-1 overflow-y-auto py-2 space-y-1 tabs-container ${isCollapsed ? 'px-2' : 'px-3'}`}>
      <button
        className={`w-full h-8 mb-2 flex items-center justify-center rounded-xl transition-colors duration-150
          hover:bg-black/20 ${isCollapsed ? 'px-0' : 'px-3'}`}
        style={{ color: textColor }}
        aria-label="Create new tab"
        title="New Tab"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${!isCollapsed ? 'mr-2' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        {!isCollapsed && <span className="text-sm font-medium">New Tab</span>}
      </button>
      <TabItem
        tab={{
          id: '1',
          title: 'New Tab',
          url: '',
          color: '#7747DC',
          active: true,
          isLoading: false,
          canGoBack: false,
          canGoForward: false,
        }}
        isActive={true}
        isCollapsed={isCollapsed}
        isLightTheme={false}
        onClick={() => {}}
        onRemove={() => {}}
      />
    </div>
  );
};

export default TabList;
