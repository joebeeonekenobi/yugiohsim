Turn = function(who, number){









//DEPRICATED








	this.number = number;
	this.player = who
	this.phase = "draw"

	this.exportTurn = function(){

		return {}
	}

	this.nextPhase = function(){

		if(this.phase == "draw"){

			this.phase = "standby"
		}
		else if(this.phase == "standby"){

			this.phase = "main1"
		}				
		else if(this.phase == "main1"){

			this.phase = "battle"
		}
		else if(this.phase == "battle"){

			this.phase = "main2"
		}
		else if(this.phase == "main2"){

			this.phase = "end"
		}
	}

	this.jumpToEndPhase= function(){
	//You can only jump to end from main1 or battle

		this.phase = "end";
	}
	
}