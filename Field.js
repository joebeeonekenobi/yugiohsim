FieldLocation = {

	MONSTER : "MONSTER",
	MAGIC : "MAGIC",
	HAND : "HAND",
	GRAVEYARD : "GRAVEYARD",
	DECK : "DECK",
	RP : "RP",
	RG : "RG",
	EXTRA : "EXTRA",
	FIELD : "FIELD",
}


Field = function(){

	//returns whether or not the opponent can "potentially" retaliate to my command
	this.canOpponentRetaliate = function(command){

		//return true as quickly as possible

		if(command.hasTag("summon")){

			//1: if they have face down magic and trap cards, they may be able to retaliate

			var oppMaj = getYourMagicAndTrapCards();

			//Get the face down cards
			oppMaj.reduce(function(card){

				//if a card is face down return true
				return !card.faceUp;
			})

			if(oppMaj.length > 0){
				return true;
			}
		}



		return false;
	}

	this.unEarmarkAll = function(){

		for(var i=0; i<zones.my.monster.length; i++){

			if(zones.my.monster[i].earmarked){

				zones.my.monster[i].earmarked = false;
			}
		}
	}

	this.getMyEarmarkedCards = function(){

		var temp = [];

		for(var i=0; i<zones.my.monster.length; i++){

			if(zones.my.monster[i].earmarked){

				temp.push(zones.my.monster[i].card)
			}
		}

		return temp;
	}

	this.getPossibleTributesFor = function(card){

		var fieldCards = this.getMyMonsterCards();
		var possibleTributes = [];

		for(var i=0; i<fieldCards.length; i++){
			if(fieldCards[i].getTributeValueForSummoning(card) > 0){
				possibleTributes.push(fieldCards[i])
			}
		}

		return possibleTributes;
	}

	this.getMyMonsterCards = function(){

		var temp = [];

		for(var i=0; i<zones.my.monster.length; i++){

			if(zones.my.monster[i].card != undefined){

				temp.push(zones.my.monster[i].card)
			}
		}

		return temp;
	}

	this.getMyMagicAndTrapCards = function(){

		var temp = [];

		for(var i=0; i<zones.my.magic.length; i++){

			if(zones.my.magic[i].card != undefined){

				temp.push(zones.my.magic[i].card)
			}
		}

		return temp;
	}

	this.getYourMagicAndTrapCards = function(){

		var temp = [];

		for(var i=0; i<zones.your.magic.length; i++){

			if(zones.your.magic[i].card != undefined){

				temp.push(zones.your.magic[i].card)
			}
		}

		return temp;
	}

	return this;
}