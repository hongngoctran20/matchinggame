// DECK OF CARDS SETUP & CONTROLS
let card = document.getElementsByClassName("card");
let cards = [...card]
let moves = 0;
let counter = document.querySelector(".moves");
let matchedCard = document.getElementsByClassName("match");
let closeicon = document.querySelector(".close");
let modal = document.getElementById("popup1")
let starsList = document.querySelectorAll(".stars li");

const deck = document.getElementById("card-deck");
const stars = document.querySelectorAll(".fa-star");

var openedCards = [];


// SHUFFLE CARDS
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// STARTS GAME AND SHUFFLES CARDS UPON RESTART
document.body.onload = startGame();


function startGame() {
    cards = shuffle(cards);
    
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
        openedCards = [];
    }

    // RESET BOARD
    moves = 0;
    counter.innerHTML = moves;

    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#66FCF1";
        stars[i].style.visibility = "visible";
    }

    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "00 mins 00 secs";
    clearInterval(interval);
}


// DISPLAYS CARD SWITCHES BETWEEN OPEN AND SHOW CLASS
var displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// CHECK IF OPENED CARDS ARE MATCH
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}


// WHEN CARDS MATCH
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// CARDS MISMATCH
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        cardActivity();
        openedCards = [];
    }, 1100);
}


// TEMPORARILY DISABLE CARDS
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}


// DISABLE MATCHED CARDS
function cardActivity() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}


// START CLOCK & COUNT MOVES
function moveCounter() {
    moves++;
    counter.innerHTML = moves;

    // START TIMER ON FIST MOVE SET
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

    // STARS COLLAPSE BASED OFF MOVES SET, BLINKING STAR WITHIN 2 MOVES
    if (moves > 9 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }

    else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

function warningStar (){
    let blinkingStar = document.getElementById('blinkingStar');
    blinkingStar.innerHTML = "&#xf005;";

    setTimeout(function(){
        blinkingStar.innerHTML = "&#xf006;";
    }, 1500);
} 


// TIMER SETUP
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}


// POPUP WHEN ALL CARDS MATCHED: DISPLAY TIME, MOVES, STARS
function congratulations() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        modal.classList.add("show");

        var starRating = document.querySelector(".stars").innerHTML;

        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        closeModal();
    };
}


// ALLOWS CLOSING POPUP
function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
    });
}


// PLAY AGAIN BUTTON
function playAgain() {
    modal.classList.remove("show");
    startGame();
}


// ADD LISTENERS TO CARDS
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};