function isHttpUrl(url: string | undefined): boolean {
  return !!url && (url.startsWith("http://") || url.startsWith("https://"));
}

/** Prefer the active http(s) tab; else the first http(s) tab in this window. */
export async function relevantTabUrl(): Promise<string | undefined> {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const httpTabs = tabs.filter((tab) => isHttpUrl(tab.url));
  const active = httpTabs.find((tab) => tab.active);
  return (active ?? httpTabs[0])?.url;
}
