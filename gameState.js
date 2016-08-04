resetState = function(){

	if(!server){

		resetStateLayout();
	}

	resetStateLogic();
}

resetStateLayout = function(){
	
	//Remove OHTML references
	container.removeChildren();

	setupZoneObjects();

	resizeSetup();

	reDrawAll();
}

resetStateLogic = function(){

	newCardNumber = 0;

	//Index for all created cards per game, index by card Number
	cards = {};

	responseRequired = false;

	var assignedName = false;

	if(!server){
		assignedName = serverName;
	}

	//Object Creation
	myHand = new Hand("my", assignedName ? assignedName : "player1");
	yourHand = new Hand("your", assignedName ? assignedName : "player2");

	myLifePoints = 8000;
	yourLifePoints = 8000;

	field = new Field();

	myDeck = new Deck(zones.my.deck, assignedName ? assignedName : "player1")
	yourDeck = new Deck(zones.your.deck, assignedName ? assignedName : "player2")

	myGraveyard = new Graveyard(zones.my.graveyard, assignedName ? assignedName : "player1");
	yourGraveyard = new Graveyard(zones.your.graveyard, assignedName ? assignedName : "player2");
}

reverseState = function(json){
	//my
	for(var i=0; i<json.my.monster.length; i++){
		json.my.monster[i].zoneName = json.my.monster[i].zoneName.replace("my", "your")
	}

	for(var i=0; i<json.my.magic.length; i++){
		json.my.magic[i].zoneName = json.my.magic[i].zoneName.replace("my", "your")
	}

	for(var i=0; i<json.my.deck.length; i++){
		json.my.deck[i].zoneName = json.my.deck[i].zoneName.replace("my", "your")
	}

	for(var i=0; i<json.my.graveyard.length; i++){
		json.my.graveyard[i].zoneName = json.my.graveyard[i].zoneName.replace("my", "your")
	}

	for(var i=0; i<json.my.extra.length; i++){
		json.my.extra[i].zoneName = json.my.extra[i].zoneName.replace("my", "your")
	}

	for(var i=0; i<json.my.hand.length; i++){
		json.my.hand[i].zoneName = json.my.hand[i].zoneName.replace("my", "your")
	}

	//your
	for(var i=0; i<json.your.monster.length; i++){
		json.your.monster[i].zoneName = json.your.monster[i].zoneName.replace("your", "my")
	}

	for(var i=0; i<json.your.magic.length; i++){
		json.your.magic[i].zoneName = json.your.magic[i].zoneName.replace("your", "my")
	}

	for(var i=0; i<json.your.deck.length; i++){
		json.your.deck[i].zoneName = json.your.deck[i].zoneName.replace("your", "my")
	}

	for(var i=0; i<json.your.graveyard.length; i++){
		json.your.graveyard[i].zoneName = json.your.graveyard[i].zoneName.replace("your", "my")
	}

	for(var i=0; i<json.your.extra.length; i++){
		json.your.extra[i].zoneName = json.your.extra[i].zoneName.replace("your", "my")
	}

	for(var i=0; i<json.your.hand.length; i++){
		json.your.hand[i].zoneName = json.your.hand[i].zoneName.replace("your", "my")
	}

/*
*/
	json.temp = json.my;
	json.my = json.your;
	json.your = json.temp;
	delete json.temp;


	return json;
}

