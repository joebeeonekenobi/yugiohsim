Card = function(password, cardNumber, player){

	this.name = cleanDatabase[password].name
	this.type = cleanDatabase[password].type
	this.subtype = cleanDatabase[password].subtype
	this.password = cleanDatabase[password].password
	this.level = cleanDatabase[password].level
	this.def = cleanDatabase[password].def
	this.atk = cleanDatabase[password].atk
	this.attribute = cleanDatabase[password].attribute
	this.cardNumber = cardNumber || newCardNumber++;
	this.imgSrc = server ? undefined : images[password].element.src;

	cards[JSON.stringify(this.cardNumber)] = this;

	this.zone = undefined;
	this.attackPosition = undefined;
	this.faceUp = undefined;
	this.positionChangedThisTurn = undefined; //This should be commented out in implementation for testing flexibility
	this.player = player;

	this.tribute = function(){
	//Specifically for tributing

		//Server method only - be assured!
		if(this.player == "player1"){

			myGraveyard.addToTop(this.zone.deAttachCard())
		}
		else{
			yourGraveyard.addToTop(this.zone.deAttachCard())
		}
	}

	this.finish = function(){
	//For when magic/trap has finished activating as is to be discarded to the gravy

		//Server method only - be assured!
		if(this.player == "player1"){

			myGraveyard.addToTop(this.zone.deAttachCard())
		}
		else{
			yourGraveyard.addToTop(this.zone.deAttachCard())
		}
	}

	this.toFaceDown = function(){
	//Cosmetic

		this.faceUp = false;
		//this.positionChangedThisTurn = true;

		if(!server){

			zone.displayBack();
		}
	}

	this.toFaceUp = function(){
	//Cosmetic

		this.faceUp = true;
		//this.positionChangedThisTurn = true;

		if(!server){

			zone.displayFront();
		}
	}

	this.toAttackPosition = function(){

		//this.positionChangedThisTurn = true;
		this.attackPosition = true;

		if(!server){

			this.zone.oimg.style("transform", "rotate(0deg)")
		}
	}

	this.toDefencePosition = function(){

		//this.positionChangedThisTurn = true;
		this.attackPosition = false;

		if(!server){

			this.zone.oimg.style("transform", "rotate(-90deg)")
		}
	}

	this.summonTo = function(zone){
		//Final, assumed checked and authorised Set function

		//Tidyup
		this.zone.hand.removeCard(this);
		zone.attachCard(this)

		//Logic
		this.toAttackPosition();
		this.toFaceUp();

	}

	this.setTo = function(zone){
		//Final, assumed checked and authorised Set function

		//Tidyup
		this.zone.hand.removeCard(this);
		zone.attachCard(this)

		//Logic
		this.toDefencePosition();
		this.toFaceDown();

	}

	this.activateMagicTo = function(zone){
		//Final, assumed checked and authorised activate magic/trap function

		//Tidyup
		this.zone.hand.removeCard(this);
		zone.attachCard(this)

		//Logic
		this.toAttackPosition();
		this.toFaceUp();
	}

	this.setMagicTo = function(zone){
		//Final, assumed checked and authorised Set magic/trap function

		//Tidyup
		this.zone.hand.removeCard(this);
		zone.attachCard(this)

		//Logic
		this.toAttackPosition();
		this.toFaceDown();
	}

	this.getTributeValueForSummoning = function(card){
		//returns how many tributes this card will act as if tributed to summon argument card
		//0 if cannot
		//1 is default

		return 1;
	}

	this.calculateTributeValueForThese = function(possibleTributes){
		//returns the value of the card array when considering calling this card

		var tributeValue = 0;

		for(var i=0; i<possibleTributes.length; i++){
			tributeValue += possibleTributes[i].getTributeValueForSummoning(this)
		}

		return tributeValue;
	}

	this.goesTributeRoute = function(){
		//Returns if this card can be summoned via the tribute route

		if(new RegExp("(MONSTER)|(EFFECT)").test(this.type)){
			if(this.tributesRequired() >= 1){

				return true;
			}
		}

		return false;
	}

	this.tributesSatisfies = function(cardArray){
	//Final authorisation in authenticating the tribute

		var tributeValue = this.calculateTributeValueForThese(cardArray);

		if(this.tributesRequired() == tributeValue){
			return true;
		}

		return false;
	}

	this.tributesRequired = function(){
	//calculates the number of tributes required, assuming the card is allowed to be tribute summoned

		if(this.level <= 4){

			return 0;
		}
		else if((this.level >= 5) && (this.level <= 6)){

			return 1;
		}
		else if((this.level >= 7) && (this.level <= 8)){

			return 2;
		}
		else if(this.level >= 10){

			return 3;
		}
	}

	this.playable = function(){

		//If this card is in the hand
		if(this.zone.location == FieldLocation.HAND){

			//If we have not summoned yet
			if(!turn.summonedYet){

				//If the tribute value can possibly be met
				if(this.goesTributeRoute()){

					if(this.tributesRequired() <= this.calculateTributeValueForThese(field.getPossibleTributesFor(this))){

						return true;
					}
				}
				else{

					return true;
				}
			}
			else if(new RegExp("MAGIC|TRAP").test(this.type)){

				return true;
			}
		}

		return false;
	}

	this.positionChangable = function(){

		if(this.positionChangedThisTurn || (!this.faceUp)){
			return false;
		}

		if(this.zone.location == FieldLocation.MONSTER){

			return true;
		}

		return false;
	}

	this.settable = function(){

		return this.playable();
	}

	this.summonable = function(){

		return this.playable();
	}

	this.magicActivatable = function(){

		return this.playable();
	}

	this.magicSettable= function(){

		return this.playable();
	}

	this.generateMoveOptions = function(hand){

		console.log("Generating Move Options")

		var options = [];

		if(this.playable()){

			if(this.goesTributeRoute()){
				
				options.push(new MoveOption(this, "Tribute"))
			}

			if(this.type == "MAGIC"){


				options.push(new MoveOption(this, "Magic"))
			}
			else if(this.type == "TRAP"){

				options.push(new MoveOption(this, "Trap"))
			}
			else{

				options.push(new MoveOption(this, "Call"))
			}
		}

		if(this.positionChangable()){

			options.push(new MoveOption(this, "Change"))
		}

		if(this.zone.location == FieldLocation.MONSTER){

			if(!this.faceUp){

				if(!this.positionChangedThisTurn){

					options.push(new MoveOption(this, "FlipSummon"))
				}
			}
		}

		if(this.zone.location == FieldLocation.MAGIC){

			if(!this.faceUp){
				if(this.type == "TRAP" || this.type == "MAGIC"){

					options.push(new MoveOption(this, "FlipActivate"))
				}
			}
		}

		options.push(new MoveOption(this, "Cancel"))

		return options;
	}

	this.generateStatDescription = function(){

		if(new RegExp("(MONSTER)|(EFFECT)").test(this.type)){

			return " Lv " + this.level + " " + this.attribute + " " + this.subtype + " (" + this.atk + " / " + this.def + ")"
		}
		else if(this.type == "MAGIC"){

		}
		else if(this.type == "TRAP"){

		}
		else if(this.type == "FUSION"){

		}
		else if(this.type == "RITUAL"){

		}

		return "";
	}

	return this;
}