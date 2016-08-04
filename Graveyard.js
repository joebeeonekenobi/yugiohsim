Graveyard = function(zone, player){

	this.cards = [];
	this.zone = zone;
	this.zone.feature = this;
	this.player = player;

	this.shuffle = function(){

		var newArrangement = [];

		while(this.cards.length != 0){
			newArrangement.push(this.cards.splice(Math.round(Math.random()*100) % this.cards.length, 1)[0]);
		}

		this.cards = newArrangement;
	}

	this.addToTop = function(card){

		card.zone = this.zone;
		card.location = FieldLocation.GRAVEYARD
		this.cards.unshift(card);
		this.reDisplayTopCard()
	}

	this.addToBottom = function(card){

		card.zone = this.zone;
		card.location = FieldLocation.GRAVEYARD
		this.cards.push(card);

		if(this.cards.length == 1){

			this.reDisplayTopCard()
		}
	}

	this.reDisplayTopCard = function(){

		this.zone.deAttachCard();

		if(this.cards.length > 0){

			this.zone.attachCard(this.cards[this.cards.length-1])
		}
	}

	return this;
}