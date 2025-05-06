import React from 'react';
import { Tab } from '../../types';
import TabList from './TabList';
import './Sidebar.css';

interface SidebarProps {
  tabs: Tab[];
  activeTabId: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onTabActivate: (id: string) => void;
  onTabRemove: (id: string, event: React.MouseEvent) => void;
  onAddTab: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  tabs,
  activeTabId,
  isCollapsed,
  onToggleCollapse,
  onTabActivate,
  onTabRemove,
  onAddTab,
}) => {
  return (
    <div
      className={`sidebar h-full bg-[#121214] flex flex-col transition-all duration-200 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Clean minimalist header */}
      <div className="p-4 flex items-center justify-between">
        <div className="text-white/80 font-medium">Arc</div>
        <button 
          onClick={onToggleCollapse}
          className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Address Bar */}
      <div className="px-3 py-2">
        <div className="flex items-center bg-white/10 rounded-md px-3 py-1.5">
          <div className="text-white/70 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-white/70 text-sm truncate">arc.net/welcome-to-arc</div>
        </div>
      </div>

      {/* Tab List Section */}
      <TabList
        tabs={tabs}
        activeTabId={activeTabId}
        isCollapsed={isCollapsed}
        onTabActivate={onTabActivate}
        onTabRemove={onTabRemove}
        onAddTab={onAddTab}
      />

      {/* Bottom utility buttons */}
      <div className="mt-auto p-3">
        <div className="flex justify-center">
          <button className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
