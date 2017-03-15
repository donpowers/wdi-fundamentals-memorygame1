/*
 * Don Powers
 *
 * Functionality below supports the Concentration game.
 * 
 * The user flips two cards and is informed of success or try again.
 * There is the additon of a 'replay' button that resets the cards that are displayed.
 * If the user selects a third card the the first two are reset and the 3rd card flipped.
 *
 * Was not able to flip the second card before the alert box was triggererd.  Browser related?
 * Was not able to add a listener to the button via the associated function below? Added 
 * inline in the html.
 *
 */

console.log("Up and running!");

var cards = [
		{
			rank: "queen",
			suit: "hearts",
			cardImage: "images/queen-of-hearts.png"
		},
		{
			rank: "queen",
			suit: "diamonds",
			cardImage: "images/queen-of-diamonds.png"
		},
		{
			rank: "king",
			suit: "hearts",
			cardImage: "images/king-of-hearts.png"
		},
		{
			rank: "king",
			suit: "diamonds",
			cardImage: "images/king-of-diamonds.png"
		}
	];

// node elements for each card that is in play
var cardsInPlay = [];

// Called when the user clicks an image.
var flipCard = function(){
	var cardIndex = this.getAttribute('data_id');
	console.log("User flipped: "+cards[cardIndex].rank+"\n"+cards[cardIndex].cardImage+"\n"+cards[cardIndex].suit);
	//Update the card image
	this.setAttribute('src',cards[cardIndex].cardImage);
	//console.log("Before setTimeout");
	//setTimeout(function(){ console.log("1 second delay"); }, 1000);
	cardsInPlay.push(this); 
	checkForMatch();
}

// Adds the cards to the DOM.
var createBoard = function() {
	for( var i=0; i < cards.length; i++ ) {
		var newListItem = document.createElement('img');
		newListItem.setAttribute('src',"images/back.png");
		newListItem.setAttribute('data_id', i);
		newListItem.addEventListener("click", flipCard);
		document.getElementById("game-board").appendChild(newListItem);
	}
}

var replayButtonClick = function() {
	console.log("Replay");
	//Clear cards in play
	for(i=0; i <= cardsInPlay.length; i++) {
		console.log("Card Cleared via shift: "+i);
		cardsInPlay.shift();
	}
	// reset images...since cardsInPlay are node elements could just reset those.
	// get a list of all the img nodes and update the image displayed.
	var newListItem = document.getElementsByTagName('img');
	for( var i=0; i < newListItem.length; i++ ) {
		newListItem[i].setAttribute('src',"images/back.png");
	}
}
// Why didn't this work?
var addReplayButtonListner = function() {
	document.getElementById("replayBtn").addEventListner("click", replayButtonClick);
}

var checkForMatch = function() {
	console.log("Inside checkForMatch");
	// Check for number of cards in play
	if(cardsInPlay.length === 2) {
		console.log("Cards In Play:Two");
		// Check to see if they are the same 
		var cardIndex1 = cardsInPlay[0].getAttribute('data_id');
		var cardIndex2 = cardsInPlay[1].getAttribute('data_id');
		if(cards[cardIndex1].rank === cards[cardIndex2].rank){
			console.log("Cards Match");
			alert("You found a match!");
		}
		else {
			console.log("Cards Do Not Match");
			alert("Sorry Try Again");
		}
	}
	else if(cardsInPlay.length === 1) {
		console.log("Cards In Play: One");
	}
	else if( cardsInPlay.length > 2) {
		console.log("User selected more than 2 cards, start again");
		// clean up the old selections
		replayButtonClick();
		// flip current selection
		var cardIndex = cardsInPlay[0].getAttribute('data_id');
		cardsInPlay[0].setAttribute('src',cards[cardIndex].cardImage);
	}
};

//addReplayButtonListner();
createBoard();