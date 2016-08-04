pageSetup = function(){

	console.log("Setting Up Page")

	container = new ODIV("pageContainer")
		.class("pageContainer")
		.appendToBody()
}

resizeSetup = function(){

	resizeEvents["field"] = new Instruction(function(){

		reDrawAll();
	}, [])
}

reDrawAll = function(){

	if(!server){

		var allZones = getAllZones()

		for(var i=0; i<allZones.length; i++){
			allZones[i].reCalculateDimensions();
		}
	}

}