
PRAGMA foreign_keys = ON;


--Create the generic ingredients table.
--TODO: Create an array to store keys for specific versions. These will each ahve to have their own table i guess (with things like price, rating etc.)
--TODO: Its likely we need to store an "allowed units" in this table. Possibly even a single allowed unit (tsp/tbsp are the main things that are easily converted between units)
DROP TABLE IF EXISTS ingredients_generic;

CREATE TABLE ingredients_generic(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE COLLATE NOCASE
    );
    

--The main recipes table; contains simplest searchable + summary info
DROP TABLE IF EXISTS recipe_summary;

CREATE TABLE recipe_summary(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE COLLATE NOCASE
    );


--Table for indivdual recipe ingredients; recipes has a 1:n relationship with this table
DROP TABLE IF EXISTS _validUnits;
CREATE TABLE _validUnits(
    unit TEXT PRIMARY KEY
    );

INSERT INTO _validUnits(unit) VALUES ('g'), ('tsp'), ('tbsp'), ('ml'), ('None');


DROP TABLE IF EXISTS recipe_ingredients;
CREATE TABLE recipe_ingredients(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipeName TEXT REFERENCES recipe_summary(name) ON UPDATE CASCADE,
    ingredientName TEXT REFERENCES ingredients_generic(name) ON UPDATE CASCADE,
    amount REAL,
    units TEXT REFERENCES _validUnits(unit) ON UPDATE CASCADE
    );

--Table for individual recipe instructions
DROP TABLE IF EXISTS recipe_instructions;

CREATE TABLE recipe_instructions(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipeName TEXT REFERENCES recipe_summary(name) ON UPDATE CASCADE,
    idx INTEGER,
    instruction TEXT
    );


--Table for pictures for each recipe
--Note: We SHOULD use some triggers to control the priority values here, but not doing so yet (YAGNI)
DROP TABLE IF EXISTS recipe_images;

CREATE TABLE recipe_images(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	recipeName TEXT REFERENCES recipe_summary(name) ON UPDATE CASCADE,
	priority INTEGER DEFAULT 0,
	fileName TEXT,
	extension TEXT);



