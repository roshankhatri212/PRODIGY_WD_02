let timer;
let isRunning = false;
let isPaused = false;
let startTime;
let elapsedTime = 0; // Updated variable
let lapNumber = 1;

function startStopwatch() {
  if (!isRunning && !isPaused) {
    isRunning = true;
    startTime = new Date().getTime() - elapsedTime; // Updated line

    timer = setInterval(updateTime, 1000);
  }
}

function pauseStopwatch() {
  if (isRunning) {
    isRunning = false;
    isPaused = true;
    clearInterval(timer);
  }
}

function resumeStopwatch() {
  if (isPaused) {
    isRunning = true;
    isPaused = false;
    startTime = new Date().getTime() - elapsedTime; // Updated line

    timer = setInterval(updateTime, 1000);
  }
}

function resetStopwatch() {
  isRunning = false;
  isPaused = false;
  clearInterval(timer);
  document.querySelector('.time').textContent = '00:00:00';
  lapNumber = 1;
  elapsedTime = 0; // Updated line
  document.getElementById('lapList').innerHTML = '';
}

function recordLap() {
  if (isRunning) {
    const lapTime = calculateTime(new Date().getTime() - startTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
    document.getElementById('lapList').appendChild(lapItem);
    lapNumber++;
  }
}

function updateTime() {
  const currentTime = new Date().getTime();
  elapsedTime = currentTime - startTime; // Updated line
  const formattedTime = calculateTime(elapsedTime);

  document.querySelector('.time').textContent = formattedTime;
}

function calculateTime(timeInMilliseconds) {
  const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
  const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((timeInMilliseconds / (1000 * 60 * 60)) % 24);

  return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
}

function padNumber(number) {
  return number < 10 ? `0${number}` : number;
}
