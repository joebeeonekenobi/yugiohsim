//Server
var WebSocketServer = require('ws').Server;
console.log("Setting up server...")
var wss = new WebSocketServer({port: 8080});

//Store for all connections to this
var uid = "0";
var connections = {};
splitter = "~"

player1 = undefined;
player2 = undefined;

sizeOf = function(obj){var x=0;for(var i in obj){x++;}return x;}

//Event for established connection
wss.on('connection', function(ws){

	//Log the connection
	console.log("Connection from: "+ ws._socket.server._connectionKey)

	//Increment the uid
	uid = (parseInt(uid) + 1).toString();

	//Store this connection uniquely
	connections[uid] = ws.uid = uid;

	if(player1 == undefined){
		player1 = ws;
		player1.name = "player1"; //Do NOT change this
		ws.who = player1.name
		ws.send("DB"+splitter + JSON.stringify( cleanDatabase ) )
		ws.send("STATE"+splitter+player1.name+splitter+JSON.stringify( exportState() ) )
		console.log("Player 1 Loaded")
	}
	else if(player2 == undefined){
		player2 = ws;
		player2.name = "player2"; //Do NOT change this
		ws.who = player2.name
		ws.send("DB"+splitter + JSON.stringify( cleanDatabase ) )
		ws.send("STATE"+splitter+player2.name+splitter + JSON.stringify( reverseState(exportState()) ) )
		console.log("Player 2 Loaded")
	}
	else{
		ws.send("Both players are already logged in.")
		ws.close()
	}

	
	//Event for recieved Message
    ws.on('message', function(message){
	
        console.log('received: ', message, " from", ws.name);

        var split = message.split(splitter)

        switch(split[0]){

        	case "COMMAND" : 
        		console.log("Command Recieved")
        		processCommand(split[2], ws)
        		break;
        	default : "Message Not Understood: "+message
        }

    });
	
	//Event for terminated connection
	ws.on('close', function(){

		if(ws.who == player1.name){
			player1 = undefined;
		}
		else if(ws.who == player2.name){
			player2 = undefined;
		}
	
		delete connections[ws.uid]
		console.log('disconnected: '+ws._socket.server._connectionKey);
		console.log("Clients Remaining: " + sizeOf(connections))
	});
});

return 2;