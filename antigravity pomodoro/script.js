const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const modeFocusBtn = document.getElementById('mode-focus');
const modeShortBtn = document.getElementById('mode-short');
const customMinutesInput = document.getElementById('custom-minutes');
const circle = document.querySelector('.progress-ring__circle');

const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

let timer;
let timeLeft;
let totalTime;
let isRunning = false;
let currentMode = 'focus';

function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const progress = (timeLeft / totalTime) * 100;
    setProgress(progress);
}

function startTimer() {
    if (isRunning) {
        clearInterval(timer);
        startBtn.textContent = 'Start';
        isRunning = false;
    } else {
        if (!timeLeft) {
            timeLeft = parseInt(customMinutesInput.value) * 60;
            totalTime = timeLeft;
        }
        isRunning = true;
        startBtn.textContent = 'Pause';
        
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                startBtn.textContent = 'Start';
                alert('Time is up!');
                resetTimer();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = 'Start';
    timeLeft = parseInt(customMinutesInput.value) * 60;
    totalTime = timeLeft;
    updateDisplay();
}

function switchMode(mode) {
    currentMode = mode;
    if (mode === 'focus') {
        customMinutesInput.value = 25;
        modeFocusBtn.classList.add('active');
        modeShortBtn.classList.remove('active');
    } else {
        customMinutesInput.value = 5;
        modeShortBtn.classList.add('active');
        modeFocusBtn.classList.remove('active');
    }
    resetTimer();
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
modeFocusBtn.addEventListener('click', () => switchMode('focus'));
modeShortBtn.addEventListener('click', () => switchMode('short'));

customMinutesInput.addEventListener('change', () => {
    resetTimer();
});

// Initialize
timeLeft = parseInt(customMinutesInput.value) * 60;
totalTime = timeLeft;
updateDisplay();
setProgress(100);
