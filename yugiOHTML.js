generateFieldZoneOption = function(card, fieldZone, zoneType){

	// zoneType : Magic, Tribute, Call
	var upperFunction, lowerFunction, imgSrc

	if(zoneType == "Call"){

		var zoneTypeSrc = "monsterCardZoneImage"
		var upperTextValue = "Summon"
		var lowerTextValue = "Set"
		imgSrc = fieldZone.card == undefined ? images[zoneTypeSrc].element.src : fieldZone.card.faceUp ? fieldZone.card.imgSrc : images["cardBackImage"].element.src;

		if(card.goesTributeRoute()){

			upperFunction = function(e, o){

				o.parent.parent.parent.parent.remove();

				var tributeCardNumbers = field.getMyEarmarkedCards().map(function(card){return card.cardNumber;})
				field.unEarmarkAll();
				
				sendCommandToServer(
					exportCommand(
						commandFunctions["TributeSummonCommand"].CONSTRUCTOR({who:serverName, handZoneCardNo:card.cardNumber, fieldZoneName:fieldZone.name, faceUp:true, tributeCardNumbers:tributeCardNumbers})
					)
				)
			}

			lowerFunction = function(e, o){

				o.parent.parent.parent.parent.remove();

				var tributeCardNumbers = field.getMyEarmarkedCards().map(function(card){return card.cardNumber;})
				field.unEarmarkAll();
				
				sendCommandToServer(
					exportCommand(
						commandFunctions["TributeSummonCommand"].CONSTRUCTOR({who:serverName, handZoneCardNo:card.cardNumber, fieldZoneName:fieldZone.name, faceUp:false, tributeCardNumbers:tributeCardNumbers})
					)
				)
			}
		}
		else{

			upperFunction = function(e, o){

				o.parent.parent.parent.parent.remove();

				sendCommandToServer(
					exportCommand(
						commandFunctions["NormalSummonCommand"].CONSTRUCTOR({who:serverName, handZoneCardNo:card.cardNumber, fieldZoneName:fieldZone.name, faceUp:true})
					)
				)
			}

			lowerFunction = function(e, o){

				o.parent.parent.parent.parent.remove();

				sendCommandToServer(
					exportCommand(
						commandFunctions["NormalSummonCommand"].CONSTRUCTOR({who:serverName, handZoneCardNo:card.cardNumber, fieldZoneName:fieldZone.name, faceUp:false})
					)
				)
			}
		}
	}
	else if(zoneType == "Magic"){

		var zoneTypeSrc = "magicCardZoneImage"
		var upperTextValue = "Activate"
		var lowerTextValue = "Set"
		imgSrc = fieldZone.card == undefined ? images[zoneTypeSrc].element.src : fieldZone.card.faceUp ? fieldZone.card.imgSrc : images["cardBackImage"].element.src;

		upperFunction = function(e, o){
			o.parent.parent.parent.parent.remove();
			sendCommandToServer(
				exportCommand(
					commandFunctions["ActivateMagicTrap"].CONSTRUCTOR({who:serverName, cardNumber:card.cardNumber, fieldZoneName:fieldZone.name})
				)
			)
		}

		lowerFunction = function(e, o){
			o.parent.parent.parent.parent.remove();

			sendCommandToServer(
				exportCommand(
					commandFunctions["SetMagicTrap"].CONSTRUCTOR({who:serverName, cardNumber:card.cardNumber, fieldZoneName:fieldZone.name})
				)
			)
		}
	}
	else if(zoneType == "Trap"){

		var zoneTypeSrc = "magicCardZoneImage"
		var wholeTextValue = "Set"
		imgSrc = fieldZone.card == undefined ? images[zoneTypeSrc].element.src : fieldZone.card.faceUp ? fieldZone.card.imgSrc : images["cardBackImage"].element.src;

		wholeFunction = function(e, o){
			o.parent.parent.parent.parent.remove();
			sendCommandToServer(
				exportCommand(
					commandFunctions["SetMagicTrap"].CONSTRUCTOR({who:serverName, cardNumber:card.cardNumber, fieldZoneName:fieldZone.name})
				)
			)
		}
	}
	else if(zoneType == "Tribute"){

		imgSrc = fieldZone.card.imgSrc;

		var earmarkFunction = function(e, o){

			//Toggle Tribute Earmarking on/off
			if(!fieldZone.earmarked){

				fieldZone.earmarked = true;
				o.class("optionSelectionImageTextContainer tributeOption borderRed")
				//document.getElementById(fieldZone.name+"_replicaImage").src = images["monsterCardZoneImage"].element.src
			}
			else{

				fieldZone.earmarked = false;
				o.class("optionSelectionImageTextContainer tributeOption borderBlue blink")
				//document.getElementById(fieldZone.name+"_replicaImage").src = fieldZone.card.imgSrc
			}

			//Check if the earmarked selection satifies the tribute
			var earmarkedCards = field.getMyEarmarkedCards()
			var selectionAllowed = card.tributesSatisfies(earmarkedCards)

			//Allow / Disallow,  Summon / Set
			var summonOptions = document.getElementsByClassName("upperOption")
			var setOptions = document.getElementsByClassName("lowerOption")

			for(var i=0; i<summonOptions.length; i++){
				summonOptions[i].OHTML.style("display",  selectionAllowed ? "" : "none")
			}
			for(var i=0; i<setOptions.length; i++){
				setOptions[i].OHTML.style("display",  selectionAllowed ? "" : "none")
			}

			//Check each monster zone on the field
			for(var i=0; i<zones.my.monster.length; i++){

				//If there is a card there (we dont want to summon where cards already are)
				if(zones.my.monster[i].card != undefined){

					//(Excpet if we plan to tribute it)
					if(!zones.my.monster[i].earmarked){

						// Do not display summon and set options
						document.getElementById(zones.my.monster[i].name+"_replicaUpperOption").OHTML
							.style("display", "none")
						document.getElementById(zones.my.monster[i].name+"_replicaLowerOption").OHTML
							.style("display", "none")
					}
				}
			}
		}
	}


	//All cases

	var container = new ODIV(card.password+zoneType+"OptionZone")
		.class("optionSelectionImageContainer")

	var image = new OIMG(
		fieldZone.name+"_replicaImage", 
		imgSrc
	)
		.class("optionSelectionImage")
		.style("transform", ((fieldZone.card != undefined) && (!fieldZone.card.attackPosition)) ? "rotate(-90deg)" : "rotate(0deg)" )

	container.append(image)

	if(zoneType == "Tribute"){

		var wholeOption = new ODIV(fieldZone.name+"_replicaTributeOption")
			.class("optionSelectionImageTextContainer wholeOption borderBlue blink")
			.height("78px")
			.onclick(earmarkFunction)

		var wholeText = new OTEXT(fieldZone.name+"_replicaTributeOptionText")
			.textValue("Earmark")
			.class("optionSelectionImageText")
			.style("margin-top", "22px")

		wholeOption.append(wholeText)
		container.append(wholeOption)
	}
	else if(zoneType == "Trap"){

		var wholeOption = new ODIV(fieldZone.name+"_replicaTrapOption")
			.class("optionSelectionImageTextContainer wholeOption borderGreen blink")
			.height("78px")
			.style("display", (fieldZone.card != undefined) ? "none" : "")
			.onclick(wholeFunction)

		var wholeText = new OTEXT(fieldZone.name+"_replicaTrapOptionText")
			.textValue("Set")
			.class("optionSelectionImageText")
			.style("margin-top", "22px")
			.style("display", (fieldZone.card != undefined) ? "none" : "")

		wholeOption.append(wholeText)
		container.append(wholeOption)
	}
	else{

		var upperOption = new ODIV(fieldZone.name+"_replicaUpperOption")
			.class("optionSelectionImageTextContainer upperOption borderRed blink")
			.onclick(upperFunction)
			.style("display", (fieldZone.card != undefined) || card.goesTributeRoute() ? "none" : "")
		var upperText = new OTEXT(fieldZone.name+"_replicaUpperOptionText")
			.textValue(upperTextValue)
			.class("optionSelectionImageText")
		var lowerOption = new ODIV(fieldZone.name+"_replicaLowerOption")
			.class("optionSelectionImageTextContainer lowerOption borderGreen blink")
			.onclick(lowerFunction)
			.style("display", (fieldZone.card != undefined) || card.goesTributeRoute() ? "none" : "")
		var lowerText = new OTEXT(fieldZone.name+"_replicaLowerOptionText")
			.textValue(lowerTextValue)
			.class("optionSelectionImageText")

		upperOption.append(upperText)
		lowerOption.append(lowerText)
		container.append(upperOption)
		container.append(lowerOption)
	}



	return container;
}
	
//////////////////
/*
	if(card.activatable()){
		if(fieldZone.isEmpty()){

			container.append(activateOption)
			container.append(setMagicOption)
		}
	}
	else if(card.magicSettable()){
		if(fieldZone.isEmpty()){

			container.append(activateOption)
			container.append(setMagicOption)
		}
	}
*/




generateOuterOptionOHTML = function(card, innerOptionsOHTML){

	return new ODIV(card.password+"_optionPageContainer")
		.class("optionPageContainer")
		.append(
			new OTEXT(card.password+"_optionCardName")
				.class("optionName")
				.textValue(card.name)
		)
		.append(
			new OTEXT(card.password+"_optionCardStats")
				.class("optionStats")
				.textValue(card.generateStatDescription())
		)
		.append(
			new OIMG(card.password+"_optionCardImage", card.imgSrc)
				.class("optionImage")
				.prop("draggable", false)
		)
		.append(
			new ODIV(card.password+"_optionContainer")
				.class("optionContainer")
				.appendChildren(
					innerOptionsOHTML
				)
		)
}

