
const Metalsmith = require('metalsmith');
const dbInstance = require('./src/lib/db_instance.js');
const cfgVars = require('./src/config_vars.js');
const { _createHomePage } = require('./src/homePage.js');
const { createRecipePages } = require('./src/recipe_pages.js');
const { addHeaderToAllPages } = require('./src/add_header.js');
const { dumpAllRecipeData } = require('./src/dump_recipes_data.js');
const { copyRecipesClassesOver } = require('./src/copy_recipe_class.js');
const path = require('path');


const _buildCallback = (err,files) => {
	if (err) throw (err);
};


function _connectToDbPlugin(fileObjs, metalsmithInstance){
	dbInstance.openDatabase();
}

function _closeDbPlugin(fileObjs, metalsmithInstance){
	dbInstance.closeDatabase();
}

function _deleteTemplatesPlugin(fileObjs, metalsmithInstance){

	//there are ways to automate but will only have a couple of templates at most so....
	templatePaths = [ path.join("templates", "recipe_template.html") ]

	for (let i=0; i < templatePaths.length; i++){
		delete fileObjs[templatePaths[i]];
	}

}

Metalsmith(__dirname)
	.source(cfgVars.CONTENT_PATH)
	.destination(cfgVars.BUILD_PATH)
	.use( _connectToDbPlugin )
	.use(_createHomePage)
	.use(createRecipePages)
	.use(copyRecipesClassesOver)
	.use(dumpAllRecipeData)
	.use(_closeDbPlugin )
	.use(addHeaderToAllPages)
	.use( _deleteTemplatesPlugin )
	.build( _buildCallback );
