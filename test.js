extractDBEntries = function(passwordList){

	var chosen = []

	for(var i=0; i<passwordList.length; i++){


		chosen.push(db[passwordList[i]]);

	}
	
	return chosen
}

test = function(){

	
}