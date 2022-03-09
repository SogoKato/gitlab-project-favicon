(() => {
    if (window.hasRun) return;
    window.hasRun = true;

    const getHostnames = (result) => {
        return result.enabledGitLabSites.split(",");
    };

    const onError = () => {
        return [];
    };

    const changeFaviconToProjectLogoIfEnabled = (hostnames) => {
        if (!hostnames.includes(document.location.hostname)) {
            return;
        }
        const favicon = document.querySelector("link#favicon[rel~='icon']");
        const img = document.querySelector("*[data-qa-selector='sidebar_menu_link'] img.avatar");
        if (favicon === null || img === null) return;
        favicon.href = img.src;
    };

    if (window.browser) {
        const getting = browser.storage.sync.get("enabledGitLabSites");
        getting.then(getHostnames, onError).then(changeFaviconToProjectLogoIfEnabled, () => { });
    } else {
        chrome.storage.sync.get(["enabledGitLabSites"], (result) => {
            try {
                changeFaviconToProjectLogoIfEnabled(getHostnames(result));
            } catch {
                return;
            }
        });
    }
})();
