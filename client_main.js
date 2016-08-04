window.onload = function(){


	/*

		TODO

		Opponents Hand / Drawing

		Battle Mechanics
		Phase Mechanics
		Callstack
			Univeral Modelling Notation
			State Description

		Server




	*/

	test();

	client_main();
}

client_main = function(){

	console.log("Main")

	server = false;

	logicalSetup();

	serverName = undefined;

	websocketConnect();

}

sendCommandToServer = function(commandJSONstring){

	console.log(commandJSONstring)
	ws.send("COMMAND"+splitter+serverName+splitter+commandJSONstring)

}