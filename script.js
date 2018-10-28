const movesCounter = document.getElementById('moves');
const playBtn = document.getElementById('playBtn');
const timerMinutes = document.getElementById('minutes');
const timerSeconds = document.getElementById('seconds');

let cardWasFlipped = false;
let cardOne, cardTwo;

let boardLocked = false;

let moves = 0;

let minutes = 0, seconds = 0;
let interval;

const captainsArray = [
    'kirk',
    'picard',
    'sisko',
    'janeway',
    'archer',
    'georgiou',
];
// Duplicate captainsArray to have two of each card
let cardsArray = captainsArray.concat(captainsArray);
// Use shuffle to re-order cards in Array
cardsArray = shuffle(cardsArray);

// Create game board as grid an append it to #game
const game = document.getElementById('game');
const gameGrid = document.createElement('div');
gameGrid.setAttribute('class', 'game-grid');
game.appendChild(gameGrid);

// Create .card Divs from cardsArray and append them to game board
cardsArray.forEach(captain => {
    const card = document.createElement('div');

    card.classList.add('card');
    card.dataset.captain = captain;
    card.addEventListener('click', flipCard)

    let imgFront = new Image();
    let imgBack = new Image();
    imgFront.src = 'imgs/' + captain + '.jpg';
    imgBack.src = 'imgs/stvoy_badge.svg';
    imgFront.setAttribute('alt', captain);
    imgBack.setAttribute('alt', 'Voyager Badge');
    imgFront.setAttribute('class', 'front-face');
    imgBack.setAttribute('class', 'back-face');

    card.appendChild(imgFront);
    card.appendChild(imgBack);
    
    gameGrid.appendChild(card);
});

// Shuffle cards - Fisher-Yates (Knuth) Shuffle Algorithm 
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while(0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// flipCard
function flipCard() {
    if(boardLocked) return;
    if (this === cardOne) return; // disable doubleclick on the same card; if it's first click, cardOne is unset -> false; if it's second click: secondCard -> false; else return from function

    this.classList.toggle('flip');

    if (!cardWasFlipped) { // cardIsFlipped: false - this is the first time the player has clicked a card, true - when one card already has been flipped
        cardWasFlipped = true;
        cardOne = this;
    } else { // second click of player - second card
        moves++;
        cardWasFlipped = false; // set variable back to false after second click
        cardTwo = this;

        // Increment movesCount each time two cards have been selected
        movesCounter.textContent = moves;

        // Star rating of player performance - update after each move:
        // cases: moves <=8, <= 12, > 12

        // check if clicked cards match
        // isMatch()
        if (cardOne.dataset.captain === cardTwo.dataset.captain) { // if clicked cards match, remove event listener
            cardOne.removeEventListener('click', flipCard);
            cardTwo.removeEventListener('click', flipCard);
        } else { // else unflip cards with delay
            boardLocked = true;
            setTimeout(() => {
                cardOne.classList.remove('flip');
                cardTwo.classList.remove('flip');

                // Reset board to original state
                cardWasFlipped = false;
                boardLocked = false;
                cardOne = null;
                cardTwo = null;
            }, 1500)
        }
    }
}

// Game Timer
playBtn.addEventListener('click', startTimer);

function startTimer() {
    console.log('Time is running...')
    interval = setInterval(function() {

    }, 1000);
}