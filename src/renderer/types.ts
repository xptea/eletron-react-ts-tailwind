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
}
