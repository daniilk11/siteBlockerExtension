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

// timer
let timerInterval;
let remainingTime = 0;


timerInterval = setInterval(() => {
    if (remainingTime > 0) {
        updateTimer();
    }
}, 1000);

function updateTimer() {
    remainingTime--;

    if (remainingTime < 0) {
        clearInterval(timerInterval);
        remainingTime = 0; // Reset remaining time when timer reaches zero
    }

    chrome.storage.local.set({timer: remainingTime}); // Save remaining time
}

function startTimer() {
    if (!timerInterval && remainingTime > 0) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    remainingTime = 0;
    chrome.storage.local.set({timer: 0}); // Reset remaining time
}

function setTimer(time) {
    remainingTime = time;
    chrome.storage.local.set({timer: time}); // Save set remaining time
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startTimer') {
        startTimer();
        sendResponse({message: 'Timer started'});
    } else if (request.action === 'getRemainingTime') {
        sendResponse({remainingTime});
    } else if (request.action === 'pauseTimer') {
        pauseTimer();
        sendResponse({message: 'Timer paused'});
    } else if (request.action === 'resetTimer') {
        resetTimer();
        sendResponse({message: 'Timer reset'});
    } else if (request.action === 'setTimer') {
        setTimer(request.time);
        sendResponse({message: 'Timer set'});
    }
});

// Retrieve the remaining time from storage when the extension is loaded
chrome.storage.local.get(['timer'], function (data) {
    if (data.timer) {
        remainingTime = data.timer;
    }
});
