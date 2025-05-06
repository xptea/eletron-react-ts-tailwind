import React from 'react';

declare global {
  interface Window {
    electron?: {
      windowControls?: {
        minimize: () => void;
        maximize: () => void;
        close: () => void;
      };
    };
  }
}

const Header: React.FC = () => {
  const handleMinimize = () => window.electron?.windowControls?.minimize();
  const handleMaximize = () => window.electron?.windowControls?.maximize();
  const handleClose = () => window.electron?.windowControls?.close();

  return (
    <div
      className="flex items-center justify-end px-2"
      style={{
        height: 40,
        // @ts-ignore
        WebkitAppRegion: 'drag',
        background: 'rgb(255, 132, 138)',
        userSelect: 'none',
      } as React.CSSProperties}
    >
      <div
        // @ts-ignore
        style={{ WebkitAppRegion: 'no-drag', display: 'flex', gap: 4 } as React.CSSProperties}
      >
        <button
          aria-label="Minimize"
          onClick={handleMinimize}
          className="w-8 h-8 flex items-center justify-center hover:bg-neutral-700 rounded transition"
          tabIndex={-1}
        >
          <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
            <rect width="10" height="2" rx="1" fill="rgb(137,69,70)" />
          </svg>
        </button>
        <button
          aria-label="Maximize"
          onClick={handleMaximize}
          className="w-8 h-8 flex items-center justify-center hover:bg-neutral-700 rounded transition"
          tabIndex={-1}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="1" y="1" width="8" height="8" rx="1" stroke="rgb(137,69,70)" strokeWidth="1.5"/>
          </svg>
        </button>
        <button
          aria-label="Close"
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center hover:bg-red-600 rounded transition"
          tabIndex={-1}
        >
          <svg width="15" height="15" viewBox="0 0 10 10" fill="none">
            <line x1="2" y1="2" x2="8" y2="8" stroke="rgb(137,69,70)" strokeWidth="1.5"/>
            <line x1="8" y1="2" x2="2" y2="8" stroke="rgb(137,69,70)" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
