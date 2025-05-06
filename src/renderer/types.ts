export interface Tab {
  id: string;
  title: string;
  url: string;
  color: string;
  active: boolean;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  favicon?: string;
  isMuted?: boolean;
  isPlaying?: boolean;
  zoomLevel?: number;
  isPinned?: boolean;
  lastAccessed?: number;
}

export type ThemeMode = 'light' | 'dark';

export interface BrowserHistory {
  url: string;
  title: string;
  timestamp: number;
  favicon?: string;
}
