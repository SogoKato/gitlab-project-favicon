(async () => {
  if (window.hasRun) return;
  window.hasRun = true;

  const getWebExtension = () => {
    try {
      return browser;
    } catch {
      return chrome;
    }
  }

  const isEnabledSite = (settings) => {
    // If not defined, it is enabled by default.
    if (!settings.enabledGitLabSites) return true;
    const hostnames = settings.enabledGitLabSites.split(",");
    return hostnames.includes(document.location.hostname);
  };

  const changeFaviconToProjectIcon = () => {
    const favicon = document.querySelector("link#favicon[rel~='icon']");
    // to 15.11
    const imgBeforeV16 = document.querySelector("*[data-qa-selector='sidebar_menu_link'] img.avatar");
    // from 16.0 to 16.3
    const imgEarlyV16 = document.querySelector(".gl-new-dropdown.context-switcher button img.gl-avatar");
    // from 16.4
    const imgLateV16 = document.querySelector("*[data-track-label*='_overview'] img.gl-avatar");
    if (favicon === null) return;
    if (imgBeforeV16) {
      favicon.href = imgBeforeV16.src;
    } else if (imgEarlyV16) {
      favicon.href = imgEarlyV16.src;
    } else if (imgLateV16) {
      favicon.href = imgLateV16.src;
    }
  };

  const webext = getWebExtension();
  const settings = await webext.storage.sync.get(null);
  if (!isEnabledSite(settings)) return;
  // Unless explicit denial, it is enabled by default.
  if (settings.enableChangeFavicon !== "no") {
    changeFaviconToProjectIcon();
  }
})();
