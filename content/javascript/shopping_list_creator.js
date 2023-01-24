
import recipeClsHelp from './lib/recipe_class.js';


var ALL_RECIPE_OBJS = null;
var RECIPE_IDX = 0;

//Setup functions to add forms
const _addRecipeFormElement = (event) => {

	let formList = document.querySelector("form")
	
	let innerFormHTML = `
	<div class="single-recipe-form">
		<label> Recipe Name </label>
		<input name="recipe-name-${RECIPE_IDX}" list="recipe-names" required>
		<label> Number of Portions </label>
		<input name="nPortions-${RECIPE_IDX}" type="number" value=1 min=0 step=any required>
		<label> Instances </label>
		<input name="nInstances-${RECIPE_IDX}" type="number" value=1 min=0 step=1 required>
	</div>
	`

	formList.insertAdjacentHTML("beforeEnd", innerFormHTML)	

	console.log("Adding recipe form element");
	RECIPE_IDX += 1;
	event.preventDefault();
}


//
const _setRecipeDataListVals = () => {
	let dataList = document.querySelector('#recipe-names');
	let outHtml = ``;
	for (let i=0; i < ALL_RECIPE_OBJS.length; i++){
		outHtml += `<option value = "${ALL_RECIPE_OBJS[i].name}">`;
	}

	dataList.insertAdjacentHTML("beforeEnd", outHtml);

	return null;
}

const _populateRecipeObjsFromJson = (inpData) => {
	let outList = [];
	console.log(inpData);
	for (let i = 0; i < inpData['recipes'].length; i++){
		outList.push( JSON.parse(inpData['recipes'][i] ) );
	}
	ALL_RECIPE_OBJS = outList;
}


//Initialize the page
const _readDataIn = () => {
	let relPath = "../data/recipes_data.txt";
	fetch(relPath)
  	.then(response => response.json())
//	.then(data => {ALL_RECIPE_OBJS = data; console.log(data); console.log(ALL_RECIPE_OBJS)})
	.then(data => _populateRecipeObjsFromJson(data) )
	.then( unused => {window.tempDebug = { ALL_RECIPE_OBJS }} )
	.then( _setRecipeDataListVals )
  	.catch(error => console.log(error));
}


//Initialize some variables from our data folder
_readDataIn();
//_setRecipeDataListVals();




//Code for dealing with the lists

const createOutputList = () => {
	let inpIngredients = _getIngredientsFromForm();
	let outHTML = _getListHTMLFromIngredientsList(inpIngredients);
	let outputListHeader = document.querySelector(".output-list");

	outputListHeader.innerHTML = outHTML; 
	console.log(outHTML);
}


const _getIngredientsFromForm = () => {
	let formData = _getFormData();

	//Get recipe names + check their ok
	let recipeNames = [];
	let currName = null;
	for (let i = 0; i < RECIPE_IDX; i++){
		currName = formData["recipe-name-" + i]
		recipeNames.push( currName );
		if (_isValidRecipeName(currName)==false){
			alert(`${currName} is an invalid value for Recipe Name`);
		}
	} 

	//Figure out the portions and instances for each recipe
	let portionsEach = [];
	let instancesEach = [];

	for (let i = 0; i < RECIPE_IDX; i++){
		portionsEach[i] = formData["nPortions-"+i];
		instancesEach[i] = formData["nInstances-"+i];
	}	

	//Create the list of ingredients objects
	let currRecipeObj = null;
	let outIngrs = {};
	for (let i = 0; i < RECIPE_IDX; i++){
		console.log(`Current recipe name is ${recipeNames[i]}`);
		currRecipeObj = _getRecipeObjFromName(recipeNames[i]);
		console.log(`Current recipe object is ${currRecipeObj}`);
		_addRecipeObjDataToIngrs(currRecipeObj, portionsEach[i], instancesEach[i], outIngrs);
	}

	console.log(recipeNames);
	console.log(outIngrs);

	return outIngrs;
}


const _getFormData = () => {
	const formData = new FormData( document.querySelector("form") );
	const formProps = Object.fromEntries(formData);

	console.log(formData);
	console.log(formProps);

	return formProps;
}

const _isValidRecipeName = (recipeName) => {
	let allRecipeNames = ALL_RECIPE_OBJS.map( (inpVal) => inpVal.name );
	if (allRecipeNames.includes(recipeName) == true) return true 
	return false;
}


const _getRecipeObjFromName = (recipeName) => {
	for (let i = 0; i < ALL_RECIPE_OBJS.length; i++){
		if (ALL_RECIPE_OBJS[i].name == recipeName) return ALL_RECIPE_OBJS[i];
	}
	return null;
}

const _addRecipeObjDataToIngrs = (recipeObj, nPortions, nInstances, outIngrs) => {
	let currIngr = null;
	let currCopy = null;

	console.log(recipeObj.ingredients);

	console.log(Object.keys(outIngrs));
	for (let i = 0; i < recipeObj.ingredients.length; i++){
		currIngr = recipeObj.ingredients[i]
		currCopy = new recipeClsHelp.Ingredient( currIngr.name, currIngr.amount*nPortions, currIngr.units );

		console.log(`nInstances = ${nInstances}`);
		for (let j = 0; j < nInstances; j++){
			if (Object.hasOwn(outIngrs, currIngr.name)==true){
				outIngrs[currIngr.name].push( currCopy );
//				console.log("ALREADY HERE");
			} else {
				outIngrs[currIngr.name] = [currCopy];
//				console.log("NOT HERE");
			}
		}
	}

	return null;
} 

const _getListHTMLFromIngredientsList = (inpIngrs) => {
	let outNames = Object.keys(inpIngrs)
	outNames.sort();
	let outHTML = ``;
	let currObjs = null;
	let currObj = null;
	let currUnits = null;
	console.log(outNames);

	for (let i = 0; i < outNames.length; i++){
		currObjs = inpIngrs[ outNames[i] ];
		console.log(outNames[i]);
		outHTML += `<li> ${capitalizeStr(currObjs[0].name)}`;
		for (let j = 0; j < currObjs.length; j++){
			currObj = currObjs[j];
			if (j > 0){
				outHTML += "+";
			}
			currUnits = currObj.units == "None" ? "":currObj.units; 
			outHTML += ` ${+parseFloat(currObj.amount).toFixed(2)} ${currUnits} `;
		}
		outHTML += `</li>\n`;
	}

	return outHTML;
}



const capitalizeStr = str => str.charAt(0).toUpperCase() + str.substring(1);

//Connect things up
let addRecipeBtn = document.querySelector(".add-recipe-btn");
let createListBtn = document.querySelector(".create-shopping-list-btn");


//Setup event listeners
addRecipeBtn.addEventListener("click", _addRecipeFormElement);
createListBtn.addEventListener("click", createOutputList);

