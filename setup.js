logicalSetup = function(){

	loadDatabase();

	loadMyDeckList();

	if(!server){

		loadImages();
		pageSetup();
	}

	setupZoneObjects();

	if(!server){
		
		resizeSetup();
		reDrawAll();
	}

	if(server){
		
		setupGame();
	}

}


setupGame = function(){

	console.log("Setting up Game")

	resetState();

	myDeck.setCards(myDeckList)
	myDeck.shuffle();
	yourDeck.setCards(myDeckList)
	yourDeck.shuffle();

	turn = 0;
	phase = "draw"
	playerTurn = "me"
		
	myHand.addCard(myDeck.draw())
	myHand.addCard(myDeck.draw())
	myHand.addCard(myDeck.draw())
	myHand.addCard(myDeck.draw())
	myHand.addCard(myDeck.draw())

	yourHand.addCard(yourDeck.draw())
	yourHand.addCard(yourDeck.draw())
	yourHand.addCard(yourDeck.draw())
	yourHand.addCard(yourDeck.draw())
	yourHand.addCard(yourDeck.draw())

	commandStack = new CommandStack();
}







iLose = function(){

	console.log("I have lost")
}

iWin = function(){

	console.log("I have won")

}

iDraw = function(){

	console.log("I have drawn")

}