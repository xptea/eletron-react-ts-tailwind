import 'tailwindcss/tailwind.css';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useState } from 'react';

const OVERFLOW_PX = 16;

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-neutral-900 text-white font-sans antialiased">
      <Sidebar
        tabs={[]}
        activeTabId=""
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />
      <div className="flex flex-col flex-1 h-full overflow-hidden relative" style={{ background: 'rgb(255, 132, 138)' }}>
        <Header />
        <div
          className="flex-1 flex items-stretch"
          style={{
            paddingTop: 0,
            paddingBottom: OVERFLOW_PX,
            paddingLeft: 0,
            paddingRight: OVERFLOW_PX,
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
          }}
        >
          <div className="webview-container bg-white relative z-20 rounded-lg overflow-hidden flex-1 h-full w-full">
            <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">
              Webview Area
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
