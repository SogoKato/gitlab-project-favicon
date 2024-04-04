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

  const addCopyReferenceButton = () => {
    if (!/^.+\/-\/(issues|merge_requests)\/\d+.*$/.test(document.location.pathname)) return;
    if (document.querySelector(".js-copy-reference") === null) return;
    const button = document.createElement("button");
    button.className = "btn btn-default btn-sm gl-button gl-ml-3";  // gl-ml-3 can be removed from 16.10 or 16.11.
    const buttonText = document.createElement("span");
    buttonText.innerText = "Copy reference";
    buttonText.className = "gl-button-text";
    button.appendChild(buttonText);
    const breadcrumbs = document.querySelector(".top-bar-container nav.breadcrumbs.gl-breadcrumbs");
    if (breadcrumbs === null) return;
    const copy = () => {
      document.querySelector(".js-copy-reference").click();
    };
    button.addEventListener("click", copy);
    breadcrumbs.appendChild(button);
  };

  const webext = getWebExtension();
  const settings = await webext.storage.sync.get(null);
  if (!isEnabledSite(settings)) return;
  // Unless explicit denial, it is enabled by default.
  if (settings.enableChangeFavicon !== "no") {
    changeFaviconToProjectIcon();
  }
  // Unless explicit acceptance, it is disabled by default.
  if (settings.enableCopyReference === "yes") {
    addCopyReferenceButton();
  }
})();
