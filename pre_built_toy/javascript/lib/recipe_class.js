

class Ingredient {
	constructor (name, amount, units){
		this.name = name;
		this.amount = amount;
		this.units = units;
	}
}

//Note that priority/idx arent used when comparing for equality
class RecipeImage {
	constructor(filename, extension, priority, idx){
		this.filename = filename;
		this.extension = extension;
		this.priority = priority;
		this.idx = idx;
	}
}


class Recipe {
	constructor(name, ingredients, instructions, images=null){
		this.name = name;
		this.ingredients = ingredients;
		this.instructions = instructions;
		//Not sure if needed in JS (it is in python)
		if (images==null){
			this.images = [];
		} else {
			this.images = images;
		}
	}
}


function areRecipeImageObjsEqual(objA, objB) {

	if (objA.filename != objB.filename) return (false);
	if (objA.extension != objB.extension) return (false);
	return true;
}

function areIngredientObjsEqual(objA, objB, amountTol=1e-5){
	if (objA.name != objB.name) return(false);
	if (Math.abs(objA.amount-objB.amount) > Math.abs(amountTol) ) return(false);
	if (objA.units != objB.units) return(false);
	return true;
}

function areRecipeObjsEqual(objA, objB, ingredientTol=1e-5){
	if (objA.name != objB.name) return(false);
	if ( _areIngredientListsEqual(objA.ingredients, objB.ingredients, ingredientTol)!=true){
		 return(false)};

	if (_areStringListsEqual(objA.instructions, objB.instructions)!=true) return (false);

	if (_areImageListsEqual(objA.images, objB.images)!=true) return (false);

	return true;
}

const _areStringListsEqual = (listA, listB) => {
	if (listA.length != listB.length) return false;

	for (let i=0; i< listA.length; i++){
		if (listA[i] != listB[i]) return false
	}

	return true;
}

const _areIngredientListsEqual = (listA, listB, amountTol) => {
	if (listA.length != listB.length) return false;

	for (let i=0; i< listA.length; i++){
		if (!areIngredientObjsEqual(listA[i],listB[i],amountTol)) return false;
	}

	return true;
}


const _areImageListsEqual = (listA, listB) => {
	if (listA.length != listB.length) return false;

	for (let i=0; i < listA.length; i++){
		if ( areRecipeImageObjsEqual(listA[i],listB[i])!=true ) return false;
	}

	return true;
}

export default { Ingredient, Recipe, RecipeImage, areRecipeImageObjsEqual, areIngredientObjsEqual, areRecipeObjsEqual };

