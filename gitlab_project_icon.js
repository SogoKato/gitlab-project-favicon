(() => {
    if (window.hasRun) return;
    window.hasRun = true;
    
    const changeFaviconToProjectLogo = () => {
        const favicon = document.querySelector("link#favicon[rel~='icon']");
        const img = document.querySelector(".layout-page .shortcuts-project img.avatar");
        favicon.href = img.src;
    };
    if (localStorage.getItem("gitlabProjectStorageFaviconEnabled") !== "yes") return;
    changeFaviconToProjectLogo();
    return;
})();
