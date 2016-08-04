splitter = "~";

websocketConnect = function(){

	var serverAddress = '127.0.0.1:8080';

	try{
		
		ws = new WebSocket("ws://localhost:8080");

	}catch(error){

		console.log(error)
	}

	ws.onopen = function(){

		console.log("Connection Open");
		ws.send("Hello from client!");
	};

	ws.onmessage = function(message){

		//console.log(message.data)

		var data = message.data.split("~")

		switch(data[0]){
			case "DB" :
				cleanDatabase = JSON.parse(data[1])
				break;
			case "STATE" : 
				serverName = data[1];
				latestState = JSON.parse(data[2]);
				importState(latestState);
				console.log("Updated State Recieved: as "+serverName)
				if(responseRequired && responseRequired.properties.who != serverName){
					//We need to respond

					//Default no response only at this point
					sendCommandToServer(
						exportCommand(commandFunctions["NullResponseCommand"].CONSTRUCTOR({who:serverName}))
					)
				}
				break;
			default : 
				console.log("Unknown Message Recieved")
				//console.log(message.data)
		}
	};

	ws.onclose = function(){

		//websocket is closed.
		console.log("Connection with the server is Lost"); 
	};
}