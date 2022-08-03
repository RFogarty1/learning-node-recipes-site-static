
--Initialise all relevant tables
--NOTE: The order is imporatnt here for idempotency, due to use of foreign keys
BEGIN TRANSACTION;
DELETE FROM recipe_ingredients;
DELETE FROM recipe_instructions;
DELETE FROM recipe_summary;
COMMIT TRANSACTION;

--Create some temporary variables
BEGIN TRANSACTION;
CREATE TEMP TABLE IF NOT EXISTS _tempVars(
varName TEXT PRIMARY KEY,
textVal TEXT);
DELETE FROM _tempVars;
INSERT INTO _tempVars (varName) VALUES ('currRecipeName');
COMMIT TRANSACTION;


--"Recipe" for Jacket Potato, cheese, and beans
BEGIN TRANSACTION;
UPDATE _tempVars SET textVal='Jacket Potato, Cheese, and Beans' WHERE varName='currRecipeName';
DELETE FROM recipe_summary WHERE name=(SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1);
DELETE FROM recipe_ingredients WHERE recipeName=(SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1);
DELETE FROM recipe_instructions WHERE recipeName=(SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1);

INSERT INTO recipe_summary (name) VALUES ((SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1));
INSERT INTO recipe_ingredients (recipeName, ingredientName, amount, units) VALUES
    ( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 'Baking Potato', 1, 'None' ),
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 'Cheddar Cheese', 50, 'g' ),
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 'Butter', 10, 'g' ),
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 'Baked Beans In Tomato Sauce', 100, 'g' );


INSERT INTO recipe_instructions (recipeName, idx, instruction) VALUES
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 0,
		'Preheat oven to 200 degrees Celsius'),
	( (SELECT textVal from _tempVars WHERE varName='currRecipeName' LIMIT 1), 1,
		'Put potato in oven for 1.5 hours'),
	( (SELECT textVal from _tempVars WHERE varName='currRecipeName' LIMIT 1), 2,
		'Heat beans in microwave (approximately 2 minutes'),
	( (SELECT textVal from _tempVars WHERE varName='currRecipeName' LIMIT 1), 3,
		'Cut potato in half and spread butter on top'),
	( (SELECT textVal from _tempVars WHERE varName='currRecipeName' LIMIT 1), 4,
		'Pour beans and grated cheese over the potato');
COMMIT TRANSACTION;


--Cheese Sandwich
BEGIN TRANSACTION;
UPDATE _tempVars SET textVal='Cheese Sandwich' WHERE varName='currRecipeName';
DELETE FROM recipe_summary WHERE name=(SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1);
DELETE FROM recipe_ingredients WHERE recipeName=(SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1);
DELETE FROM recipe_instructions WHERE recipeName=(SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1);

INSERT INTO recipe_summary (name) VALUES ((SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1));
INSERT INTO recipe_ingredients (recipeName, ingredientName, amount, units) VALUES
    ( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 'White Bread Slice', 2, 'None' ),
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 'Butter', 10, 'g'),
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 'Cheddar Slices', 3, 'None' );

INSERT INTO recipe_instructions (recipeName, idx, instruction) VALUES
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 0 ,
	  'Spread butter on one side of each slice'),
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 1 ,
	  'Add cheese slices to butter side of one slice'),
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 2 ,
	  'Place one buttered-side slice onto the other');



COMMIT TRANSACTION;

--Chicken Sandwich
BEGIN TRANSACTION;
UPDATE _tempVars SET textVal='Chicken Sandwich' WHERE varName = 'currRecipeName';
DELETE FROM recipe_summary WHERE name=(SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1);
DELETE FROM recipe_ingredients WHERE recipeName=(SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1);
DELETE FROM recipe_instructions WHERE recipeName=(SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1);

INSERT INTO recipe_summary(name) VALUES ((SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1));
INSERT INTO recipe_ingredients (recipeName, ingredientName, amount, units) VALUES
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 'White Bread Slice', 2, 'None'),
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 'Butter', 10, 'g'),
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 'Chicken Slices', 3, 'None');

INSERT INTO recipe_instructions (recipeName, idx, instruction) VALUES
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 0,
	  'Spread butter on one side of each slice'),
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 1,
	  'Add chicken slices to butter side of one slice'),
	( (SELECT textVal from _tempVars WHERE varName='currRecipeName' LIMIT 1), 2,
	  'Place one buttered-side slice onto the other');

COMMIT TRANSACTION;


--Rice Krispies and milk
BEGIN TRANSACTION;
UPDATE _tempVars SET textVal='Rice Krispies And Milk' WHERE varName='currRecipeName';
DELETE FROM recipe_summary WHERE name=(SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1);
DELETE FROM recipe_ingredients WHERE recipeName=(SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1);
DELETE FROM recipe_instructions WHERE recipeName=(SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1);

INSERT INTO recipe_summary(name) VALUES ((SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1));
INSERT INTO recipe_ingredients (recipeName, ingredientName, amount, units) VALUES
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 'Rice Krispies', 50, 'g'),
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 'Semi-Skimmed Milk', 50, 'ml');

INSERT INTO recipe_instructions (recipeName, idx, instruction) VALUES
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 0,
	  'Pour rice krispies into a bowl'),
	( (SELECT textVal FROM _tempVars WHERE varName='currRecipeName' LIMIT 1), 1,
	  'Pour milk over the rice krispies');

COMMIT TRANSACTION;



