import React, { useRef, useEffect } from 'react';
import { Tab } from '../../types';

interface TabItemProps {
  tab: Tab;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  onRemove: (event: React.MouseEvent) => void;
}

const TabItem: React.FC<TabItemProps> = ({ tab, isActive, isCollapsed, onClick, onRemove }) => {
  const tabRef = useRef<HTMLDivElement>(null);

  // Mouse move effect for hover gradient
  useEffect(() => {
    const element = tabRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      element.style.setProperty('--mouse-x', `${x}%`);
      element.style.setProperty('--mouse-y', `${y}%`);
    };

    element.addEventListener('mousemove', handleMouseMove);
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={tabRef}
      className={`tab-item w-full py-2 px-3 rounded-md text-left flex items-center group cursor-pointer ${
        isActive 
          ? 'bg-white/20 text-white' 
          : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
      onClick={onClick}
    >
      {tab.favicon ? (
        <img src={tab.favicon} alt="" className="w-5 h-5 mr-3" />
      ) : (
        <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: tab.color }}>
          <span className="text-xs text-white">{tab.title.charAt(0)}</span>
        </div>
      )}
      {!isCollapsed && (
        <>
          <span className="truncate flex-grow">{tab.title}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(e);
            }}
            className="ml-2 w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white/20 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default TabItem;