exportState = function(){

	var card;

	var json = {

		my : {

			monster : [],
			magic : [],
			deck : [],
			graveyard : [],
			extra : [],
			field : undefined,
			hand : [],
			lifePoints : myLifePoints,
		},
		your : {

			monster:[],
			magic:[],
			deck:[],
			graveyard:[],
			extra:[],
			field:undefined,
			hand:[],
			lifePoints : yourLifePoints,
		},
		turn : turn,
		phase : phase,
		playerTurn : undefined,
		responseRequired : responseRequired,
	}

	var getDetails = function(card, zoneName){

		return {

			"password" : card.password,
			"zoneName" : zoneName,
			"attackPosition" : card.attackPosition,
			"faceUp" : card.faceUp,
			"positionChangedThisTurn" : card.positionChangedThisTurn,
			"cardNumber" : card.cardNumber,
			"player" : card.player,
		}
	}

	//Monster Zone Cards
	for(var i=0; i<zones.my.monster.length; i++){

		card = zones.my.monster[i].card

		if(card != undefined){
			json.my.monster.push(getDetails(card, card.zone.name))
		}
	}
	for(var i=0; i<zones.your.monster.length; i++){

		card = zones.your.monster[i].card

		if(card != undefined){
			json.your.monster.push(getDetails(card, card.zone.name))
		}
	}

	//Magic Zone Cards
	for(var i=0; i<zones.my.magic.length; i++){

		card = zones.my.magic[i].card

		if(card != undefined){
			json.my.magic.push(getDetails(card, card.zone.name))
		}
	}
	for(var i=0; i<zones.your.magic.length; i++){

		card = zones.your.magic[i].card

		if(card != undefined){
			json.your.magic.push(getDetails(card, card.zone.name))
		}
	}

	//Field Zone Card
	json.my.field = zones.my.field.card == undefined ? undefined : zones.my.field.card.password
	json.your.field = zones.your.field.card == undefined ? undefined : zones.your.field.card.password

	//Hand Zone Cards
	for(var i=0; i<myHand.zones.length; i++){

		card = myHand.zones[i].card

		if(card != undefined){
			json.my.hand.push(getDetails(card, card.zone.name))
		}
	}
	for(var i=0; i<yourHand.zones.length; i++){

		card = yourHand.zones[i].card

		if(card != undefined){
			json.your.hand.push(getDetails(card, card.zone.name))
		}
	}

	//Deck Zone Cards
	for(var i=0; i<myDeck.cards.length; i++){

		card = myDeck.cards[i]
		json.my.deck.push(getDetails(card, card.zone.name))
	}
	for(var i=0; i<yourDeck.cards.length; i++){

		card = yourDeck.cards[i]
		json.your.deck.push(getDetails(card, card.zone.name))

	}

	//Graveyard Zone Cards
	for(var i=0; i<myGraveyard.cards.length; i++){

		card = myGraveyard.cards[i]
		json.my.graveyard.push(getDetails(card, card.zone.name))
	}
	for(var i=0; i<yourGraveyard.cards.length; i++){

		card = yourGraveyard.cards[i]
		json.your.graveyard.push(getDetails(card, card.zone.name))
	}

	return json;

}

