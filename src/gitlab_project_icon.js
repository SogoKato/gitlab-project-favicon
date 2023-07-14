(() => {
    if (window.hasRun) return;
    window.hasRun = true;

    const getHostnames = (result) => {
        if (!result.enabledGitLabSites) throw new Error();
        return result.enabledGitLabSites.split(",");
    };

    const changeFaviconToProjectLogo = () => {
        const favicon = document.querySelector("link#favicon[rel~='icon']");
        const img = document.querySelector("*[data-qa-selector='sidebar_menu_link'] img.avatar");
        const imgV16 = document.querySelector("*[data-qa-selector='context_switcher'] img.gl-avatar");
        if (favicon === null) return;
        if (img) {
          favicon.href = img.src;
        } else if (imgV16) {
          favicon.href = imgV16.src;
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
