document.addEventListener('DOMContentLoaded', function() {
    // Получение элементов HTML
    const siteInput = document.getElementById('siteInput');
    const blockButton = document.getElementById('blockButton');
    const unblockButton = document.getElementById('unblockButton');
    const blockedSitesList = document.getElementById('blockedSitesList');

    chrome.storage.local.get({ blockedSites: [] }, function(data) {
        const blockedSites = data.blockedSites;
        updateBlockedList(blockedSites);
    });


    blockButton.addEventListener('click', function() {
        const site = siteInput.value.trim();
        if (site) {
            // Добавление нового заблокированного сайта в хранилище
            chrome.storage.local.get({blockedSites: []}, function (data) {
                const blockedSites = data.blockedSites || [];
                blockedSites.push(site);
                chrome.storage.local.set({blockedSites: blockedSites}, function () {
                    updateBlockedList(blockedSites);
                    siteInput.value = '';
                });
            });
        }
    });

    unblockButton.addEventListener('click', function () {
        const siteToRemove = siteInput.value.trim();
        if (siteToRemove) {
            // Добавление нового заблокированного сайта в хранилище
            chrome.storage.local.get({blockedSites: []}, function (data) {

                // Retrieve the existing array or create an empty array if it doesn't exist
                let currentBlockedSites = data.blockedSites || [];

                // Find the index of the site in the array
                const index = currentBlockedSites.indexOf(siteToRemove);

                if (index !== -1) {
                    // Remove the site from the array if it exists
                    currentBlockedSites.splice(index, 1);
                    console.log(`Site '${siteToRemove}' unblocked now `);
                    chrome.storage.local.set({blockedSites: currentBlockedSites}, function () {
                        updateBlockedList(currentBlockedSites);
                        siteInput.value = '';
                    });
                } else {
                    console.log(`Site '${siteToRemove}' not found in blocked sites.`);
                }
            });
        }
    });


    // html update
    function updateBlockedList(blockedSites) {

        blockedSitesList.innerHTML = '';
        blockedSites.forEach(function (site) {
            const listItem = document.createElement('li');
            listItem.textContent = site;
            blockedSitesList.appendChild(listItem);
        });
    }
});
