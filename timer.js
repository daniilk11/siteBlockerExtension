let timerInterval;
let remainingTime = 0;

function updateTimer() {
    const hours = Math.floor(remainingTime / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0');
    const seconds = (remainingTime % 60).toString().padStart(2, '0');
    document.getElementById('timer').innerText = `Timer: ${hours}:${minutes}:${seconds}`;
    remainingTime--;

    if (remainingTime < 0) {
        clearInterval(timerInterval);
        document.getElementById('timer').innerText = 'Timer: 00:00:00';
    }

    // Save the remaining time to storage for future use
    chrome.storage.local.set({timer: remainingTime});
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

document.getElementById('start').addEventListener('click', () => {
    startTimer();
});

document.getElementById('pause').addEventListener('click', () => {
    clearInterval(timerInterval);
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timerInterval);
    remainingTime = 0;
    updateTimer();
});

document.getElementById('set').addEventListener('click', () => {
    const setHours = parseInt(document.getElementById('setTimer').value, 10);
    if (!isNaN(setHours)) {
        remainingTime = setHours * 3600;
        updateTimer();
    }
});

// Retrieve the remaining time from storage when the popup opens
chrome.storage.local.get(['timer'], function (data) {
    if (data.timer) {
        remainingTime = data.timer;
        startTimer(); // Start the timer if there is remaining time saved
    }
});
