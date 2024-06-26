async function saveOptions(e) {
  e.preventDefault();
  const enabledGitLabSites = document.querySelector("#enabledGitLabSites").value.replace("\n", ",");
  const enableChangeFavicon = document.querySelector("#enableChangeFavicon").value;
  const enableCopyReference = document.querySelector("#enableCopyReference").value;
  const webext = chrome ? chrome : browser;
  await webext.storage.sync.set({
    enabledGitLabSites,
    enableChangeFavicon,
    enableCopyReference,
  });
  document.getElementById("saveBtn").innerText = "Saved!"
  setTimeout(() => { document.getElementById("saveBtn").innerText = "Save" }, 3000);
}

async function restoreOptions() {
  const webext = chrome ? chrome : browser;
  const settings = await webext.storage.sync.get(null);
  if (typeof settings.enabledGitLabSites === "string") {
    document.querySelector("#enabledGitLabSites").value = settings.enabledGitLabSites.replace(",", "\n");
  }
  document.querySelector("#enableChangeFavicon").value = settings.enableChangeFavicon !== "no" ? "yes" : "no";
  document.querySelector("#enableCopyReference").value = settings.enableCopyReference === "yes" ? "yes" : "no";
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
