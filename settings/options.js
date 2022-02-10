function saveOptions(e) {
    e.preventDefault();
    const enabledGitLabSites = document.querySelector("#enabledGitLabSites").value.replace("\n", ",");
    browser.storage.sync.set({
        enabledGitLabSites: enabledGitLabSites,
    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.querySelector("#enabledGitLabSites").value = result.enabledGitLabSites.replace(",", "\n");
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    const getting = browser.storage.sync.get("enabledGitLabSites");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
