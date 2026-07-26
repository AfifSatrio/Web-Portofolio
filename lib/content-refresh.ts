"use client";

export const CONTENT_REFRESH_EVENT = "portfolio-content-refresh";
export const CONTENT_REFRESH_STORAGE_KEY = "portfolio-content-refresh-at";

export const notifyContentRefresh = () => {
  const timestamp = Date.now().toString();
  window.localStorage.setItem(CONTENT_REFRESH_STORAGE_KEY, timestamp);
  window.dispatchEvent(new CustomEvent(CONTENT_REFRESH_EVENT));
};

export const subscribeToContentRefresh = (callback: () => void) => {
  const handleRefresh = () => callback();
  const handleStorage = (event: StorageEvent) => {
    if (event.key === CONTENT_REFRESH_STORAGE_KEY) callback();
  };
  const handleVisibility = () => {
    if (document.visibilityState === "visible") callback();
  };

  window.addEventListener(CONTENT_REFRESH_EVENT, handleRefresh);
  window.addEventListener("storage", handleStorage);
  window.addEventListener("focus", handleRefresh);
  document.addEventListener("visibilitychange", handleVisibility);

  return () => {
    window.removeEventListener(CONTENT_REFRESH_EVENT, handleRefresh);
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("focus", handleRefresh);
    document.removeEventListener("visibilitychange", handleVisibility);
  };
};
