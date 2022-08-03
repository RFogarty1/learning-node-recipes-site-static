
const jsdom = require('jsdom');
const recipeObjHelp = require('./../../../../src/lib/recipe_class');
const recipePageHelp = require('./../../../../src/recipe_pages');
const testModule = require('./../scale_recipe_quantities');
//import testModule from './../scale_recipe_quantities';

var DOCUMENT_OBJ = null;
var AMOUNTS_INSTANCE = null;

const _setupFunct = () => {
	_initializePage();
	_initializeAmountsInstance();
}

const _initializePage = () => {
	let outDom = new jsdom.JSDOM()
	DOCUMENT_OBJ = outDom.window.document;

	DOCUMENT_OBJ.body.innerHTML = "<h2> PLACEHOLDER </h2> <h2> SECOND </h2>";

	let ingredients = [ new recipeObjHelp.Ingredient("ingrA", 10, 'g'),
	                    new recipeObjHelp.Ingredient("ingrB", 25, 'ml') ];

	let instructions = ["instructA", "instructB", "instructC"];

	let recipeObj = new recipeObjHelp.Recipe("recipeA", ingredients, instructions);

	recipePageHelp.addRecipeHTMLToDocument(DOCUMENT_OBJ, recipeObj);

}

const _initializeAmountsInstance = () => {
	AMOUNTS_INSTANCE = testModule.ScalableAmounts.fromDocument(DOCUMENT_OBJ);
}

//Define the tests
const _checkScaleQuantities = () => {
	let scaleFactor = 3;
	let expAmounts = [30,75];
	let actAmounts = AMOUNTS_INSTANCE.getScaledValues(scaleFactor);

	expect(actAmounts.length).toBe(expAmounts.length);

	for (let i=0; i < expAmounts.length; i++){
		expect(actAmounts[i]).toBe(expAmounts[i]);
	}

}

const _testExpectedScaleQuantities = () => test("Check scale factor applied correctly", _checkScaleQuantities);



//Test repl
const _checkReplaceIngrAmountsWithScaledQuantities = () => {
	let scaleFactor = 3;
	expAmounts = AMOUNTS_INSTANCE.getScaledValues(scaleFactor);
	AMOUNTS_INSTANCE.replaceDocValsWithScaled(DOCUMENT_OBJ, scaleFactor);

	let scaledAmountsInstance = testModule.ScalableAmounts.fromDocument(DOCUMENT_OBJ);
	actAmounts = scaledAmountsInstance.initialAmounts;

	expect(actAmounts.length).toBe(expAmounts.length);

	for (let i=0; i < expAmounts.length; i++){
		expect(actAmounts[i]).toBe(expAmounts[i]);
	}

}

const _testExpectedIngrAmountsReplaced = () => test("Check ingredient amounts replaced with scaled values in the DOM", _checkReplaceIngrAmountsWithScaledQuantities);




let _scaleQuantitiesTests = [ _testExpectedScaleQuantities,
                              _testExpectedIngrAmountsReplaced ]

const _runAllTests = () => {
	beforeEach(_setupFunct);
	_scaleQuantitiesTests.forEach( (inpFunct) => inpFunct() );
}

describe("Scale quantities tests", _runAllTests );

