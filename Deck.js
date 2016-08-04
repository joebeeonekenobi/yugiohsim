Deck = function(zone, player){

	this.cards = [];
	this.leftToDraw = 55;
	this.haveToDraw = true;
	this.allowedToDraw = 1;
	this.zone = zone;
	this.zone.feature = this;
	this.player = player

	this.shuffle = function(){

		var newArrangement = [];

		while(this.cards.length != 0){
			newArrangement.push(this.cards.splice(Math.round(Math.random()*100) % this.cards.length, 1)[0]);
		}

		this.cards = newArrangement;
	}

	this.draw = function(){

		this.leftToDraw--;
		this.allowedToDraw--;

		return this.cards.pop();
	}

	this.addToTop = function(card){

		card.zone = this.zone;
		card.location = FieldLocation.DECK
		this.cards.push(card)
	}

	this.addToBottom = function(card){

		card.zone = this.zone;
		card.location = FieldLocation.DECK
		this.cards.unshift(card)
	}

	this.setCards = function(passwordList){

		this.cards = [];

		for(var i=0; i<passwordList.length; i++){

			var card = new Card(passwordList[i], undefined, this.player);
			
			this.addToBottom(card)
		}
	}

	return this;
}