document.addEventListener('DOMContentLoaded', function () {
    // Get the remaining time from the background script
    chrome.runtime.sendMessage({action: 'getRemainingTime'}, function (response) {
        const remainingTime = response.remainingTime;
        if (remainingTime) {
            updateTimerDisplay(remainingTime);
        }
    });


    document.getElementById('start').addEventListener('click', () => {
        chrome.runtime.sendMessage({action: 'startTimer'}, function (response) {
            console.log(response.message);
        });
    });

    document.getElementById('pause').addEventListener('click', () => {
        // Send a message to pause the timer if needed
        chrome.runtime.sendMessage({action: 'pauseTimer'});
    });

    document.getElementById('reset').addEventListener('click', () => {
        // Send a message to reset the timer if needed
        chrome.runtime.sendMessage({action: 'resetTimer'});
    });

    document.getElementById('set').addEventListener('click', () => {
        const setHours = parseInt(document.getElementById('setTimer').value, 10);
        if (!isNaN(setHours)) {
            const setTimeInSeconds = setHours * 3600;
            updateTimerDisplay(setTimeInSeconds);
            chrome.runtime.sendMessage({action: 'setTimer', time: setTimeInSeconds});
        }
    });
});


function updateTimerDisplay(remainingTime) {
    const hours = Math.floor(remainingTime / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0');
    const seconds = (remainingTime % 60).toString().padStart(2, '0');
    document.getElementById('timer').innerText = `Timer: ${hours}:${minutes}:${seconds}`;
}

function updateTimer() {
    chrome.runtime.sendMessage({action: 'getRemainingTime'}, function (response) {
        const remainingTime = response.remainingTime;
        if (remainingTime) {
            updateTimerDisplay(remainingTime);
        }
    });
}


// Update the timer every second
setInterval(updateTimer, 1000);

// Rest of your code handling button clicks and interactions...
