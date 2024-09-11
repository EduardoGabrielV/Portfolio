const gameContainer = document.querySelector('.memory-game');
const restartButton = document.createElement('button');

const animalImages = [
    '../../img/banners/animal1.png',
    '../../img/banners/animal2.png',
    '../../img/banners/animal3.png',
    '../../img/banners/animal4.png',
    '../../img/banners/animal5.png',
    '../../img/banners/animal6.png',
    '../../img/banners/animal7.png',
    '../../img/banners/animal8.png'
];

let cards = [...animalImages, ...animalImages].sort(() => 0.5 - Math.random());

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;
let timerInterval;
let startTime;
let isTimerRunning = false;

function createCards() {
  cards.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.innerHTML = `
      <img class="front-face" src="${image}" alt="Animal">
      <div class="back-face"></div>
    `;
    card.addEventListener('click', flipCard);
    gameContainer.appendChild(card);
  });
}

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    document.getElementById('timer').textContent = `Tempo: ${elapsedTime} segundos`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;


  if (!isTimerRunning) {
    startTimer();
    isTimerRunning = true;
  }

  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}


function checkForMatch() {
  let isMatch = firstCard.querySelector('.front-face').src === secondCard.querySelector('.front-face').src;

  if (isMatch) {
    disableCards();
    matchedCards += 2;


    if (matchedCards === cards.length) {
      stopTimer();
      showRestartButton();
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


function showRestartButton() {
  restartButton.textContent = 'Tentar novamente';
  restartButton.classList.add('restart-button');
  document.body.appendChild(restartButton);
  restartButton.addEventListener('click', () => {
    location.reload(); 
  });
}

createCards();
