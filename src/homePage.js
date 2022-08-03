
const jsdom = require('jsdom');
const dbInter = require('./lib/db_inter');
const dbInstance = require('./lib/db_instance');
const recipePathHelp = require('./lib/recipe_paths');
const path = require('path');

let homeFileName = "index.html";

//TODO: V.much the high-level function. Will add header/recipe summaries with links/footer
function _createHomePage(fileObjs, metalsmithInstance){
	_addRecipeListToHomepage(fileObjs, metalsmithInstance);
}


function _addRecipeListToHomepage(fileObjs, metalsmithInstance)
{
	let recipeNames = _getRecipeNames()
	let inpFileObj = fileObjs[homeFileName];

	_addContentsForRecipeNames(inpFileObj, recipeNames);
}

//Will largely replace with external call to sqlite database
function _getRecipeNames(){

//	return ["recipeA", "recipeB", "recipeD"]
	return dbInter.getRecipeNamesFromDb(dbInstance.getDatabase());

}

function _addContentsForRecipeNames(inpFileObj, recipeNames){

	let inpFileStr = inpFileObj["contents"].toString();
	let domObj = new jsdom.JSDOM(inpFileStr);

	let listEle = domObj.window.document.querySelector(".recipes-grid");
	let currImagePath;
	let newHTMLStr = ""
	let recipeObjs = recipeNames.map( (inpName) => dbInter.getRecipeObjFromName(inpName, dbInstance.getDatabase()) );

	for (let i = 0; i < recipeNames.length; i++){
		let currPath = path.join("recipe_pages", recipePathHelp.getRecipeFilenameFromName(recipeNames[i]) ) + ".html";
		if (recipeObjs[i].images.length == 0){
			currImagePath = path.join("recipe_images", "placeholder.png");
		} else {
			currImagePath = path.join("recipe_images", recipeObjs[i].images[0].filename + "." + recipeObjs[i].images[0].extension);
		}

		newHTMLStr += `\n\t\t\t<li class="recipe-summary-box"><a href=${currPath}>
		               <figure> <img src="${currImagePath}" class="recipe-box-image">
		               <figcaption>${recipeNames[i]}</figcaption></figure></a></li>`;
	};


	newHTMLStr += "\n\t\t";
	listEle.insertAdjacentHTML("beforeEnd",newHTMLStr); 
	inpFileObj.contents = Buffer.from( domObj.serialize() );

}



module.exports = { _createHomePage };
