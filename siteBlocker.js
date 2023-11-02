document.addEventListener('DOMContentLoaded', function() {
    // Получение элементов HTML
    const siteInput = document.getElementById('siteInput');
    const blockButton = document.getElementById('blockButton');
    const blockedSitesList = document.getElementById('blockedSitesList');

    chrome.storage.local.get({ blockedSites: [] }, function(data) {
        const blockedSites = data.blockedSites;
        updateBlockedList(blockedSites);
    });


    blockButton.addEventListener('click', function() {
        const site = siteInput.value.trim();
        if (site) {
            // Добавление нового заблокированного сайта в хранилище
            chrome.storage.local.get({ blockedSites: [] }, function(data) {
                const blockedSites = data.blockedSites;
                blockedSites.push(site);
                chrome.storage.local.set({ blockedSites: blockedSites }, function() {
                    updateBlockedList(blockedSites);
                    siteInput.value = '';
                });
            });
        }
    });

    // html update
    function updateBlockedList(blockedSites) {

        blockedSitesList.innerHTML = '';
        blockedSites.forEach(function(site) {
            const listItem = document.createElement('li');
            listItem.textContent = site;
            blockedSitesList.appendChild(listItem);
        });
    }
});
