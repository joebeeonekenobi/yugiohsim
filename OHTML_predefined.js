console.log("OHMTML Predefined Loaded v3.3")

window.removeOHTML = function(e, ohtml){

	ohtml.remove();
}

window.resizingFunction_FULLPAGE = function(ohtml){

	ohtml.width(window.innerWidth)
	ohtml.height(window.innerHeight)
}

window.resizingFunction_MAJORITYPAGE = function(ohtml){

	ohtml.width(Math.floor(window.innerWidth * 0.8))
	ohtml.height(Math.floor(window.innerHeight * 0.8))
}

window.resizingFunction_HALFPAGE = function(ohtml){

	ohtml.width(Math.floor(window.innerWidth / 2))
	ohtml.height(Math.floor(window.innerHeight / 2))
}

window.positioningFunction_FULLPAGE = function(ohtml){
//This function is practically redundant (for multiple calls)
	ohtml.top(0)
	ohtml.left(0)
}

window.positioningFunction_MAJORITYPAGE = function(ohtml){

	//For an 80% width: half of the remaining 20% left and top

	ohtml.left(Math.floor(window.innerWidth * 0.1))
	ohtml.top(Math.floor(window.innerHeight * 0.1))
}

window.logMessage = function(){

	console.log("Message Log")
}


window.OHTML.NotificationAlert = function(name, notificationMessage, confirmationMessage){

	var notificationPage = new OHTML.NotificationPage(name);

	var finalAppention = [

		new OTEXT(name+"-notification-box-message", "h2")
			.textValue(notificationMessage)
			.style("padding", "60px")
			//.style("padding-bottom", "25px")
			.style("color", "black")
			.style("text-align", "center")

	]

	if(confirmationMessage != undefined){

		finalAppention.push(

			new OTEXT(name+"-notification-box-confirm", "h3")
				.textValue(confirmationMessage || "")
				.padding("25px")
				.style("padding-top", "0px")
				.style("color", "black")
				.style("text-align", "center")
				.onclick(function(e, o){
					o.parent.parent.parent.parent.parent.parent.parent.parent.remove();
				})
		)
	}

	notificationPage.recursiveGetChild(name+"-notification-box")
		.append(

			new ODIV(name+"-notification-box"+"-alignmentContainer")
				.class("tableCentered")
				.width("100%")
				.height("100%")
				.append(

					new ODIV(name+"-notification-box"+"-alignmentContainer-positioning-vertical")
						.class("verticalCentered")
						.width("100%")
						.height("100%")
						.append(

							new ODIV(name+"-notification-box"+"-alignmentContainer-positioning-horizontal")
								.class("horizontalCentered")
								.appendChildren(
									finalAppention
								)
						)
				)
		)

	return notificationPage;
}

window.OHTML.NotificationPage = function(name){

	return new ODIV(name+"-notification-container")
		.class("notificationContainer")
		.position("absolute")
		.top(0)
		.left(0)
		.width("100%")
		.height("100%")
		.append(
			new ODIV(name+"-alignmentContainer")
				.class("tableCentered")
				.width("100%")
				.height("100%")
				.append(
					new ODIV(name+"-alignmentContainer-positioning-vertical")
						.class("verticalCentered")
						.width("100%")
						.height("100%")
						.append(
							new ODIV(name+"-alignmentContainer-positioning-horizontal")
								.class("horizontalCentered")
								.append(
									new ODIV(name+"-notification-box")
										.class("notificationBox roundCorners")
										.width("100%")
										.height("100%")
										.background("lightgrey")
								)
						)
				)
		)
}