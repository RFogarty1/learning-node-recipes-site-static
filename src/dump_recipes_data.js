
const dbInter = require('./lib/db_inter');
const dbInstance = require('./lib/db_instance');
const path = require('path');

let dataFileName = "recipes_data.txt";

function dumpAllRecipeData(fileObjs, metalsmithInstance){

	//Get the recipes
	let allNames = dbInter.getRecipeNamesFromDb(dbInstance.getDatabase());
	let allRecipeObjs = allNames.map( (inpVal) => dbInter.getRecipeObjFromName(inpVal, dbInstance.getDatabase()) );

	//Get the required string for the json array
	outObj = {"recipes":[]};
	for (let i=0; i < allRecipeObjs.length; i++){
		outObj.recipes.push( JSON.stringify(allRecipeObjs[i]) );
	}

	//Add to the metalsmith file objects
	let dirName = "data";
	let outPath = path.join(dirName, dataFileName);
	let file = {contents: Buffer.from(JSON.stringify(outObj))};
	fileObjs[outPath] = file;

}




module.exports = { dumpAllRecipeData };

