Hand = function(handName, player){

	this.handName = handName;
	this.player = player;
	zones[this.handName].hand = this.zones = [];
	this.handLimit = 6;

	this.size = function(){

		return this.zones.length;
	}

	this.getCards = function(){

		return this.zones.map(
			function(zone){return zone.card;}
		);
	}

	this.addCard = function(card){

		if(card != undefined){

			var newZone = new Zone(
				this.handName+"HandZone"+this.zones.length, 															// : "cardBackImage"
				server ? undefined : new OIMG(this.handName+"HandZone"+this.zones.length, images[ (this.handName == "my") ? card.password : card.password].element.src).class("zoneImage"), 
				server ? undefined : this.handName == "my" ? click_myHandZone : click_yourHandZone,
				FieldLocation.HAND
			).appendToPage()

			newZone.hand = this;

			newZone.zoneNumber = this.zones.length

			newZone.card = card;

			card.zone = newZone

			this.zones.push(newZone)

			reDrawAll();
		}
	}

	this.removeCard = function(card){

		var removed = false;
		var zone = undefined;

		for(var i=0; i<this.zones.length; i++){

			if(this.zones[i].card === card){

				removed = true;

				//Remove the zone from the hand
				zone = this.zones.splice(i, 1);

				//Remove the oimg OHTML
				zone[0].removeFromPage();
			}
		}

		if(!removed){

			console.log(card)
			throw new Error("Card not removed from hand; Card does not exist in hand: "+card.name)
		}

		for(var i=0; i<this.zones.length; i++){

			this.zones[i].zoneNumber = i;
			this.zones[i].name = this.handName+"HandZone"+i;

			if(!server){

				this.zones[i].oimg.id(this.handName+"HandZone"+i)
			}

		}

		reDrawAll();
	}

	return this;
}