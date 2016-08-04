CommandStack = function(){

	this.stack = [];

	this.push = function(command){

		console.log("Pushing new Command onto the stack :: "+command.properties.type)
		this.stack.push(command);
	}

	this.pop = function(){

		return this.stack.pop();
	}

	this.currentCommand = function(){

		try{

			return this.stack[this.stack.length-1]
		}
		catch(error){

			return undefined;
		}
	}

	this.chunk = function(){

		console.log("Chunking...")

		if(this.currentCommand() == undefined){

			console.log("All Chunking Complete!")
			return false;
		}
		else{

			var currentCommand = this.currentCommand();
			var nextPhase = currentCommand.properties.nextPhase;

			console.log("Processing Command "+currentCommand.properties.type+" : "+nextPhase)

			if(nextPhase == "START"){

				currentCommand.activatePhase();
			}
			else if(nextPhase == "PRE"){

				currentCommand.activatePhase();
				updatePropegate();
			}
			else if(nextPhase == "REQRES"){
			//For requesting a response

				currentCommand.activatePhase();

				responseRequired = currentCommand.properties;

				//For response to request
				updatePropegate();

				return;
			}
			else if(nextPhase == "ACT"){

				currentCommand.activatePhase();
				updatePropegate();
			}
			else if(nextPhase == "END"){
			//For ending the command

				this.pop();
			}
			else{

				currentCommand.activatePhase();
				updatePropegate();
			}

			this.chunk();
		}

	}

	return this;
}

exportCommand = function(command){

	return JSON.stringify(command.properties)
}

importCommand = function(properties){

	var command = commandFunctions[properties.type].CONSTRUCTOR(properties);

	//Restore the properties of the command
	for(var i in properties){
		command.prop(i, properties[i])
	}

	return command;
}

Command = function(){

	//Tags to identify the command properties
	this.tags = {}

	//Properties to store arguments in, in order to export and import commands
	this.properties = {

		"nextPhase" : "START",
	}

	this.activatePhase = function(){

		try{

			commandFunctions[this.properties.type][this.properties.nextPhase](this.properties);
		}
		catch(error){
			console.log("Error in activatePhase... "+this.properties.nextPhase)
			console.log(error)
			console.log(error.stack)
		}
		
		return;
	}

	this.tag = function(tag){

		this.tags[tag] = true;
		return this;
	}

	this.prop = function(prop, val){

		this.properties[prop] = val;
		return this;
	}

	this.addProperties = function(properties){

		for(var i in properties){
			this.prop(i, properties[i]);
		}
	}

	this.hasTag = function(arg){

		return this.tags[arg] ? true : false;
	}

	return this;
}