importState = function(json){

	resetState();

	myLifePoints = json.my.lifePoints
	yourLifePoints = json.your.lifePoints
	turn = json.turn;
	phase = json.phase;
	player = json.player;

	if(json.responseRequired){

		responseRequired = importCommand(json.responseRequired);
	}
	else{

		responseRequired = false;
	}

	var card, zone;

	//Monster Zone Cards
	for(var i=0; i<json.my.monster.length; i++){

		card = new Card(json.my.monster[i].password, json.my.monster[i].cardNumber, json.my.monster[i].player);

		card.attackPosition = json.my.monster[i].attackPosition;
		card.faceUp = json.my.monster[i].faceUp;

		zone = zoneIndex[json.my.monster[i].zoneName];

		//Attach the Card
		zone.attachCard(card);

		if(!card.faceUp){
			zone.displayBack();
		}

		if(!card.attackPosition){
			card.toDefencePosition();
		}

		card.positionChangedThisTurn = json.my.monster[i].positionChangedThisTurn;
	}
	for(var i=0; i<json.your.monster.length; i++){

		card = new Card(json.your.monster[i].password, json.your.monster[i].cardNumber, json.your.monster[i].player);

		card.attackPosition = json.your.monster[i].attackPosition;
		card.faceUp = json.your.monster[i].faceUp;

		zone = zoneIndex[json.your.monster[i].zoneName];

		//Attach the Card
		zone.attachCard(card);

		if(!card.faceUp){
			zone.displayBack();
		}

		if(!card.attackPosition){
			card.toDefencePosition();
		}

		card.positionChangedThisTurn = json.your.monster[i].positionChangedThisTurn;
	}

	//Magic Zone Cards
	for(var i=0; i<json.my.magic.length; i++){

		card = new Card(json.my.magic[i].password, json.my.magic[i].cardNumber, json.my.magic[i].player);

		card.attackPosition = json.my.magic[i].attackPosition;
		card.faceUp = json.my.magic[i].faceUp;

		zone = zoneIndex[json.my.magic[i].zoneName];

		//Attach the Card
		zone.attachCard(card);

		if(!card.faceUp){
			zone.displayBack();
		}

		if(!card.attackPosition){
			card.toDefencePosition();
		}

		card.positionChangedThisTurn = json.my.magic[i].positionChangedThisTurn;
	}
	for(var i=0; i<json.your.magic.length; i++){

		card = new Card(json.your.magic[i].password, json.your.magic[i].cardNumber, json.your.magic[i].player);

		card.attackPosition = json.your.magic[i].attackPosition;
		card.faceUp = json.your.magic[i].faceUp;

		zone = zoneIndex[json.your.magic[i].zoneName];

		//Attach the Card
		zone.attachCard(card);

		if(!card.faceUp){
			zone.displayBack();
		}

		if(!card.attackPosition){
			card.toDefencePosition();
		}

		card.positionChangedThisTurn = json.your.magic[i].positionChangedThisTurn;
	}

	//Field Zone Card
	if(json.my.field != undefined){

		zone = zones.my.field;
		card = new Card(json.my.field.password, json.my.field.cardNumber, json.my.field.player)

		zone.attachCard(card);

		if(!card.faceUp){
			zone.displayBack();
		}

		if(!card.attackPosition){
			card.toDefencePosition();
		}

		card.positionChangedThisTurn = json.my.field.positionChangedThisTurn;
	}
	if(json.your.field != undefined){

		zone = zones.your.field;
		card = new Card(json.your.field.password, json.your.field[i].cardNumber, json.your.field.player)

		zone.attachCard(card);

		if(!card.faceUp){
			zone.displayBack();
		}

		if(!card.attackPosition){
			card.toDefencePosition();
		}

		card.positionChangedThisTurn = json.your.field.positionChangedThisTurn;
	}

	//Hand Zone Cards
	for(var i=0; i<json.my.hand.length; i++){

		card = new Card(json.my.hand[i].password, json.my.hand[i].cardNumber, json.my.hand[i].player);
		myHand.addCard(card);
	}
	for(var i=0; i<json.your.hand.length; i++){

		card = new Card(json.your.hand[i].password, json.your.hand[i].cardNumber, json.your.hand[i].player);
		yourHand.addCard(card);
	}

	//Deck Zone Cards
	for(var i=0; i<json.my.deck.length; i++){

		card = new Card(json.my.deck[i].password, json.my.deck[i].cardNumber, json.my.deck[i].player);
		myDeck.addToBottom(card);
	}
	for(var i=0; i<json.your.deck.length; i++){

		card = new Card(json.your.deck[i].password, json.your.deck[i].cardNumber, json.your.deck[i].player);
		yourDeck.addToBottom(card);
	}

	//Graveyard Zone Cards
	for(var i=0; i<json.my.graveyard.length; i++){

		card = new Card(json.my.graveyard[i].password, json.my.graveyard[i].cardNumber, json.my.graveyard[i].player);
		myGraveyard.addToBottom(card);
	}
	for(var i=0; i<json.your.graveyard.length; i++){

		card = new Card(json.your.graveyard[i].password, json.your.graveyard[i].cardNumber, json.your.graveyard[i].player);
		yourGraveyard.addToBottom(card);
	}

}

