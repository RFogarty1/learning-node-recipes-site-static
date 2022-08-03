
var ingredientA, recipeA;

const testModule = require('./../recipe_class');



//Define setup/teardown
const _ingrSetup = ()=> { ingredientA = new testModule.Ingredient("ingredient A", 25.4, "g");
                          ingredientB = new testModule.Ingredient("ingredient A", 25.4, "g"); }


//Define the tests [Ingredient comparisons]
const _checkEqualIngredientsCompareEqualA = () => {
	isEqual = testModule.areIngredientObjsEqual(ingredientA, ingredientA);
	expect(isEqual).toBe(true);
}

const _testEqualIngrCmpEqualA = ()=> test("Check equal ingredient objects compare equal", _checkEqualIngredientsCompareEqualA);


const _checkUnequalIngrCmpUnequal_diffNames = () => {
	ingredientB.name += " extra bit";
	isEqual = testModule.areIngredientObjsEqual(ingredientA, ingredientB);
	expect(isEqual).toBe(false);
}

const _testUnequalIngrCmpUnequal_diffNames = () => test("Check ingredients with different names compare unequal", _checkUnequalIngrCmpUnequal_diffNames);


const _checkUnequalIngrCmpUnequal_diffAmounts = () => {
	ingredientB.amount += 0.01;
	isEqual = testModule.areIngredientObjsEqual(ingredientA, ingredientB);
	expect(isEqual).toBe(false);
}

const _testUnequalIngrCmpUnequal_diffAmounts = () => test("Check ingredients with different amounts compare unequal", _checkUnequalIngrCmpUnequal_diffAmounts);


const _checkUnequalIngrCmpUnequal_diffUnits = () => {
	ingredientB.units = "ml";
	isEqual = testModule.areIngredientObjsEqual(ingredientA, ingredientB);
	expect(isEqual).toBe(false);
}

const _testUnequalIngrCmpUnequal_diffUnits = () => test("Check ingredients with different units compare unequal", _checkUnequalIngrCmpUnequal_diffUnits);



//Create the ingredient comparison test suite
let ingredientCmpTests = [_testEqualIngrCmpEqualA,
                          _testUnequalIngrCmpUnequal_diffNames,
                          _testUnequalIngrCmpUnequal_diffAmounts,
                          _testUnequalIngrCmpUnequal_diffUnits];

let runIngredientTests = () => { beforeEach(_ingrSetup); ingredientCmpTests.forEach((inpFunct)=>inpFunct()); }

describe("Ingredient Comparison Tests", runIngredientTests);




