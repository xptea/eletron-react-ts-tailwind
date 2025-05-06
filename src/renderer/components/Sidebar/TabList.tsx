import React from 'react';
import { Tab } from '../../types';
import TabItem from './TabItem';

interface TabListProps {
  tabs: Tab[];
  activeTabId: string;
  isCollapsed: boolean;
  onTabActivate: (id: string) => void;
  onTabRemove: (id: string, event: React.MouseEvent) => void;
  onAddTab: () => void;
}

const TabList: React.FC<TabListProps> = ({
  tabs,
  activeTabId,
  isCollapsed,
  onTabActivate,
  onTabRemove,
  onAddTab,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-3 py-2">
      {/* New Tab Button */}
      <button
        onClick={onAddTab}
        className="w-full py-2 px-4 mb-4 bg-white/10 hover:bg-white/20 rounded-md text-left flex items-center text-white/80 transition-colors add-tab-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        {!isCollapsed && "New Tab"}
      </button>
      
      {/* Tab list */}
      <div className="space-y-2">
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeTabId}
            isCollapsed={isCollapsed}
            onClick={() => onTabActivate(tab.id)}
            onRemove={(e) => onTabRemove(tab.id, e)}
          />
        ))}
      </div>
    </div>
  );
};

export default TabList;
