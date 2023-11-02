chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading') {
        chrome.storage.local.get({ blockedSites: [] }, function(data) {
        const blockedSites = data.blockedSites;
        console.log('aaaaaaaaaaaaaaaaaa')
        if (isBlocked(tab.url, blockedSites)) {
            chrome.tabs.update(tabId, { url: "popup.html" }); // Замените "blocked.html" на вашу страницу, которая будет показываться для заблокированных сайтов.
        }
    });
    }
});

function isBlocked(url, blockedSites) {
    console.log('sdfsdfsfsdf')
    const urlObject = new URL(url);
    return blockedSites.some(site => urlObject.hostname.includes(site));
}
