MoveOption = function(card, optionArgument){

	var option = new ODIV(card.password+"_optionContainer")
		.class("particularOptionContainer")

	if(optionArgument == "Cancel"){

		option.append(
			new OTEXT(card.password+"_option")
				.class("moveOption")
				.textValue(optionArgument)
				.onclick(function(e, o){

					//If we cancel, we have to make sure all earmarks are undone
					field.unEarmarkAll();
					o.parent.parent.parent.remove();
				})
		)
	}
	else if(optionArgument == "Change"){

		option.append(
			new OTEXT(card.password+"_option")
				.class("moveOption")
				.textValue("Change Position")
				.onclick(function(e, o){

					o.parent.parent.parent.remove();
					sendCommandToServer(
						exportCommand(
							commandFunctions["ChangePosition"].CONSTRUCTOR({who:serverName, cardNumber:card.cardNumber})
						)
					)
				})
		)
	}
	else if(optionArgument == "FlipSummon"){

		option.append(
			new OTEXT(card.password+"_option")
				.class("moveOption")
				.textValue("Flip Summon")
				.onclick(function(e, o){

					o.parent.parent.parent.remove();

					sendCommandToServer(
						exportCommand(
							commandFunctions["FlipSummon"].CONSTRUCTOR({who:serverName, cardNumber:card.cardNumber})
						)
					)
				})
		)
	}
	else if(optionArgument == "FlipActivate"){

		option.append(
			new OTEXT(card.password+"_option")
				.class("moveOption")
				.textValue("Activate")
				.onclick(function(e, o){

					o.parent.parent.parent.remove();

					sendCommandToServer(
						exportCommand(
							commandFunctions["FlipActivateMagicTrap"].CONSTRUCTOR({who:serverName, cardNumber:card.cardNumber})
						)
					)
				})
		)
	}
	else if(optionArgument == "Magic"){

		option.append(
			new OTEXT(card.password+"_optionTitle")
				.class("optionTitle")
				.textValue("Activate/Set:")
		)

		option.appendChildren([

			generateFieldZoneOption(card, zones.my.magic[0], "Magic"),
			generateFieldZoneOption(card, zones.my.magic[1], "Magic"),
			generateFieldZoneOption(card, zones.my.magic[2], "Magic"),
			generateFieldZoneOption(card, zones.my.magic[3], "Magic"),
			generateFieldZoneOption(card, zones.my.magic[4], "Magic"),
			
		])
	}
	else if(optionArgument == "Trap"){

		option.append(
			new OTEXT(card.password+"_optionTitle")
				.class("optionTitle")
				.textValue("Activate/Set:")
		)

		option.appendChildren([

			generateFieldZoneOption(card, zones.my.magic[0], "Trap"),
			generateFieldZoneOption(card, zones.my.magic[1], "Trap"),
			generateFieldZoneOption(card, zones.my.magic[2], "Trap"),
			generateFieldZoneOption(card, zones.my.magic[3], "Trap"),
			generateFieldZoneOption(card, zones.my.magic[4], "Trap"),
			
		])
	}
	else if(optionArgument == "Tribute"){

		option.append(
			new OTEXT(card.password+"_optionTitle")
				.class("optionTitle")
				.textValue("Select Tributes:")
		)

		//generate a zone option for each possible tribute
		var possibleTributes = field.getPossibleTributesFor(card)

		for(var i=0; i<possibleTributes.length; i++){

			option.append(generateFieldZoneOption(card, possibleTributes[i].zone, "Tribute"))
		}

		return option;
	}
	else if(optionArgument == "Call"){

		option.append(
			new OTEXT(card.password+"_optionTitle")
				.class("optionTitle")
				.textValue("Summon/Set:")
		)

		option.appendChildren([

			generateFieldZoneOption(card, zones.my.monster[0], "Call"),
			generateFieldZoneOption(card, zones.my.monster[1], "Call"),
			generateFieldZoneOption(card, zones.my.monster[2], "Call"),
			generateFieldZoneOption(card, zones.my.monster[3], "Call"),
			generateFieldZoneOption(card, zones.my.monster[4], "Call"),
			
		])
	}

	return option;
}