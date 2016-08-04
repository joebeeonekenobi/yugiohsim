require("./server_websockets.js")
require("./JSONycMonster.js")
require("./JSONycMagicTrap.js")
cleanDatabase = require("./cleanDatabase.json")

require("./Card.js")
require("./Deck")
require("./Zone")
require("./Field")
require("./Graveyard")
require("./Hand")
require("./Turn")

require("./commandStack")
require("./gameState")
require("./loadables")
require("./pageSetup.js")
require("./setup.js")


Instruction = function(f, a){

	this.f = f;
	this.a = a;

	this.activate = function(){
		return this.f.apply(this, this.a);
	}

	this.dmi = function(arg){
		this.a.push(arg);
		return this;
	}

	return this;
}

processCommand = function(commandJSONstring, ws){

	try{

		if(ws.name == "player2"){
			console.log("REAL HACK IMPLEMENTED: REMOVE THIS QUICKLY")
			commandJSONstring = commandJSONstring.replace(/my/g, "your")
		}

		var json = JSON.parse(commandJSONstring);
		if(typeof json == "string"){
			throw new Error("DO NOT STRINGIFY BEFORE SENDING NITWIT")
		}
		var command = importCommand(json);
		commandStack.push(command);
		commandStack.chunk();
	}
	catch(error){

		console.log("Could not process command recieved.")
		console.log(error)
		console.log(error.stack)
	}

}

updatePropegate = function(){

	console.log("propegating....")

	if(player1 != undefined){

		player1.send("STATE"+splitter+player1.name+splitter+ JSON.stringify( exportState() ) )
	}
	if(player2 != undefined){

		player2.send("STATE"+splitter+player2.name+splitter+ JSON.stringify( reverseState(exportState()) ) )
	}
}

server_main = function(){

	server = true;
	serverName = undefined;

	logicalSetup();

	//console.log(exportState())

	

}

server_main();