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
        if (favicon === null || img === null) return;
        favicon.href = img.src;
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
