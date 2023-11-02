chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading') {
        chrome.storage.local.get({ blockedSites: [] }, function(data) {
        const blockedSites = data.blockedSites;
        if (isBlocked(tab.url, blockedSites)) {
            // TODO make new .html
            chrome.tabs.update(tabId, {url: "popup.html"});
        }
    });
    }
});

function isBlocked(url, blockedSites) {
    const urlObject = new URL(url);
    return blockedSites.some(site => urlObject.hostname.includes(site));
}
