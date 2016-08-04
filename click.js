click_myDeckZone = function(e, o){

	sendCommandToServer(
		exportCommand(
			commandFunctions["DrawCardCommand"].CONSTRUCTOR({who:serverName})
		)
	)
	
	return;
}

click_yourDeckZone = function(e, o){

}

click_myMonsterZone = function(e, o){

	//console.log(zone)
	//console.log(zone.name)
	//console.log(zone.card)

	if(o.zone.card == undefined){
		click_blankZone(e, o)
	}

	var options = o.zone.card.generateMoveOptions();

	generateOuterOptionOHTML(
		o.zone.card, 
		options)
			.appendToBody();

	//console.log(options)
	return;
}

click_myMagicZone = function(e, o){

	//console.log(zone)
	//console.log(zone.name)
	//console.log(zone.card)

	if(o.zone.card == undefined){
		click_blankZone(e, o)
	}

	var options = o.zone.card.generateMoveOptions();

	generateOuterOptionOHTML(
		o.zone.card, 
		options)
			.appendToBody();

	//console.log(options)
	return;
}

click_myHandZone = function(e, o){

	//console.log(zone)
	//console.log(zone.name)
	//console.log(zone.card)

	var options = o.zone.card.generateMoveOptions();

	generateOuterOptionOHTML(
		o.zone.card, 
		options)
			.appendToBody();

	//console.log(options)
	return;
}

click_yourHandZone= function(e, o){

	click_blankZone(e, o)
	return;
}

click_blankZone = function(e, o){

	console.log(o.zone)
}