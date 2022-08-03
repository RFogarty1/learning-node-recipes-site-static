
const fs = require('fs');
const jsdom = require('jsdom');
const path = require('path');
const cfgVars = require('./config_vars');
const dbInter = require('./lib/db_inter');
const dbInstance = require('./lib/db_instance');
const recipePathHelp = require('./lib/recipe_paths');


function createRecipePages(fileObjs, metalsmithInstance){
	
	let recipeNames = dbInter.getRecipeNamesFromDb(dbInstance.getDatabase());

	for (let i=0; i < recipeNames.length; i++){
		_createSingleRecipePage(recipeNames[i], fileObjs);
	}

}


function _createSingleRecipePage(inpRecipeName, fileObjs){
	//Step 1 = Create the template at the correct location
	let dirName = "recipe_pages";
	let outPath = path.join(dirName, recipePathHelp.getRecipeFilenameFromName(inpRecipeName)) + ".html";

	let templateKey = path.join("templates","recipe_template.html")
	let file = { contents: Buffer.from( fileObjs[templateKey]["contents"].toString() ) };
	fileObjs[outPath] = file;

	//Step 2 = use jsDom to modify the template file with specific details for this recipe
	let domObj = new jsdom.JSDOM(file["contents"].toString());

	//Modify the title of the page
	domObj.window.document.querySelector("title").innerHTML = inpRecipeName;
	domObj.window.document.querySelector("h1").innerHTML = inpRecipeName;

	//Get an object representing this recipe
	let recipeObj = dbInter.getRecipeObjFromName(inpRecipeName ,dbInstance.getDatabase() );
	addRecipeHTMLToDocument(domObj.window.document, recipeObj);

	//Replace the buffer with new contents
	file.contents = Buffer.from( domObj.serialize() );

};


const addRecipeHTMLToDocument = (inpDoc, recipeObj) => {

	//Add an image IF one is present (later can add a gallery if desired)
	if (recipeObj.images.length > 0){
		let imgPath = path.join("..", "recipe_images", recipeObj.images[0].filename + "." + recipeObj.images[0].extension);
		let imgHtml = `<figure> <img class=recipe-page-image src=${imgPath}></figure>`;
		inpDoc.querySelector("h1").insertAdjacentHTML("afterEnd", imgHtml);
	}


	//Add a list of ingredients
	let ingredientsHeader = inpDoc.querySelector("h2");
	let ingredientsListHTML = _getIngredientsHtmlFromRecipeObj(recipeObj);
	ingredientsHeader.insertAdjacentHTML("afterEnd", ingredientsListHTML);

	//Add a list of instructions IN ORDER
	let instructionsHeader = inpDoc.querySelectorAll("h2")[1];
	let instructionsListHTML = _getInstructionsHtmlFromRecipeObj(recipeObj);
	instructionsHeader.insertAdjacentHTML("afterEnd", instructionsListHTML);

}

const _getIngredientsHtmlFromRecipeObj = (recipeObj) => {
	let currStr, unitStr;
	let outStr = '<ul class=ingredient-list>\n'

	const _getStrFromUnit = (inpUnit) => {
		if (inpUnit != 'None') return `${inpUnit}`;
		return ``;
	}

	for (let i=0; i < recipeObj.ingredients.length; i++){
		currStr = `<ingr-amount>${recipeObj.ingredients[i].amount}</ingr-amount> `;
		currStr += '<ingr-units>' + _getStrFromUnit( recipeObj.ingredients[i].units ) + '</ingr-units>';
		currStr += ` <ingr-name>${capitalizeStr(recipeObj.ingredients[i].name)}</ingr-name>`;
		outStr += '<li>' + currStr + '</li>\n';
	}

	return outStr

}

const _getInstructionsHtmlFromRecipeObj = (recipeObj) => {
	let currStr;
	let outStr = '<ol class=recipe-instructions>\n';

	for (let i =0; i < recipeObj.instructions.length; i++){
		outStr += `<li> ${recipeObj.instructions[i]} </li>\n`;
	}

	outStr += '</ol>';

	return outStr;
}

const capitalizeStr = str => str.charAt(0).toUpperCase() + str.substring(1);

module.exports = { createRecipePages, addRecipeHTMLToDocument };
