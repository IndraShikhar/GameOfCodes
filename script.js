let sequence = [];
let playerSequence = [];
let level = 0;
let score = 0;
let gamePaused = false;
let leaderboard = [];

const colors = ['green', 'red', 'yellow', 'blue'];
const statusDisplay = document.getElementById('status');
const scoreDisplay = document.getElementById('score');
const leaderboardList = document.getElementById('leaderboard-list');

function startGame() {
  const username = document.getElementById('username').value.trim();

  if (username === '') {
    alert('Please enter your name to start the game.');
    return;
  }

  gamePaused = false;
  sequence = [];
  playerSequence = [];
  level = 0;
  score = 0;
  scoreDisplay.innerText = score;
  statusDisplay.innerText = 'Watch the sequence...';
  statusDisplay.classList.remove('blinking');
  nextLevel();
}

function pauseGame() {
  gamePaused = !gamePaused;
  statusDisplay.innerText = gamePaused ? 'Game Paused' : 'Game Resumed';
}

function restartGame() {
  gamePaused = false;
  startGame();
}

function nextLevel() {
  if (gamePaused) return;

  level++;
  playerSequence = [];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);
  statusDisplay.innerText = `Level ${level}`;
  playSequence();
}

function playSequence() {
  let delay = 500;

  sequence.forEach((color, index) => {
    setTimeout(() => {
      if (!gamePaused) {
        activateTile(color);
      }
    }, delay * (index + 1));
  });
}

function activateTile(color) {
  const tile = document.getElementById(color);
  tile.classList.add('active');
  setTimeout(() => {
    tile.classList.remove('active');
  }, 300);
}

function handleClick(color) {
  if (gamePaused) return;

  playerSequence.push(color);
  activateTile(color);
  checkSequence();
}

function checkSequence() {
  const currentMove = playerSequence.length - 1;

  if (playerSequence[currentMove] !== sequence[currentMove]) {
    statusDisplay.innerText = 'Wrong sequence! Game over.';
    addToLeaderboard();
    return;
  }

  if (playerSequence.length === sequence.length) {
    score += 10;
    scoreDisplay.innerText = score;
    setTimeout(() => {
      statusDisplay.innerText = 'Correct! Next level...';
      nextLevel();
    }, 1000);
  }
}

function addToLeaderboard() {
  const username = document.getElementById('username').value.trim();
  leaderboard.push({ name: username, score: score });

  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);

  displayLeaderboard();
}

function displayLeaderboard() {
  leaderboardList.innerHTML = '';

  leaderboard.forEach(entry => {
    const li = document.createElement('li');
    li.innerText = `${entry.name}: ${entry.score}`;
    leaderboardList.appendChild(li);
  });
}
