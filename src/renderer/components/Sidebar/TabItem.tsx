import React from 'react';

const TabItem: React.FC<any> = ({
  tab = { title: 'New Tab', color: '#7747DC' },
  isActive = false,
  isCollapsed = false,
  onClick,
  onRemove,
}) => {
  const textColor = 'rgb(137,69,70)';
  const regularTabColor = 'rgb(230, 120, 125)';
  const activeTabColor = 'rgb(255,245,244)';
  const tabStyle = {
    backgroundColor: isActive ? activeTabColor : regularTabColor,
  };
  const baseClasses = "w-full h-8 flex items-center group cursor-pointer transition-colors duration-150 rounded-xl";
  const hoverClass = !isActive ? `hover-effect` : '';

  return (
    <div
      className={`${baseClasses} ${hoverClass} ${isCollapsed ? 'px-0 justify-center' : 'px-3'} relative`}
      style={tabStyle}
      title={tab.title}
      onClick={onClick}
    >
      <div
        className={`w-4 h-4 rounded-lg flex items-center justify-center text-xs
          ${!isCollapsed ? 'mr-2.5' : ''}
          ${isActive ? '' : ''}`}
        style={{ 
          backgroundColor: isActive ? 'transparent' : tab.color + '40',
          color: textColor
        }}
      >
        {tab.title.charAt(0).toUpperCase()}
      </div>
      {!isCollapsed && (
        <>
          <span className="truncate flex-grow text-sm" style={{ color: textColor }}>{tab.title}</span>
          <button
            className="ml-2 p-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-600"
            style={{ color: textColor }}
            aria-label="Close tab"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
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
