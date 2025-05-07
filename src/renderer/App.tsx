import 'tailwindcss/tailwind.css';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useState, useRef, useCallback } from 'react';
import { Tab } from './types';

const OVERFLOW_PX = 16;

const DEFAULT_TAB: Tab = {
  id: '1',
  title: 'New Tab',
  url: '',
  color: '#7747DC',
  active: true,
  isLoading: false,
  canGoBack: false,
  canGoForward: false,
};

function formatSidebarUrl(url: string) {
  if (!url) return '';
  try {
    const u = new URL(url);
    let host = u.host.replace(/^www\./, '');
    let path = u.pathname === '/' ? '' : u.pathname;
    let display = host + path + (u.search || '');
    return display;
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '');
  }
}

function smartUrl(input: string): string {
  const trimmed = input.trim();
  try {
    new URL(trimmed);
    return trimmed;
  } catch {}
  if (/^[\w-]+\.[\w.-]+(\/.*)?$/.test(trimmed) && !/\s/.test(trimmed)) {
    return 'https://' + trimmed;
  }
  const q = encodeURIComponent(trimmed);
  // Use DuckDuckGo instead of Google to avoid Electron webview block
  return `https://duckduckgo.com/?q=${q}`;
}

const App = () => {
  const [tabs, setTabs] = useState<Tab[]>([DEFAULT_TAB]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUrlModal, setShowUrlModal] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const webviewRef = useRef<any>(null);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const openUrlModal = () => {
    setUrlInput(activeTab?.url || '');
    setShowUrlModal(true);
  };

  const handleCopyLink = () => {
    if (activeTab?.url) {
      navigator.clipboard.writeText(activeTab.url);
    }
  };

  const handleNewTab = useCallback(() => {
    const newId = Date.now().toString();
    const newTab: Tab = {
      ...DEFAULT_TAB,
      id: newId,
      url: '',
      active: false,
    };
    setTabs((prev) =>
      prev.map((t) => ({ ...t, active: false })).concat({ ...newTab, active: true })
    );
    setActiveTabId(newId);
    setUrlInput('');
    setShowUrlModal(true);
  }, []);

  const handleTabClick = useCallback((id: string) => {
    setTabs((prev) =>
      prev.map((t) => ({ ...t, active: t.id === id }))
    );
    setActiveTabId(id);
  }, []);

  const handleRemoveTab = useCallback((id: string) => {
    setTabs((prev) => {
      const idx = prev.findIndex((t) => t.id === id);
      if (prev.length === 1) return prev;
      const newTabs = prev.filter((t) => t.id !== id);
      if (id === activeTabId) {
        const nextIdx = idx === 0 ? 0 : idx - 1;
        setActiveTabId(newTabs[nextIdx].id);
        newTabs[nextIdx].active = true;
      }
      return newTabs.map((t) => ({ ...t, active: t.id === (id === activeTabId ? newTabs[idx === 0 ? 0 : idx - 1].id : activeTabId) }));
    });
  }, [activeTabId]);

  const handleBack = () => {
    if (webviewRef.current) webviewRef.current.goBack();
  };
  const handleForward = () => {
    if (webviewRef.current) webviewRef.current.goForward();
  };
  const handleReload = () => {
    if (webviewRef.current) webviewRef.current.reload();
  };

  const handleWebviewDidNavigate = (event: any) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId
          ? {
              ...tab,
              url: event.target.getURL(),
              canGoBack: event.target.canGoBack(),
              canGoForward: event.target.canGoForward(),
            }
          : tab
      )
    );
  };

  const handleWebviewPageTitleUpdated = (event: any) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId
          ? { ...tab, title: event.title }
          : tab
      )
    );
  };

  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const attachWebviewListeners = (webview: any) => {
    if (!webview) return;
    webview.removeEventListener('did-navigate', handleWebviewDidNavigate);
    webview.removeEventListener('did-navigate-in-page', handleWebviewDidNavigate);
    webview.removeEventListener('page-title-updated', handleWebviewPageTitleUpdated);
    webview.removeEventListener('did-start-loading', handleDidStartLoading);
    webview.removeEventListener('did-stop-loading', handleDidStopLoading);
    webview.addEventListener('did-navigate', handleWebviewDidNavigate);
    webview.addEventListener('did-navigate-in-page', handleWebviewDidNavigate);
    webview.addEventListener('page-title-updated', handleWebviewPageTitleUpdated);
    webview.addEventListener('did-start-loading', handleDidStartLoading);
    webview.addEventListener('did-stop-loading', handleDidStopLoading);
  };

  function handleDidStartLoading() {
    setIsLoading(true);
    setProgress(0);
    progressRef.current = 0;
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      progressRef.current += Math.random() * 3 + 1.5;
      if (progressRef.current > 90) progressRef.current = 90;
      setProgress(progressRef.current);
    }, 60);
  }
  function handleDidStopLoading() {
    setIsLoading(false);
    setProgress(100);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setTimeout(() => setProgress(0), 350);
  }


  return (
    <div className="flex h-screen w-screen overflow-hidden bg-neutral-900 text-white font-sans antialiased relative">
      {showUrlModal && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: 'rgba(20,20,20,0.65)' }}
          onClick={() => setShowUrlModal(false)}
        />
      )}
      <Sidebar
        tabs={tabs}
        activeTabId={activeTabId}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onNewTab={handleNewTab}
        onTabClick={handleTabClick}
        onRemoveTab={handleRemoveTab}
        onBack={handleBack}
        onForward={handleForward}
        onReload={handleReload}
        url={formatSidebarUrl(activeTab?.url || '')}
        onUrlClick={openUrlModal}
        onCopyLink={handleCopyLink}
        onShowInfo={() => setShowInfoModal(true)}
        urlLoadingBar={
          <div style={{
            position: 'absolute',
            left: 8,
            right: 8,
            bottom: 5,
            height: 2,
            background: 'rgba(255,255,255,0.10)',
            borderRadius: 2,
            overflow: 'hidden',
            zIndex: 1,
            pointerEvents: 'none',
          }}>
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #ff849a 0%, #7747DC 100%)',
                transition: isLoading ? 'width 0.18s linear' : 'width 0.32s cubic-bezier(.4,2,.6,1)',
                borderRadius: 2,
              }}
            />
          </div>
        }
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
            {activeTab && activeTab.url && (
              <webview
                key={activeTab.id}
                ref={(el) => {
                  if (el && webviewRef.current !== el) {
                    webviewRef.current = el;
                    attachWebviewListeners(el);
                  }
                }}
                src={activeTab.url}
                style={{ width: '100%', height: '100%' }}
                // @ts-ignore
                allowpopups="true"
                webpreferences="nativeWindowOpen=yes"
              />
            )}
            {activeTab && !activeTab.url && (
              <div className="w-full h-full" />
            )}
            {showInfoModal && activeTab && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[400px] max-w-[90vw]">
                  <div className="text-2xl font-bold mb-4 text-neutral-800">Tab Info</div>
                  <div className="mb-2"><b>Title:</b> {activeTab.title}</div>
                  <div className="mb-2"><b>URL:</b> {activeTab.url}</div>
                  <div className="mb-2"><b>Can Go Back:</b> {activeTab.canGoBack ? 'Yes' : 'No'}</div>
                  <div className="mb-2"><b>Can Go Forward:</b> {activeTab.canGoForward ? 'Yes' : 'No'}</div>
                  <div className="flex justify-end mt-6">
                    <button
                      className="bg-pink-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-pink-600"
                      onClick={() => setShowInfoModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showUrlModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <div
            className="relative z-50 flex items-center justify-center"
            style={{
              pointerEvents: 'auto',
              width: '100%',
              maxWidth: '100vw',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div
              className="flex items-center shadow-2xl"
              style={{
                background: 'rgba(28,28,30,0.97)',
                borderRadius: '2rem',
                minHeight: 48,
                minWidth: 350,
                maxWidth: '40vw',
                width: '40vw',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
                padding: '0 1.5rem',
                border: '1.5px solid rgba(255,255,255,0.08)',
                transition: 'box-shadow 0.2s',
              }}
            >
              <svg
                className="mr-3"
                width="22"
                height="22"
                viewBox="0 0 20 20"
                fill="none"
                style={{ flexShrink: 0, opacity: 0.7 }}
              >
                <circle cx="10" cy="10" r="9" stroke="#fff" strokeWidth="2" />
                <path d="M7 10.5L9 12.5L13 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                autoFocus
                className="bg-transparent text-white text-xl font-semibold outline-none border-none flex-1"
                style={{
                  minWidth: 0,
                  width: '100%',
                  padding: '1rem 0',
                  letterSpacing: 0.5,
                  fontWeight: 600,
                  textAlign: 'left',
                  boxShadow: 'none',
                }}
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                onClick={e => e.stopPropagation()}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    let url = smartUrl(urlInput);
                    // Always ensure https for google search
                    if (url.startsWith('http://')) url = url.replace('http://', 'https://');
                    setTabs(prev =>
                      prev.map(tab =>
                        tab.id === activeTabId
                          ? { ...tab, url }
                          : tab
                      )
                    );
                    setShowUrlModal(false);
                  }
                  if (e.key === 'Escape') setShowUrlModal(false);
                }}
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
