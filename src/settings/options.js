function saveOptions(e) {
  e.preventDefault();
  const enabledGitLabSites = document.querySelector("#enabledGitLabSites").value.replace("\n", ",");
  const browser = window.browser ? window.browser : window.chrome;
  browser.storage.sync.set({
    enabledGitLabSites: enabledGitLabSites,
  });
  document.getElementById("saveBtn").innerText = "Saved!"
  setTimeout(() => { document.getElementById("saveBtn").innerText = "Save" }, 3000);
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#enabledGitLabSites").value = result.enabledGitLabSites.replace(",", "\n");
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  if (window.browser) {
    const getting = browser.storage.sync.get("enabledGitLabSites");
    getting.then(setCurrentChoice, onError);
  } else {
    chrome.storage.sync.get(["enabledGitLabSites"], setCurrentChoice);
  }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
