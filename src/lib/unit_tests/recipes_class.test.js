
var ingredientA, ingredientB, recipeA, recipeB;
var imageA, imageB;

const testModule = require('./../recipe_class');



//Define setup/teardown
const _imageSetup = ()=> {imageA = new testModule.RecipeImage("fileA", "jpg", 1, 1);
                          imageB = new testModule.RecipeImage("fileB", "jpg", 1, 1); }

const _ingrSetup = ()=> { ingredientA = new testModule.Ingredient("ingredient A", 25.4, "g");
                          ingredientB = new testModule.Ingredient("ingredient B", 25.4, "g"); }

const _recipeSetup = ()=> { 
	recipeA = new testModule.Recipe("Recipe A", [ingredientA, ingredientB], ["Do A", "Do B"], [imageA, imageB]);
	recipeB = new testModule.Recipe("Recipe A", [ingredientA, ingredientB], ["Do A", "Do B"], [imageA, imageB]);
	}

//Define the tests
const _checkEqualRecipesCmpEqual = ()=> {
	isEqual = testModule.areRecipeObjsEqual(recipeA, recipeB);
	expect(isEqual).toBe(true);
}

const _testEqualCmpEqual = () => test("Test Equal recipe objects compare equal", _checkEqualRecipesCmpEqual);


const _checkUnequalRecipesCmpUnequal_diffNames = ()=> {
	recipeB.name += " extra bit";
	isEqual = testModule.areRecipeObjsEqual(recipeA, recipeB);
	expect(isEqual).toBe(false);
}

const _testUnequalCmpUnequal_diffNames = () => {
	test("Test recipe objects wtih different names compare unequal", _checkUnequalRecipesCmpUnequal_diffNames);
}


const _checkUnequalRecipesCmpUnequal_diffNumberIngredients = () => {
	recipeB.ingredients = [ingredientA, ingredientB, ingredientA];
	isEqual = testModule.areRecipeObjsEqual(recipeA, recipeB);
	expect(isEqual).toBe(false);
}

const _testUnequalCmpUnequal_diffNumberIngredients = () => {
	test("Test recipe objecst with different numbers of ingredients compare unequal", _checkUnequalRecipesCmpUnequal_diffNumberIngredients);
}


const _checkUnequalRecipesCmpUnequal_diffIngredients = () => {
	recipeB.ingredients[1] = ingredientA;
	isEqual = testModule.areRecipeObjsEqual(recipeA, recipeB);
	expect(isEqual).toBe(false);
}

const _testUnequalCmpUnequal_diffIngredients = () => {
	test("Test recipe objects with different ingredients compare unequal", _checkUnequalRecipesCmpUnequal_diffIngredients);
}


const _checkUnequalRecipesCmpUnequal_diffNumberInstructions = () => {
	recipeB.instructions += "New instruction";
	isEqual = testModule.areRecipeObjsEqual(recipeA, recipeB);
	expect(isEqual).toBe(false);
}

const _testUnequalCmpUnequal_diffNumberInstructions = () => {
	test("Test recipe objects with different numbers of instructions compare unequal", _checkUnequalRecipesCmpUnequal_diffNumberInstructions);
}


const _checkUnequalRecipesCmpUnequal_diffInstructions = () => {
	recipeB.instructions[1] += ". New part";
	isEqual = testModule.areRecipeObjsEqual(recipeA, recipeB);
	expect(isEqual).toBe(false);
}

const _testUnequalCmpUnequal_diffInstructions = () => {
	test("Test recipe objects with different instructions compare unequal", _checkUnequalRecipesCmpUnequal_diffInstructions);
}


const _checkUnequalRecipesCmpUnequal_diffNumberImages = () => {
	recipeB.images = [imageA];
	isEqual = testModule.areRecipeObjsEqual(recipeA, recipeB);
	expect(isEqual).toBe(false);
}

const _testUnequalRecipesCmpUnequal_diffNumberImages = () => {
	test("Test recipe objects with different numbers of images compare unequal", _checkUnequalRecipesCmpUnequal_diffNumberImages);
}


const _checkUnequalRecipesCmpUnequal_diffImages = () => {
	recipeB.images[0] = imageB;
	isEqual = testModule.areRecipeObjsEqual(recipeA, recipeB);
	expect(isEqual).toBe(false);
}

const _testUnequalRecipesCmpUnequal_diffImages = () => {
	test("Test recipe objects with different images compare unequal", _checkUnequalRecipesCmpUnequal_diffImages);
}

//Define the test suite
let recipeEqTests = [_testEqualCmpEqual,
                     _testUnequalCmpUnequal_diffNames,
                     _testUnequalCmpUnequal_diffNumberIngredients,
                     _testUnequalCmpUnequal_diffIngredients,
                     _testUnequalCmpUnequal_diffNumberInstructions,
                     _testUnequalCmpUnequal_diffInstructions,
                     _testUnequalRecipesCmpUnequal_diffNumberImages,
                     _testUnequalRecipesCmpUnequal_diffImages,
]

const runRecipeEqTests = () => {
	beforeEach( _imageSetup);
	beforeEach( _ingrSetup );
	beforeEach( _recipeSetup );
	recipeEqTests.forEach( (inpFunct) => inpFunct() );
}

describe("Recipe Comparison Tests", runRecipeEqTests);
