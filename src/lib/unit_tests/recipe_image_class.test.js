

var imageA, imageB;

const testModule = require('./../recipe_class');

//Define setup/teardown
const _ingrSetup = () => {
	let _priority = 0;
	let _idx = 1;
	imageA = new testModule.RecipeImage("fileA", "jpg", _priority, _idx);
	imageB = new testModule.RecipeImage("fileA", "jpg", _priority, _idx);
}

//Define the tests
const _checkEqualCompareEqual = () => {
	let isEqual = testModule.areRecipeImageObjsEqual(imageA, imageB);
	expect(isEqual).toBe(true);
}

const _testEqualCompareEqual = () => test('Check equal RecipeImage instances compare equal', _checkEqualCompareEqual);


const _checkUnequalCmpUnequal_diffFilename = () => {
	imageB.filename += "-extra";
	let isEqual = testModule.areRecipeImageObjsEqual(imageA, imageB);
	expect(isEqual).toBe(false);
}

const _testUnequalCmpUnequal_diffFilename = () => {
	test('Check RecipeImages with different filenames compare unequal', _checkUnequalCmpUnequal_diffFilename);
}


const _checkUnequalCmpUnequal_diffExtension = () => {
	imageB.extension = "svg";
	let isEqual = testModule.areRecipeImageObjsEqual(imageA, imageB);
	expect(isEqual).toBe(false);
}


const _testUnequalCmpUnequal_diffExtension = () => {
	test('Check RecipeImages with different extensions compare unequal', _checkUnequalCmpUnequal_diffExtension);
}



//Create the test suite
let _testFuncts = [ _testEqualCompareEqual,
                    _testUnequalCmpUnequal_diffFilename,
                    _testUnequalCmpUnequal_diffExtension, ];

let runTests = () => {
	beforeEach(_ingrSetup);
	_testFuncts.forEach( (inpFunct) => inpFunct() );

}

describe( "Tests for equality between RecipeImage instances", runTests);
