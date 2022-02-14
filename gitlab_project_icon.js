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
            console.log(hostnames);
            return;
        }
        const favicon = document.querySelector("link#favicon[rel~='icon']");
        const img = document.querySelector(".layout-page .shortcuts-project img.avatar");
        if (favicon === null || img === null) return;
        favicon.href = img.src;
    };

    const getting = browser.storage.sync.get("enabledGitLabSites");
    getting.then(getHostnames, onError).then(changeFaviconToProjectLogoIfEnabled, () => { });
})();
