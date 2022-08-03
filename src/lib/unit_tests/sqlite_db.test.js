

const testCode = require('../db_inter');
const sqlite = require('better-sqlite3');
const recipeClsHelp = require('../recipe_class');

var db;

const _createAndOpenDatabase = () => {
	db = new sqlite(':memory:');

	//Think we need to serialize to make sure 1 command ends before the other starts
	_runFunction = () => {
		//NOTE: using exec is less safe + slower than using prepared statements. But not too much of an issue for setting up the test db
		//Create the summary table
		db.exec("CREATE TABLE recipe_summary (id INTEGER, name TEXT)");
		db.exec("INSERT INTO recipe_summary (id, name) VALUES (1, 'recipe A'), (2, 'recipe B')");

		//Create the recipe ingredient table
		db.exec("CREATE TABLE recipe_ingredients (id INTEGER PRIMARY KEY, recipeName TEXT, ingredientName TEXT, amount REAL, units TEXT)");
		db.exec(`INSERT INTO recipe_ingredients (id, recipeName, ingredientName, amount, units) VALUES
		        (1, 'recipe A', 'ingredient AA', 5.2, 'g'),
		        (2, 'recipe A', 'ingredient AB', 17.5, 'g');`);

		//Create the recipe instructions table
		db.exec(`CREATE TABLE recipe_instructions (id INTEGER PRIMARY KEY, recipeName TEXT, idx INTEGER, instruction TEXT)`);
		db.exec(`INSERT INTO recipe_instructions (id, recipeName, idx, instruction) VALUES
		        (1, 'recipe A', 0, 'instruction AA'),
		        (2, 'recipe A', 2, 'instruction AC'),
		        (3, 'recipe A', 1, 'instruction AB'),
		        (4, 'recipe B', 0, 'instruction BA');`);

		//Create the recipe images table. 
		db.exec(`CREATE TABLE recipe_images (id INTEGER PRIMARY KEY, recipeName TEXT, priority INTEGER, fileName TEXT, extension TEXT)`);
		db.exec(`INSERT INTO recipe_images (id, recipeName, priority, filename, extension) VALUES
		         (3, 'recipe A', 0, 'imageAA', 'jpg'),
		         (1, 'recipe B', 0, 'imageBA', 'jpg'),
		         (2, 'recipe A', -1, 'imageAB', 'svg'),
		         (0, 'recipe A', 0, 'imageAC', 'jpg');`);


	}

	_runFunction();
};


const _closeAndDeleteDatabase = () => {
	db.close();
};


//Define tests
const _checkExpectedRecipeNamesA = async () => {
	let expNames = ['recipe A', 'recipe B']
	let actNames = await testCode.getRecipeNamesFromDb(db);

	expect(expNames.length).toEqual(actNames.length);
	for (let i =0; i < expNames.length; i++){
		expect(expNames[i]).toEqual(actNames[i]);
	}
}

const _testExpectedRecipeNames = () => {
	test("Test we get expected recipe names from database", _checkExpectedRecipeNamesA);
}

//TODO: Test with images involved
//NOTE: Need to explicitly test the idx AND priority are as expected
const _checkExpectedRecipeObjectRetrievedA = async () => {
	//Construct our expected object
	let ingredientAA = new recipeClsHelp.Ingredient('ingredient AA', 5.2, 'g');
	let ingredientAB = new recipeClsHelp.Ingredient('ingredient AB', 17.5, 'g');

	//construct images; these should be ordered by priority THEN id
	let imageAA = new recipeClsHelp.RecipeImage('imageAA', 'jpg',  0, 3);
	let imageAB = new recipeClsHelp.RecipeImage('imageAB', 'svg', -1, 2);
	let imageAC = new recipeClsHelp.RecipeImage('imageAC', 'jpg',  0, 0);

	let expRecipe = new recipeClsHelp.Recipe('recipe A', [ingredientAA, ingredientAB],
	                                     ['instruction AA', 'instruction AB', 'instruction AC'],
	                                     [imageAB, imageAC, imageAA]);


	let actRecipe = await testCode.getRecipeObjFromName('recipe A', db);
	let isEqual = recipeClsHelp.areRecipeObjsEqual(expRecipe, actRecipe);


	expect(isEqual).toEqual(true);
	expect(expRecipe.id).toEqual(actRecipe.id);
	expect(expRecipe.priority).toEqual(actRecipe.priority);

}

const _testExpectedRecipeObjFromNameA = () => {
	test("Test we get the expected recipe object from a recipe name", _checkExpectedRecipeObjectRetrievedA);
}


//Define our test suite
let testsToUse = [ _testExpectedRecipeNames,
                   _testExpectedRecipeObjFromNameA ];

const fullTestFunct = () => {
	beforeAll( _createAndOpenDatabase );
	afterAll( _closeAndDeleteDatabase );
	testsToUse.forEach( (inpFunct) => inpFunct() );
}

describe("Sqlite3 Interface tests", fullTestFunct);


