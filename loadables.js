loadCheck = function(){

	for(var i in images){
		if(!images[i].loaded){
			//console.log("Image not yet loaded, returning")
			return;
		}
	}

	console.log("All Images loaded, drawing.")

	//pageSetup();
}

loadImages = function(){

	var notifyImageLoaded = function(name){

		images[name].loaded = true;
		//console.log("Image Loaded: "+name)
		loadCheck();
	}

	images = {}

	images["fieldCardZoneImage"] = new OIMG("fieldCardZone", "./fieldCardZone.jpg", function(){notifyImageLoaded("fieldCardZoneImage")})
	images["extraCardZoneImage"] = new OIMG("extraCardZone", "./extraCardZone.jpg", function(){notifyImageLoaded("extraCardZoneImage")})
	images["monsterCardZoneImage"] = new OIMG("monsterCardZone", "./monsterCardZone.jpg", function(){notifyImageLoaded("monsterCardZoneImage")})
	images["graveyardCardZoneImage"] = new OIMG("graveyardCardZone", "./graveyardCardZone.jpg", function(){notifyImageLoaded("graveyardCardZoneImage")})
	images["magicCardZoneImage"] = new OIMG("magicCardZone", "./magicCardZone.jpg", function(){notifyImageLoaded("magicCardZoneImage")})
	images["deckCardZoneImage"] = new OIMG("deckCardZone", "./deckCardZone.jpg", function(){notifyImageLoaded("deckCardZoneImage")})
	images["handCardZoneImage"] = new OIMG("handCardZone", "./handCardZone.png", function(){notifyImageLoaded("handCardZoneImage")})
	images["cardBackImage"] = new OIMG("cardBackImage", "./images/cardBack.jpg", function(){notifyImageLoaded("cardBackImage")})
	
	for(var i=0; i<myDeckList.length; i++){
		
		images[myDeckList[i]] = new OIMG(myDeckList[i], "./images/"+myDeckList[i]+".jpg", function(e){notifyImageLoaded(e.path[0].id)})
	}
}

loadDatabase = function(){

	db = {};

	for(var i=0; i<MONSTERCARDS.length; i++){

		db[MONSTERCARDS[i][6]] = {
			"name" : MONSTERCARDS[i][0],
			"level" : MONSTERCARDS[i][1],
			"atk" : MONSTERCARDS[i][4],
			"def" : MONSTERCARDS[i][5],
			"type" : MONSTERCARDS[i][7],
			"subtype" : MONSTERCARDS[i][3],
			"attribute" : MONSTERCARDS[i][2],
			"password" : MONSTERCARDS[i][6]
		}
	}

	for(var i=0; i<MAGICTRAPCARDS.length; i++){

		db[MAGICTRAPCARDS[i][2]] = {
			"name" : MAGICTRAPCARDS[i][0],
			"type" : MAGICTRAPCARDS[i][3],
			"subtype" : MAGICTRAPCARDS[i][1],
			"password" : MAGICTRAPCARDS[i][2]
		}
	}
	
}

extractDBEntries = function(passwordList){

	var chosen = {}

	for(var i=0; i<passwordList.length; i++){

		chosen[passwordList[i]] = db[passwordList[i]];
	}
	
	return JSON.stringify(chosen)
}

loadMyDeckList = function(){

	myDeckList = [

		"04031928",
		"04206964",
		"06368038",
		"12607053",
		"13039848",
		"13429800",
		"13723605",
		"13945283",
		"15025844",
		"16972957",
		"17814387",
		"19159413",
		"28279543",
		"32452818",
		"36304921",
		"37120512",
		"40374923",
		"41218256",
		"41392891",
		"44209392",
		"46461247",
		"46474915",
		"46986414",
		"47060154",
		"48365709",
		"49218300",
		"50045299",
		"50930991",
		"51482758",
		"53129443",
		"54652250",
		"59197169",
		"66672569",
		"66788016",
		"68005187",
		"70781052",
		"72892473",
		"77622396",
		"80604091",
		"83764718",
		"83887306",
		"84257639",
		"85602018",
		"86325596",
		"87557188",
		"87796900",
		"90357090",
		"91152256",
		"91595718",
		"93221206",
	];
}