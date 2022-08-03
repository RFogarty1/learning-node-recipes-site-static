
--Reset table to have no values in it
BEGIN transaction;
DELETE FROM ingredients_generic;
COMMIT transaction;

--Add some values into the table
BEGIN transaction;
INSERT into ingredients_generic (name) VALUES ('White Bread Slice');
INSERT into ingredients_generic (name) VALUES ("Cheddar Slices");
INSERT into ingredients_generic (name) VALUES ("Baking Potato");
INSERT into ingredients_generic (name) VALUES ("Butter");
INSERT into ingredients_generic (name) VALUES ("Cheddar Cheese");
INSERT into ingredients_generic (name) VALUES ("Rice Krispies");
INSERT into ingredients_generic (name) VALUES ("Semi-Skimmed Milk");
INSERT into ingredients_generic (name) VALUES ("Baked Beans In Tomato Sauce");
INSERT into ingredients_generic (name) VALUES ("Chicken Slices");
COMMIT transaction;

SELECT name FROM ingredients_generic;
