geometry = {

	get internalWidth(){ return window.innerWidth},
	get internalHeight(){ return window.innerHeight},
	get widthHeightRatio(){ return this.internalWidth / this.internalHeight},
	fieldRatio : 7/6,
	get startX(){ return this.widthHeightRatio <= this.fieldRatio ? 0 : ( this.internalWidth - (this.zoneSpaceX * 7) - (this.blankSpaceX * 8) ) / 2 },
	get startY(){ return this.widthHeightRatio <= this.fieldRatio ? ( this.internalHeight - (this.zoneSpaceY * 6) - (this.blankSpaceY * 7) ) / 2 : 0},
	proportionZone : 0.9,
	get proportionSpace(){ return 1 - this.proportionZone},
	get zoneSpaceX(){ return this.widthHeightRatio <= this.fieldRatio ? (this.internalWidth / 7) * this.proportionZone : (this.internalHeight / 6) * this.proportionZone},
	get zoneSpaceY(){ return this.zoneSpaceX},
	get blankSpaceX(){ return (((this.zoneSpaceX * 7) / this.proportionZone) * this.proportionSpace) / 8},
	get blankSpaceY(){ return (((this.zoneSpaceY * 6) / this.proportionZone) * this.proportionSpace) / 7},

	get middleCardZone0X(){		return this.startX + (1*this.blankSpaceX)},
	get middleCardZone1X(){		return this.startX + (2*this.blankSpaceX) + this.zoneSpaceX},
	get middleCardZone2X(){		return this.startX + (3*this.blankSpaceX) + ((2)*this.zoneSpaceX)},
	get middleCardZone3X(){		return this.startX + (4*this.blankSpaceX) + ((3)*this.zoneSpaceX)},
	get middleCardZone4X(){		return this.startX + (5*this.blankSpaceX) + ((4)*this.zoneSpaceX)},
	get middleCardZone5X(){		return this.startX + (6*this.blankSpaceX) + ((5)*this.zoneSpaceX)},
	get middleCardZone6X(){		return this.startX + (7*this.blankSpaceX) + ((6)*this.zoneSpaceX)},

	get myHandCardZoneY(){		return this.startY + (1*this.blankSpaceY) + ((0)*this.zoneSpaceY)},
	get myBehindCardZoneY(){	return this.startY + (2*this.blankSpaceY) + ((1)*this.zoneSpaceY)},
	get myForwardCardZoneY(){	return this.startY + (3*this.blankSpaceY) + ((2)*this.zoneSpaceY)},
	get yourForwardCardZoneY(){	return this.startY + (4*this.blankSpaceY) + ((3)*this.zoneSpaceY)},
	get yourBehindCardZoneY(){	return this.startY + (5*this.blankSpaceY) + ((4)*this.zoneSpaceY)},
	get yourHandCardZoneY(){	return this.startY + (6*this.blankSpaceY) + ((5)*this.zoneSpaceY)},

	getHandXForN : function(cardNumber, cardsInHand){

		if(cardsInHand <= 7){

			var takenUpWidth = (cardsInHand * geometry.zoneSpaceX) + ((cardsInHand-1) * geometry.blankSpaceX);
			var remainingSpaceX = geometry.internalWidth - takenUpWidth - (geometry.startX * 2)
			var startingX = geometry.startX + (remainingSpaceX / 2);

			return startingX + ((cardNumber-1) * geometry.zoneSpaceX) + ((cardNumber-1) * geometry.blankSpaceX);
		}
		else{

			var remainingSpaceX = geometry.internalWidth - (2 * geometry.startX) - (2 * geometry.blankSpaceX)
			var howMuchSpaceHasEachCardGotX = remainingSpaceX / (cardsInHand);

			return geometry.startX + geometry.blankSpaceX + (howMuchSpaceHasEachCardGotX * (cardNumber-1))

		}
	},

	getHandHangover : function(cardNumber, cardsInHand){

		if(cardsInHand < 8){

			return 0;
		}
		else{

			var endCardPointX = geometry.getHandXForN(cardNumber, cardsInHand) + geometry.zoneSpaceX
			var endFieldPointX = geometry.startX + geometry.blankSpaceX + (7 * geometry.zoneSpaceX) + (6 * geometry.blankSpaceX)

			return Math.max(endCardPointX - endFieldPointX, 0);
		}
	}
}