commandFunctions = {

	"NullResponseCommand" : {
		"CONSTRUCTOR" : (properties) => {

			var command = new Command();

			command.addProperties(properties);

			command.prop("type", "NullResponseCommand")
			command.prop("nextPhase", "START");
			//who

			command.tag("response")

			return command;
		},
		"START" : (properties) => {
			properties.nextPhase = "END";
			responseRequired = false;
		},
	},
	"NormalSummonCommand" : {
		"CONSTRUCTOR" : (properties) => {

			var command = new Command();

			command.addProperties(properties);
			//handZoneCardNo
			//fieldZoneName
			//faceUp

			command.prop("type", "NormalSummonCommand")

			command.tag("summon")

			return command;
		},
		"START" : (properties) => {
			properties.nextPhase = "REQRES"
		},
		"REQRES" : (properties) => {

			properties.nextPhase = "ACT"
		},
		"ACT" : (properties) => {

			properties.nextPhase = "END"

			if(properties.faceUp){

				cards[properties.handZoneCardNo].summonTo(zoneIndex[properties.fieldZoneName])
			}
			else{
				
				cards[properties.handZoneCardNo].setTo(zoneIndex[properties.fieldZoneName])
			}
		}
	},
	"TributeSummonCommand" : {
		"CONSTRUCTOR" : (properties) => {

			var command = new Command();

			command.addProperties(properties);

			command.prop("type", "TributeSummonCommand")
			//handZoneCardNo
			//fieldZoneName
			//faceUp
			//tributeCardNumbers

			command.tag("tribute")

			return command;
		},
		"START" : (properties) => {

			properties.nextPhase = "PRE"
		},
		"PRE" : (properties) => {
			properties.tributeCardNumbers.forEach(function(cardNumber){
				cards[cardNumber].tribute();
			})
			properties.nextPhase = "REQRES"
		},
		"REQRES" : (properties) => {
			properties.nextPhase = "ACT"
		},
		"ACT" : (properties) => {

			properties.nextPhase = "END"

			if(properties.faceUp){

				cards[properties.handZoneCardNo].summonTo(zoneIndex[properties.fieldZoneName])
			}
			else{
				
				cards[properties.handZoneCardNo].setTo(zoneIndex[properties.fieldZoneName])
			}
		}
	},
	"DrawCardCommand" : {
		"CONSTRUCTOR" : (properties) => {

			var command = new Command();

			command.addProperties(properties);

			command.prop("type", "DrawCardCommand")

			command.tag("draw")

			return command;
		},
		"START" : (properties) => {
			properties.nextPhase = "REQRES"
		},
		"REQRES" : (properties) => {

			properties.nextPhase = "ACT"
		},
		"ACT" : (properties) => {

			properties.nextPhase = "END"

			if(properties.who == "player1"){
					
				myHand.addCard(myDeck.draw())
			}
			else if(properties.who == "player2"){

				yourHand.addCard(yourDeck.draw())
			}
		}
	},
	"SetMagicTrap" : {
		"CONSTRUCTOR" : (properties) => {

			var command = new Command();

			command.addProperties(properties);

			command.prop("type", "SetMagicTrap")
			//cardNumber
			//fieldZoneName

			command.tag("set")
			command.tag("magictrap")

			return command;
		},
		"START" : (properties) => {
			properties.nextPhase = "PRE"
		},
		"PRE" : (properties) => {

			properties.nextPhase = "REQRES"
			cards[properties.cardNumber].setMagicTo(zoneIndex[properties.fieldZoneName])
		},
		"REQRES" : (properties) => {

			properties.nextPhase = "END"
		},
	},
	"ActivateMagicTrap" : {
		"CONSTRUCTOR" : (properties) => {

			var command = new Command();

			command.addProperties(properties);

			command.prop("type", "ActivateMagicTrap")
			//cardNumber
			//fieldZoneName

			command.tag("activate")
			command.tag("magictrap")

			return command;
		},
		"START" : (properties) => {
			properties.nextPhase = "PRE"
		},
		"PRE" : (properties) => {

			properties.nextPhase = "REQRES"
			cards[properties.cardNumber].activateMagicTo(zoneIndex[properties.fieldZoneName])
		},
		"REQRES" : (properties) => {

			properties.nextPhase = "ACT"
		},
		"ACT" : (properties) => {

			//Activate Card Effects here

			cards[properties.cardNumber].finish();
			properties.nextPhase = "END"
		},
	},
	"ChangePosition" : {
		"CONSTRUCTOR" : (properties) => {

			var command = new Command();

			command.addProperties(properties);

			command.prop("type", "ChangePosition")
			//cardNumber

			command.tag("changePosition")

			return command;
		},
		"START" : (properties) => {
			properties.nextPhase = "PRE"
		},
		"PRE" : (properties) => {

			properties.nextPhase = "REQRES"

			if(cards[properties.cardNumber].attackPosition){

				cards[properties.cardNumber].toDefencePosition();
			}
			else{
				
				cards[properties.cardNumber].toAttackPosition();
			}

		},
		"REQRES" : (properties) => {

			properties.nextPhase = "END"
		}
	},
	"FlipActivateMagicTrap" : {
		"CONSTRUCTOR" : (properties) => {

			var command = new Command();

			command.addProperties(properties);

			command.prop("type", "FlipActivateMagicTrap")
			//cardNumber

			command.tag("activate")
			command.tag("flip")
			command.tag("magictrap")

			return command;
		},
		"START" : (properties) => {
			properties.nextPhase = "PRE"
		},
		"PRE" : (properties) => {

			properties.nextPhase = "REQRES"
			cards[properties.cardNumber].toFaceUp();
		},
		"REQRES" : (properties) => {

			properties.nextPhase = "ACT"
		},
		"ACT" : (properties) => {

			//Activate Card Effects here

			cards[properties.cardNumber].finish();
			properties.nextPhase = "END"
		},
	},
	"FlipSummon" : {
		"CONSTRUCTOR" : (properties) => {

			var command = new Command();

			command.addProperties(properties);

			command.prop("type", "FlipSummon")
			//cardNumber

			command.tag("flip")
			command.tag("summon")

			return command;
		},
		"START" : (properties) => {
			properties.nextPhase = "PRE"
		},
		"PRE" : (properties) => {

			properties.nextPhase = "REQRES"
			cards[properties.cardNumber].toFaceUp();
			cards[properties.cardNumber].toAttackPosition();
		},
		"REQRES" : (properties) => {

			properties.nextPhase = "END"
		},
	}
}