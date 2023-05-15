let player = {
    name: "",
    chips: 0
}

let deck = [];
let cards = [];
let sum = 0;
let dealerCards = [];
let dealerSum = 0;

let hasBlackJack;
let isAlive;
let dealOver = true;

let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let dealerCardsEl = document.getElementById("dealerCards-el");
let dealerSumEl = document.getElementById("dealerSum-el");
let wagerEl = document.getElementById("wager-el");

let startButton = document.getElementById("startButton");
let dealButton = document.getElementById("dealButton");
let newCardButton = document.getElementById("newCardButton");
let holdButton = document.getElementById("holdButton");
dealButton.style.visibility = 'hidden';
newCardButton.style.visibility = 'hidden';
holdButton.style.visibility = 'hidden';

let wager = 0;

function newGame(){
    let name = prompt("Enter your name: ");
    while(name == ""){
        name = prompt("You must enter a name: ");
    }
    player.name = name;
    let chips = prompt("Enter the amount to play with: ");
    chips = Number(chips);
    while(chips < 1 || isNaN(chips)){
        chips = prompt("The amount must be a number greater than 0. Enter the amount to play with: ");
        chips = Number(chips);
    }
    //reset the deck
    deck = []
    for(let i = 2; i < 15; i++){
        for(let j = 0; j < 4; j++){
            if(i<12){
                deck.push(i);
            } else {
                deck.push(10);
            }
        }
    }
    messageEl.textContent = "";
    cardsEl.textContent = "";
    sumEl.textContent = "";
    dealerCardsEl.textContent = "";
    dealerSumEl.textContent = "";
    wagerEl.textContent = "";
    player.chips = chips;
    alert("New game created. Have fun!")
    playerEl.textContent = "Hi " + player.name + "! - Balance: $" + player.chips;
    dealButton.style.visibility = 'visible';
    newCardButton.style.visibility = 'visible';
    holdButton.style.visibility = 'visible';
    startButton.textContent = "New Game";
    messageEl.textContent = "Click Deal to play!";
}

function getCard(){
    // if empty: populate the deck with 2-10, Ace = 11, Jack Queen King = 10 -> 4 of each card (Spade, Club, Diamond, Heart) ; is like reshuffling when ran out of cards
    if(deck.length == 0){
        for(let i = 2; i < 15; i++){
            for(let j = 0; j < 4; j++){
                if(i<12){
                    deck.push(i);
                } else {
                    deck.push(10);
                }
            }
        }
    }
    let randIdx = Math.floor(Math.random()*deck.length);
    let randNum = deck[randIdx];
    deck.splice(randIdx, 1);
    return randNum;
}

function newDeal() {
    if(player.chips == 0){
        alert("You are out of chips. Start a new game if you'd like to play again.");
    }
    else if(dealOver){
        dealerCards = [];
        cards = [];
        dealerSum = 0;
        sum = 0;
        isAlive = true;
        hasBlackJack = false;
        dealOver = false;
        let playerCard = getCard();
        let dealerCard = getCard();
        cards.push(playerCard);
        dealerCards.push(dealerCard);
        sum = playerCard;
        dealerSum = dealerCard;
        renderGame();
        dealerCardsEl.textContent = "";
        dealerSumEl.textContent = "";
        wager = prompt("Your first card was " + playerCard + ". How much do you want to wager?");
        wager = Number(wager);
        while(wager > player.chips || wager < 1 || isNaN(wager)){
            wager = prompt("Your wager must be a number greater than 0 and less than or equal to the amount of chips. Chips: $" + player.chips + ". Your first card was " + playerCard + ". How much do you want to wager?");
            wager = Number(wager);
        }
        wagerEl.textContent = "Current Wager: " + wager;
    }
    
}

function renderGame() {
    cardsEl.textContent = "Your Cards: ";
    for(let i = 0; i < cards.length; i++){
        cardsEl.textContent += cards[i] + " ";
    }
    sumEl.textContent = "Your Sum: " + sum;
    if (sum <= 21) {
        message = "Click HIT for another card, otherwise click STAND";
    } else {
        message = "Dealer wins! You went over 21!";
        isAlive = false;
        dealOver = true;
        dealerCardsEl.textContent = "Dealer Cards: " + dealerCards[0];
        dealerSumEl.textContent = "Dealer Sum: " + dealerSum;
        player.chips-=wager;
    }
    messageEl.textContent = message;
    playerEl.textContent = "Hi " + player.name + "! - Balance: $" + player.chips;
}

function givePlayerCard(){
    if(isAlive && !hasBlackJack &&!dealOver){
        let card = getCard();
        sum += card;
        cards.push(card)
        renderGame();
    }
}

function dealDealer(){
    if(isAlive && !hasBlackJack && !dealOver){
        while(dealerSum < 17){
            let card = getCard();
            dealerCards.push(card);
            dealerSum += card;
        }
        dealerCardsEl.textContent = "Dealer Cards: ";
        for(let i = 0; i < dealerCards.length; i++){
            dealerCardsEl.textContent += dealerCards[i] + " ";
        }
        dealerSumEl.textContent = "Dealer Sum: " + dealerSum;
        dealOver = true;
        compareSums();
    }
    
}

function compareSums(){
    if(dealerSum > 21){
        messageEl.textContent = "Dealer went over 21. You win!";
        player.chips+=Number(wager);
    } else {
        if(dealerSum >= sum){
            messageEl.textContent = "Dealer Wins!";
            player.chips-=wager;
        } else {
            messageEl.textContent = "You Win!";
            player.chips+=Number(wager);
        }
    }
    playerEl.textContent = "Hi " + player.name + "! - Balance: $" + player.chips;
    
}
