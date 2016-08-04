Zone = function(name, oimg, clickFunction, location){

	this.name = name;
	this.location = location;

	if(!server){

		this.oimg = oimg;
		this.originalSrc = oimg.element.src
		this.clickFunction = clickFunction;
		this.oimg.onclick(clickFunction)
		this.oimg.zone = this;
	}

	this.zoneNumber = undefined;
	this.earmarked = undefined;
	this.card = undefined;


	this.removeFromPage = function(){
	//For Hand Mechanics

		if(!server){

			this.oimg.remove();
		}
	}

	this.appendToPage = function(){
	//For Hand Mechanics

		if(!server){

			this.oimg.appendTo(window.container)
		}

		return this;
	}

	this.isEmpty = function(){

		return this.card == undefined ? true : false;
	}

	this.attachCard = function(card){

		this.card = card;
		this.card.zone = this;
		this.card.location = this.location;

		if(!server){

			this.oimg.element.src = card.imgSrc;
		}
	}

	this.deAttachCard = function(){

		var card = this.card;

		if(this.card != undefined){

			this.card.location = undefined;
			this.card.zone = undefined;
			this.card = undefined;
		}
		
		if(!server){

			this.oimg.element.src = this.originalSrc;
		}

		return card;
	}

	this.displayBack = function(){

		if(!server){

			this.oimg.element.src = images["cardBackImage"].element.src;
		}
	}

	this.displayFront = function(){

		if(!server){

			this.oimg.element.src = this.card.imgSrc;
		}
	}

	this.reCalculateDimensions = function(){

		switch(this.name){

			case "myExtraZone" 			: this.x = geometry.middleCardZone0X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myBehindCardZoneY; break;
			case "myMagicZone0" 		: this.x = geometry.middleCardZone1X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myBehindCardZoneY; break;
			case "myMagicZone1" 		: this.x = geometry.middleCardZone2X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myBehindCardZoneY; break;
			case "myMagicZone2" 		: this.x = geometry.middleCardZone3X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myBehindCardZoneY; break;
			case "myMagicZone3" 		: this.x = geometry.middleCardZone4X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myBehindCardZoneY; break;
			case "myMagicZone4" 		: this.x = geometry.middleCardZone5X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myBehindCardZoneY; break;
			case "myDeckZone" 			: this.x = geometry.middleCardZone6X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myBehindCardZoneY; break;

			case "myFieldZone" 			: this.x = geometry.middleCardZone0X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myForwardCardZoneY; break;
			case "myMonsterZone0" 		: this.x = geometry.middleCardZone1X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myForwardCardZoneY; break;
			case "myMonsterZone1" 		: this.x = geometry.middleCardZone2X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myForwardCardZoneY; break;
			case "myMonsterZone2" 		: this.x = geometry.middleCardZone3X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myForwardCardZoneY; break;
			case "myMonsterZone3" 		: this.x = geometry.middleCardZone4X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myForwardCardZoneY; break;
			case "myMonsterZone4" 		: this.x = geometry.middleCardZone5X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myForwardCardZoneY; break;
			case "myGraveyardZone" 		: this.x = geometry.middleCardZone6X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.myForwardCardZoneY; break;

			case "yourGraveyardZone" 	: this.x = geometry.middleCardZone0X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourForwardCardZoneY; break;
			case "yourMonsterZone0" 	: this.x = geometry.middleCardZone1X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourForwardCardZoneY; break;
			case "yourMonsterZone1" 	: this.x = geometry.middleCardZone2X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourForwardCardZoneY; break;
			case "yourMonsterZone2" 	: this.x = geometry.middleCardZone3X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourForwardCardZoneY; break;
			case "yourMonsterZone3" 	: this.x = geometry.middleCardZone4X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourForwardCardZoneY; break;
			case "yourMonsterZone4" 	: this.x = geometry.middleCardZone5X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourForwardCardZoneY; break;
			case "yourFieldZone" 		: this.x = geometry.middleCardZone6X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourForwardCardZoneY; break;

			case "yourDeckZone" 		: this.x = geometry.middleCardZone0X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourBehindCardZoneY; break;
			case "yourMagicZone0" 		: this.x = geometry.middleCardZone1X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourBehindCardZoneY; break;
			case "yourMagicZone1" 		: this.x = geometry.middleCardZone2X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourBehindCardZoneY; break;
			case "yourMagicZone2" 		: this.x = geometry.middleCardZone3X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourBehindCardZoneY; break;
			case "yourMagicZone3" 		: this.x = geometry.middleCardZone4X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourBehindCardZoneY; break;
			case "yourMagicZone4" 		: this.x = geometry.middleCardZone5X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourBehindCardZoneY; break;
			case "yourExtraZone" 		: this.x = geometry.middleCardZone6X; this.width = geometry.zoneSpaceX; this.height = geometry.zoneSpaceY; this.y = geometry.yourBehindCardZoneY; break;

			default : 

				if(new RegExp("myHandZone[0-9]+").test(this.name)){

					this.x = geometry.getHandXForN(this.zoneNumber+1, myHand.size()); 
					this.y = geometry.myHandCardZoneY;
					this.width = geometry.zoneSpaceX; 
					this.height = geometry.zoneSpaceY;
					this.oimg.style("clip", "rect(0, "+(geometry.zoneSpaceX - geometry.getHandHangover(this.zoneNumber+1, myHand.size()))+"px, "+this.height+"px, 0)")
				}
				else if(new RegExp("yourHandZone[0-9]+").test(this.name)){

					this.x = geometry.getHandXForN(this.zoneNumber+1, yourHand.size()); 
					this.y = geometry.yourHandCardZoneY;
					this.width = geometry.zoneSpaceX; 
					this.height = geometry.zoneSpaceY; 
					this.oimg.style("clip", "rect(0, "+(geometry.zoneSpaceX - geometry.getHandHangover(this.zoneNumber+1, yourHand.size()))+"px, "+this.height+"px, 0)")
				}
		}

		this.oimg.left(this.x)
		this.oimg.bottom(this.y)
		this.oimg.width(this.width)
		this.oimg.height(this.height)
	}

	return this;
}



