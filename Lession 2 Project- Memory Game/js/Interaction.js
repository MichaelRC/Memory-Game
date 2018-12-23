// Global variables
//Constant Variables
const allCards = Array.from(document.querySelectorAll('.card'));
const moveCounter = document.querySelector('.moves');
const modalMoveCounter = document.querySelector('.modal-moves')
const shuffleButton = document.querySelector(".restart");
const stars = document.querySelector('.stars');
const modal = document.querySelector('.winning-modal');
const closeModal = document.querySelector('.modal-close');
const startOver = document.querySelector('.repeat-game');
const seconds = document.querySelector('.seconds');
const modalSeconds = document.querySelector('.modal-seconds');
const minutes = document.querySelector('.minutes');
const modalMinutes = document.querySelector('.modal-minutes');

//Non-Constant Variables
let openCards = [];
let moves = 0;
let cardsMatched = [];
let sec = 0;
let modalSec = 0;

//Shuffles card function used at beginning

shuffleCards();

//Start over

shuffleButton.addEventListener('click', function() {
  playAgain();
});

startOver.addEventListener('click', function() {
  playAgain();
  modal.style.display = 'none';

  // Used to make Start over function properly.

  let  timer = setInterval(function (){
   seconds.innerText = zero(++sec%60);
   minutes.innerText = zero(parseInt(sec/60,10));
   modalSeconds.innerText = zero(++modalSec%60);
   modalMinutes.innerText = zero(parseInt(modalSec/60,10));
  }, 1000);

});

// Timer

function zero ( val ) { return val > 9 ? val : "0" + val; }
let  timer = setInterval(function (){
 seconds.innerText = zero(++sec%60);
 minutes.innerText = zero(parseInt(sec/60,10));
 modalSeconds.innerText = zero(++modalSec%60);
 modalMinutes.innerText = zero(parseInt(modalSec/60,10));
}, 1000);

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

//Shuffle cards function

function shuffleCards() {
  const cardsShuffled = shuffle(allCards);
  for (each of cardsShuffled) {
    document.querySelector('.deck').appendChild(each);
  };
};

// Check if user has won

function winnerWinner() {
  if (cardsMatched.length == 8) {
    clearInterval(timer);
    modal.style.display = "block";
  };
};

//Reset cards and play again

function playAgain() {
  shuffleCards();
  for (let card of allCards) {
    card.classList.remove('open', 'show');
  };
  moveCounter.innerText = 0;
  stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
  openCards = [];
  cardsMatched = [];
  moves = 0;
  sec = 0;
  modalSec = 0;
  setInterval(timer);
};

// Card functions

allCards.forEach(function(card) {
  card.addEventListener('click', function(flipCard) {
    if (card.classList.contains ('hidden')) {
      openCards.push(card);
      card.classList.remove ('hidden');
      card.classList.add('open', 'show');

      // When cards are not a match

      if (openCards.length == 2 && openCards[0].innerHTML !== openCards[1].innerHTML) {
        setTimeout(function() {
          for (let each of openCards) {
            each.classList.remove('open', 'show');
            each.classList.add ('hidden');
            openCards = [];
          };
          moves += 1;
          moveCounter.innerText = moves;
          modalMoveCounter.innerText = moves;
        }, 800);

        // When cards are a match

      } else if (openCards.length == 2 && openCards[0].innerHTML == openCards[1].innerHTML) {
        cardsMatched.push(openCards);
        openCards = [];
        moves += 1;
        moveCounter.innerText = moves;
        modalMoveCounter.innerText = moves;
      };
    };

    // Check if user won every turn

    winnerWinner();

    // Star rating system

    if (moves <= 15) {
      stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
    } else if (moves > 15 && moves < 25) {
        stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
    } else if (moves > 25) {
        stars.innerHTML = "<li><i class='fa fa-star'></i></li>";
    };
  });
});

// Little X button in the modal

closeModal.addEventListener('click', function() {
  modal.style.display = 'none';
});
