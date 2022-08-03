
const recipeObjHelp = require('./recipe_class');

const getRecipeNamesFromDb = (inpDb) => {
	let getVals, outVals;

	const stmt = inpDb.prepare("SELECT name FROM recipe_summary");
	getVals = stmt.all();

	//Put all recipe names in an array
	outVals = [];
	for (let i=0; i < getVals.length; i++){
		outVals[i] = getVals[i]["name"]};


	return outVals;

}

const getRecipeObjFromName = (inpName, inpDb) => {
	//Get all information in a json format
	let allInfo = _getAllRecipeInfoFromDb(inpName, inpDb);

	//Order the ingredients by their (arbitrary) idx key
	allInfo["recipe_ingredients"].sort( (a,b) => a["id"] - b["id"] );
	let outIngredients = allInfo["recipe_ingredients"].map( (inpVal)=> {
	                     return new recipeObjHelp.Ingredient( inpVal.ingredientName, inpVal.amount, inpVal.units );
	                   });


	//Order the instructions by thier (non-arbitrary) idx key
	allInfo["recipe_instructions"].sort( (a,b) => a["idx"] - b["idx"] );
	let outInstructions = allInfo["recipe_instructions"].map( (inpVal)=> inpVal["instruction"] );

	//Order the images by their proiority (1st key) THEN their id for tie-breakers
	allInfo["recipe_images"].sort( (a,b) => {
		let outVal = a["priority"] - b["priority"]
		if (outVal == 0){
			let tieBreak = a["id"] - b["id"];
			if (tieBreak < 0){
				outVal -= 0.1
			} else {
				outVal += 0.1;
			}
		}
		return outVal;
	});


	let outImages = allInfo["recipe_images"].map( (inpVal)=> {
		return new recipeObjHelp.RecipeImage( inpVal["fileName"], inpVal["extension"], inpVal["priority"], inpVal["id"] );
	});


	//Create the output object
	let outObj = new recipeObjHelp.Recipe(inpName, outIngredients, outInstructions, outImages);

	return outObj;
}


const _getAllRecipeInfoFromDb = (inpName, inpDb) => {

	let outObj = {};

	//Get the summary info
	stmt = inpDb.prepare("SELECT * FROM recipe_summary WHERE name = ?");
	outObj["recipe_summary"] = stmt.get(inpName);

	//Get all the ingredients
	stmt = inpDb.prepare("SELECT * FROM recipe_ingredients WHERE recipeName=?");
	outObj["recipe_ingredients"] = stmt.all(inpName);


	//Get all the instructions
	stmt = inpDb.prepare("SELECT * FROM recipe_instructions WHERE recipeName=?");
	outObj["recipe_instructions"] = stmt.all(inpName);

	//Get all the images
	stmt = inpDb.prepare("SELECT * FROM recipe_images WHERE recipeName=?");
	outObj["recipe_images"] = stmt.all(inpName);

	return outObj;
}



module.exports = { getRecipeNamesFromDb, getRecipeObjFromName };