setupZoneObjects = function(){

	zones = {
		my : {
			monster : [
				new Zone("myMonsterZone0", server ? undefined : new OIMG("myMonsterZone0", images.monsterCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_myMonsterZone, FieldLocation.MONSTER).appendToPage(),
				new Zone("myMonsterZone1", server ? undefined : new OIMG("myMonsterZone1", images.monsterCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_myMonsterZone, FieldLocation.MONSTER).appendToPage(),
				new Zone("myMonsterZone2", server ? undefined : new OIMG("myMonsterZone2", images.monsterCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_myMonsterZone, FieldLocation.MONSTER).appendToPage(),
				new Zone("myMonsterZone3", server ? undefined : new OIMG("myMonsterZone3", images.monsterCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_myMonsterZone, FieldLocation.MONSTER).appendToPage(),
				new Zone("myMonsterZone4", server ? undefined : new OIMG("myMonsterZone4", images.monsterCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_myMonsterZone, FieldLocation.MONSTER).appendToPage(),
			],
			magic : [
				new Zone("myMagicZone0", server ? undefined : new OIMG("myMagicZone0", images.magicCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_myMagicZone, FieldLocation.MAGIC).appendToPage(),
				new Zone("myMagicZone1", server ? undefined : new OIMG("myMagicZone1", images.magicCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_myMagicZone, FieldLocation.MAGIC).appendToPage(),
				new Zone("myMagicZone2", server ? undefined : new OIMG("myMagicZone2", images.magicCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_myMagicZone, FieldLocation.MAGIC).appendToPage(),
				new Zone("myMagicZone3", server ? undefined : new OIMG("myMagicZone3", images.magicCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_myMagicZone, FieldLocation.MAGIC).appendToPage(),
				new Zone("myMagicZone4", server ? undefined : new OIMG("myMagicZone4", images.magicCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_myMagicZone, FieldLocation.MAGIC).appendToPage(),
			],
			field : 	new Zone("myFieldZone", server ? undefined : new OIMG("myFieldZone", images.fieldCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.FIELD).appendToPage(),
			graveyard : new Zone("myGraveyardZone", server ? undefined : new OIMG("myGraveyardZone", images.graveyardCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.GRAVEYARD).appendToPage(),
			deck : 		new Zone("myDeckZone", server ? undefined : new OIMG("myDeckZone", images.deckCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_myDeckZone, FieldLocation.DECK).appendToPage(),
			extra : 	new Zone("myExtraZone", server ? undefined : new OIMG("myExtraZone", images.extraCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.EXTRA).appendToPage(),
			hand : [],
		},
		your : {
			monster : [
				new Zone("yourMonsterZone0", server ? undefined : new OIMG("yourMonsterZone0", images.monsterCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.MONSTER).appendToPage(),
				new Zone("yourMonsterZone1", server ? undefined : new OIMG("yourMonsterZone1", images.monsterCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.MONSTER).appendToPage(),
				new Zone("yourMonsterZone2", server ? undefined : new OIMG("yourMonsterZone2", images.monsterCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.MONSTER).appendToPage(),
				new Zone("yourMonsterZone3", server ? undefined : new OIMG("yourMonsterZone3", images.monsterCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.MONSTER).appendToPage(),
				new Zone("yourMonsterZone4", server ? undefined : new OIMG("yourMonsterZone4", images.monsterCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.MONSTER).appendToPage(),
			],
			magic : [
				new Zone("yourMagicZone0", server ? undefined : new OIMG("yourMagicZone0", images.magicCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.MAGIC).appendToPage(),
				new Zone("yourMagicZone1", server ? undefined : new OIMG("yourMagicZone1", images.magicCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.MAGIC).appendToPage(),
				new Zone("yourMagicZone2", server ? undefined : new OIMG("yourMagicZone2", images.magicCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.MAGIC).appendToPage(),
				new Zone("yourMagicZone3", server ? undefined : new OIMG("yourMagicZone3", images.magicCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.MAGIC).appendToPage(),
				new Zone("yourMagicZone4", server ? undefined : new OIMG("yourMagicZone4", images.magicCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.MAGIC).appendToPage(),
			],
			field : 	new Zone("yourFieldZone", server ? undefined : new OIMG("yourFieldZone", images.fieldCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.FIELD).appendToPage(),
			graveyard : new Zone("yourGraveyardZone", server ? undefined : new OIMG("yourGraveyardZone", images.graveyardCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.GRAVEYARD).appendToPage(),
			deck : 		new Zone("yourDeckZone", server ? undefined : new OIMG("yourDeckZone", images.deckCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_yourDeckZone, FieldLocation.DECK).appendToPage(),
			extra : 	new Zone("yourExtraZone", server ? undefined : new OIMG("yourExtraZone", images.extraCardZoneImage.element.src).class("zoneImage"), server ? undefined : click_blankZone, FieldLocation.EXTRA).appendToPage(),
			hand : [],
		}
	}

	zoneIndex = {

		"myMonsterZone0" : zones.my.monster[0],
		"myMonsterZone1" : zones.my.monster[1],
		"myMonsterZone2" : zones.my.monster[2],
		"myMonsterZone3" : zones.my.monster[3],
		"myMonsterZone4" : zones.my.monster[4],
		"myMagicZone0" : zones.my.magic[0],
		"myMagicZone1" : zones.my.magic[1],
		"myMagicZone2" : zones.my.magic[2],
		"myMagicZone3" : zones.my.magic[3],
		"myMagicZone4" : zones.my.magic[4],
		"myFieldZone" : zones.my.field,
		"myGraveyardZone" : zones.my.graveyard,
		"myDeckZone" : zones.my.deck,
		"myExtraZone" : zones.my.extra,
		"yourMonsterZone0" : zones.your.monster[0],
		"yourMonsterZone1" : zones.your.monster[1],
		"yourMonsterZone2" : zones.your.monster[2],
		"yourMonsterZone3" : zones.your.monster[3],
		"yourMonsterZone4" : zones.your.monster[4],
		"yourMagicZone0" : zones.your.magic[0],
		"yourMagicZone1" : zones.your.magic[1],
		"yourMagicZone2" : zones.your.magic[2],
		"yourMagicZone3" : zones.your.magic[3],
		"yourMagicZone4" : zones.your.magic[4],
		"yourFieldZone" : zones.your.field,
		"yourGraveyardZone" : zones.your.graveyard,
		"yourDeckZone" : zones.your.deck,
		"yourExtraZone" : zones.your.extra,
	}

	getAllMyZones = function(){

		return [

			zones.my.monster[0],
			zones.my.monster[1],
			zones.my.monster[2],
			zones.my.monster[3],
			zones.my.monster[4],
			zones.my.field,
			zones.my.graveyard,
			zones.my.deck,
			zones.my.extra,
			zones.my.magic[0],
			zones.my.magic[1],
			zones.my.magic[2],
			zones.my.magic[3],
			zones.my.magic[4]

		].concat(zones.my.hand);
	}


	getAllYourZones = function(){

		return [

			zones.your.monster[0],
			zones.your.monster[1],
			zones.your.monster[2],
			zones.your.monster[3],
			zones.your.monster[4],
			zones.your.field,
			zones.your.graveyard,
			zones.your.deck,
			zones.your.extra,
			zones.your.magic[0],
			zones.your.magic[1],
			zones.your.magic[2],
			zones.your.magic[3],
			zones.your.magic[4],
			
		].concat(zones.your.hand);
	}

	getAllZones = function(){

		return getAllMyZones().concat(getAllYourZones())
	}

}