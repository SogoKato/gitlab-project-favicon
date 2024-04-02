(() => {
    if (window.hasRun) return;
    window.hasRun = true;

    const getHostnames = (result) => {
        if (!result.enabledGitLabSites) throw new Error();
        return result.enabledGitLabSites.split(",");
    };

    const changeFaviconToProjectLogo = () => {
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

    const changeFaviconToProjectLogoIfEnabled = (hostnames) => {
        if (!hostnames.includes(document.location.hostname)) {
            return;
        }
        changeFaviconToProjectLogo();
    };

    if (window.browser) {
        const getting = browser.storage.sync.get("enabledGitLabSites");
        getting.then(getHostnames).then(changeFaviconToProjectLogoIfEnabled, changeFaviconToProjectLogo);
    } else {
        chrome.storage.sync.get(["enabledGitLabSites"], (result) => {
            try {
                changeFaviconToProjectLogoIfEnabled(getHostnames(result));
            } catch {
                changeFaviconToProjectLogo();
            }
        });
    }
})();