testState = {"my":{"monster":[{"password":"28279543","zoneName":"myMonsterZone2","attackPosition":false,"faceUp":false,"positionChangedThisTurn":true}],"magic":[],"deck":[{"password":"06368038","zoneName":"myDeckZone"},{"password":"49218300","zoneName":"myDeckZone"},{"password":"41218256","zoneName":"myDeckZone"},{"password":"17814387","zoneName":"myDeckZone"},{"password":"04031928","zoneName":"myDeckZone"},{"password":"51482758","zoneName":"myDeckZone"},{"password":"44209392","zoneName":"myDeckZone"},{"password":"54652250","zoneName":"myDeckZone"},{"password":"50045299","zoneName":"myDeckZone"},{"password":"85602018","zoneName":"myDeckZone"},{"password":"72892473","zoneName":"myDeckZone"},{"password":"13723605","zoneName":"myDeckZone"},{"password":"66788016","zoneName":"myDeckZone"},{"password":"80604091","zoneName":"myDeckZone"},{"password":"15025844","zoneName":"myDeckZone"},{"password":"12607053","zoneName":"myDeckZone"},{"password":"83764718","zoneName":"myDeckZone"},{"password":"04206964","zoneName":"myDeckZone"},{"password":"37120512","zoneName":"myDeckZone"},{"password":"87557188","zoneName":"myDeckZone"},{"password":"46474915","zoneName":"myDeckZone"},{"password":"40374923","zoneName":"myDeckZone"},{"password":"32452818","zoneName":"myDeckZone"},{"password":"91595718","zoneName":"myDeckZone"},{"password":"66672569","zoneName":"myDeckZone"},{"password":"50930991","zoneName":"myDeckZone"},{"password":"93221206","zoneName":"myDeckZone"},{"password":"77622396","zoneName":"myDeckZone"},{"password":"53129443","zoneName":"myDeckZone"},{"password":"13039848","zoneName":"myDeckZone"},{"password":"86325596","zoneName":"myDeckZone"},{"password":"46986414","zoneName":"myDeckZone"},{"password":"68005187","zoneName":"myDeckZone"},{"password":"70781052","zoneName":"myDeckZone"},{"password":"47060154","zoneName":"myDeckZone"},{"password":"84257639","zoneName":"myDeckZone"},{"password":"13945283","zoneName":"myDeckZone"},{"password":"87796900","zoneName":"myDeckZone"},{"password":"19159413","zoneName":"myDeckZone"},{"password":"16972957","zoneName":"myDeckZone"},{"password":"59197169","zoneName":"myDeckZone"},{"password":"13429800","zoneName":"myDeckZone"},{"password":"46461247","zoneName":"myDeckZone"},{"password":"36304921","zoneName":"myDeckZone"}],"graveyard":[{"password":"90357090","zoneName":"myGraveyardZone","attackPosition":true,"faceUp":true,"positionChangedThisTurn":true}],"extra":[],"hand":[{"password":"91152256","zoneName":"myHandZone0"},{"password":"48365709","zoneName":"myHandZone1"},{"password":"83887306","zoneName":"myHandZone2"},{"password":"41392891","zoneName":"myHandZone3"}],"lifePoints":8000},"your":{"monster":[],"magic":[],"deck":[{"password":"72892473","zoneName":"yourDeckZone"},{"password":"13945283","zoneName":"yourDeckZone"},{"password":"51482758","zoneName":"yourDeckZone"},{"password":"49218300","zoneName":"yourDeckZone"},{"password":"84257639","zoneName":"yourDeckZone"},{"password":"41392891","zoneName":"yourDeckZone"},{"password":"17814387","zoneName":"yourDeckZone"},{"password":"41218256","zoneName":"yourDeckZone"},{"password":"36304921","zoneName":"yourDeckZone"},{"password":"13039848","zoneName":"yourDeckZone"},{"password":"91595718","zoneName":"yourDeckZone"},{"password":"66672569","zoneName":"yourDeckZone"},{"password":"59197169","zoneName":"yourDeckZone"},{"password":"77622396","zoneName":"yourDeckZone"},{"password":"40374923","zoneName":"yourDeckZone"},{"password":"90357090","zoneName":"yourDeckZone"},{"password":"16972957","zoneName":"yourDeckZone"},{"password":"93221206","zoneName":"yourDeckZone"},{"password":"50930991","zoneName":"yourDeckZone"},{"password":"50045299","zoneName":"yourDeckZone"},{"password":"46474915","zoneName":"yourDeckZone"},{"password":"87557188","zoneName":"yourDeckZone"},{"password":"80604091","zoneName":"yourDeckZone"},{"password":"44209392","zoneName":"yourDeckZone"},{"password":"32452818","zoneName":"yourDeckZone"},{"password":"86325596","zoneName":"yourDeckZone"},{"password":"15025844","zoneName":"yourDeckZone"},{"password":"13723605","zoneName":"yourDeckZone"},{"password":"19159413","zoneName":"yourDeckZone"},{"password":"12607053","zoneName":"yourDeckZone"},{"password":"06368038","zoneName":"yourDeckZone"},{"password":"53129443","zoneName":"yourDeckZone"},{"password":"46461247","zoneName":"yourDeckZone"},{"password":"70781052","zoneName":"yourDeckZone"},{"password":"37120512","zoneName":"yourDeckZone"},{"password":"91152256","zoneName":"yourDeckZone"},{"password":"28279543","zoneName":"yourDeckZone"},{"password":"48365709","zoneName":"yourDeckZone"},{"password":"46986414","zoneName":"yourDeckZone"},{"password":"66788016","zoneName":"yourDeckZone"},{"password":"04031928","zoneName":"yourDeckZone"},{"password":"04206964","zoneName":"yourDeckZone"},{"password":"83764718","zoneName":"yourDeckZone"},{"password":"87796900","zoneName":"yourDeckZone"},{"password":"85602018","zoneName":"yourDeckZone"}],"graveyard":[],"extra":[],"hand":[{"password":"47060154","zoneName":"yourHandZone0"},{"password":"83887306","zoneName":"yourHandZone1"},{"password":"13429800","zoneName":"yourHandZone2"},{"password":"54652250","zoneName":"yourHandZone3"},{"password":"68005187","zoneName":"yourHandZone4"}],"lifePoints":8000}}