
const testModule = require('./../recipe_paths');

//Define the tests
const _checkCamelCaseInput = () => {
	let inpVal = "recipeA";
	let expVal = "recipeA";
	let actVal = testModule.getRecipeFilenameFromName(inpVal);
	expect(actVal).toBe(expVal);
}

const _testCamelCaseInput = ()=> test("Check we get expected name from camel case recipe name", _checkCamelCaseInput);


const _checkInputWithSpaces = () => {
	let inpVal = "recipe  A is good";
	let expVal = "recipe-A-is-good";
	let actVal = testModule.getRecipeFilenameFromName(inpVal);
	expect(actVal).toBe(expVal);
}

const _testInputWithSpaces = ()=> test("Check we get expected name for recipe with spaces", _checkInputWithSpaces);


const _checkInputWithCommas = () => {
	let inpVal = "recipe with A, B, C";
	let expVal = "recipe-with-A-B-C";
	let actVal = testModule.getRecipeFilenameFromName(inpVal);
	expect(actVal).toBe(expVal);
}

const _testWithCommas = () => {
	test("Check we get expected name for recipe with commas", _checkInputWithCommas);
}

//Need to create the tests at the bottom of the file for now
let _recipeFilenameTests = [ _testCamelCaseInput, 
                             _testInputWithSpaces,
                             _testWithCommas, ]

describe("Recipe-Filenames Tests", ()=> _recipeFilenameTests.forEach( (inpFunct)=>inpFunct() ));
 
