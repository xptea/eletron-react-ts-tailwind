import { MemoryRouter as Router } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import 'tailwindcss/tailwind.css';
import './App.css';
import Sidebar from './components/Sidebar';
import WelcomePage from './components/WelcomePage';
import { Tab } from './types';

const App = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: '1',
      title: 'New Tab',
      url: 'about:blank',
      color: '#7747DC',
      active: true,
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
    }
  ]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [currentUrlInput, setCurrentUrlInput] = useState('');
  const webviewRef = useRef<Electron.WebviewTag | null>(null);
  const [isWebviewReady, setIsWebviewReady] = useState(false);
  const activeTab = tabs.find(tab => tab.active);
  const activeTabId = activeTab?.id || '';
  const isNewTab = activeTab?.url === 'about:blank';

  // Update input field when active tab changes
  useEffect(() => {
    if (activeTab) {
      setCurrentUrlInput(activeTab.url === 'about:blank' ? '' : activeTab.url);
    }
  }, [activeTab]);

  // Memoize event handlers using useCallback
  const handleDidStartLoading = useCallback(() => {
    setTabs(prevTabs => prevTabs.map(tab => tab.active ? { ...tab, isLoading: true } : tab));
  }, []);

  const handleDidStopLoading = useCallback(() => {
    const wv = webviewRef.current;
    if (!wv) return;
    setTabs(prevTabs => prevTabs.map(tab => {
      if (tab.active) {
        const newTitle = wv.getTitle();
        const newUrl = wv.getURL();
        setCurrentUrlInput(currentInput => newUrl !== 'about:blank' && currentInput !== newUrl ? newUrl : currentInput);

        return {
          ...tab,
          isLoading: false,
          title: (newTitle && newTitle !== newUrl && newTitle !== 'about:blank') ? newTitle : (newUrl === 'about:blank' ? 'New Tab' : newUrl),
          url: newUrl,
          canGoBack: wv.canGoBack(),
          canGoForward: wv.canGoForward(),
        };
      }
      return tab;
    }));
  }, []);

  const handlePageTitleUpdated = useCallback((event: Electron.PageTitleUpdatedEvent) => {
    setTabs(prevTabs => prevTabs.map(tab => tab.active ? { ...tab, title: event.title } : tab));
  }, []);

  const handlePageFaviconUpdated = useCallback((event: Electron.PageFaviconUpdatedEvent) => {
    if (event.favicons && event.favicons.length > 0) {
      setTabs(prevTabs => prevTabs.map(tab => tab.active ? { ...tab, favicon: event.favicons[0] } : tab));
    }
  }, []);

  const handleDomReady = useCallback(() => {
     const wv = webviewRef.current;
     if (!wv) return;
     setTabs(prevTabs => prevTabs.map(tab => tab.active ? {
         ...tab,
         canGoBack: wv.canGoBack(),
         canGoForward: wv.canGoForward()
     } : tab));
     setIsWebviewReady(true);
  }, []);

  // Effect for webview event listeners
  useEffect(() => {
    const wv = webviewRef.current;
    if (!wv) return;

    wv.addEventListener('did-start-loading', handleDidStartLoading);
    wv.addEventListener('did-stop-loading', handleDidStopLoading);
    wv.addEventListener('page-title-updated', handlePageTitleUpdated);
    wv.addEventListener('page-favicon-updated', handlePageFaviconUpdated);
    wv.addEventListener('dom-ready', handleDomReady);

    return () => {
      wv.removeEventListener('did-start-loading', handleDidStartLoading);
      wv.removeEventListener('did-stop-loading', handleDidStopLoading);
      wv.removeEventListener('page-title-updated', handlePageTitleUpdated);
      wv.removeEventListener('page-favicon-updated', handlePageFaviconUpdated);
      wv.removeEventListener('dom-ready', handleDomReady);
      setIsWebviewReady(false);
    };
  }, [handleDidStartLoading, handleDidStopLoading, handlePageTitleUpdated, handlePageFaviconUpdated, handleDomReady]);

  // Effect to load URL when active tab changes
  useEffect(() => {
    if (isWebviewReady && webviewRef.current && activeTab) {
        const currentWebviewUrl = webviewRef.current.getURL();
        if (currentWebviewUrl !== activeTab.url) {
            webviewRef.current.loadURL(activeTab.url);
        }
    }
  }, [activeTab?.url, activeTab?.id, isWebviewReady]);

  const activateTab = (id: string) => {
    const newActiveTab = tabs.find(tab => tab.id === id);
    if (newActiveTab && newActiveTab.id !== activeTab?.id) {
        setTabs(
          tabs.map((tab) => ({
            ...tab,
            active: tab.id === id,
          }))
        );
    }
  };

  const addNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: 'New Tab',
      url: 'about:blank',
      color: getRandomColor(),
      active: true,
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
    };

    setTabs(tabs.map(tab => ({...tab, active: false})).concat(newTab));
    setCurrentUrlInput('');
  };

  const handleRemoveTab = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();

    const tabToCloseIndex = tabs.findIndex(tab => tab.id === id);
    if (tabToCloseIndex === -1) return;

    const wasActive = tabs[tabToCloseIndex].active;
    const remainingTabs = tabs.filter(tab => tab.id !== id);

    if (wasActive && remainingTabs.length > 0) {
      const nextActiveIndex = Math.min(tabToCloseIndex, remainingTabs.length - 1);
      remainingTabs[nextActiveIndex].active = true;
    } else if (remainingTabs.length === 0) {
      const newTab: Tab = {
        id: Date.now().toString(),
        title: 'New Tab',
        url: 'about:blank',
        color: getRandomColor(),
        active: true,
        isLoading: false,
        canGoBack: false,
        canGoForward: false,
      };
      setTabs([newTab]);
      setCurrentUrlInput('');
      return;
    }

    setTabs(remainingTabs);
  };

  const getRandomColor = () => {
    const colors = [
      '#7747DC', // Purple
      '#3C96E4', // Blue
      '#FF6B6B', // Red
      '#48BB78', // Green
      '#F6AD55', // Orange
      '#1d9bf0', // Twitter Blue
      '#3A3A3C', // Dark Gray
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTab || !webviewRef.current || !isWebviewReady) return;

    let url = currentUrlInput.trim();

    // Basic URL validation/fixing
    if (url && !url.includes('.') && !url.startsWith('about:') && !url.startsWith('http://localhost')) {
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else if (url && !url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('about:')) {
      url = `https://${url}`;
    } else if (!url) {
      url = 'about:blank';
    }

    setTabs(tabs.map(tab =>
      tab.active ? { ...tab, url: url, title: 'Loading...', isLoading: true } : tab
    ));

    webviewRef.current.loadURL(url);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-white">
      {/* Sidebar Component */}
      <Sidebar
        tabs={tabs}
        activeTabId={activeTabId}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        onTabActivate={activateTab}
        onTabRemove={handleRemoveTab}
        onAddTab={addNewTab}
      />

      {/* Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Hide address bar when showing the welcome page to match Arc's design */}
        {!isNewTab && (
          <div className="bg-[#2a2a2d] border-b border-[#2a2a2d] p-3">
            <form onSubmit={handleUrlSubmit} className="flex items-center space-x-2">
              <button
                type="button"
                disabled={!activeTab?.canGoBack || !isWebviewReady}
                onClick={() => webviewRef.current?.goBack()}
                className="nav-btn w-8 h-8 rounded-full bg-[#232327] text-white/70 hover:bg-[#2c2c31] hover:text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                title="Back"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                disabled={!activeTab?.canGoForward || !isWebviewReady}
                onClick={() => webviewRef.current?.goForward()}
                className="nav-btn w-8 h-8 rounded-full bg-[#232327] text-white/70 hover:bg-[#2c2c31] hover:text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                title="Forward"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                disabled={!isWebviewReady}
                onClick={() => activeTab?.isLoading ? webviewRef.current?.stop() : webviewRef.current?.reload()}
                className={`nav-btn w-8 h-8 rounded-full bg-[#232327] hover:bg-[#2c2c31] flex items-center justify-center ${
                  activeTab?.isLoading ? 'text-red-400 hover:text-red-300' : 'text-white/70 hover:text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={activeTab?.isLoading ? "Stop" : "Reload"}
              >
                {activeTab?.isLoading ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              <div className="relative flex-1">
                <input
                  className="address-bar w-full px-3 py-2 pl-10 rounded-lg bg-[#232327] text-white border border-transparent focus:border-[#3c3c42] focus:outline-none"
                  value={currentUrlInput}
                  onChange={(e) => setCurrentUrlInput(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  placeholder="Search or enter address"
                />
                {activeTab?.favicon ? (
                  <img src={activeTab.favicon} alt="" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                ) : (
                  <div
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: activeTab?.color || '#7747DC' }}
                  >
                    <span className="text-white text-[8px]">{activeTab?.title.charAt(0) || 'N'}</span>
                  </div>
                )}
                {activeTab?.isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Display welcome page for new tabs, webview for loaded pages */}
        <div className="webview-container flex-1 bg-white">
          {isNewTab ? (
            <WelcomePage />
          ) : (
            <webview
              ref={webviewRef}
              src={activeTab?.url || 'about:blank'}
              className="w-full h-full inline-flex"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
