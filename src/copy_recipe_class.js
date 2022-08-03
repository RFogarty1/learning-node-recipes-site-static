
const path = require('path');
const fs = require('fs');
const cfgVars = require('./config_vars.js');

function copyRecipesClassesOver(fileObjs, metalsmithInstance){

	//Copy the file verbatim
	_copyFileOver(fileObjs);

	//Modify the exports button such that it works with ES6
	_convertFileObjToES6Compat(fileObjs[path.join("javascript","lib", "recipe_class.js")]);

	return null;
}

//src/lib/recipe_class.js
//Note we have to get it from src dir
function _copyFileOver(fileObjs){
	let inpPath = path.join(cfgVars.SRC_PATH, "lib", "recipe_class.js");
	let outPath = path.join("javascript","lib", "recipe_class.js");

	let fileString = fs.readFileSync(inpPath).toString();

	let outFile = { contents: Buffer.from( fileString ) };
	fileObjs[outPath] = outFile;

	return null;
}

function _convertFileObjToES6Compat(fileObj){
	fileObj.contents = fileObj.contents.toString().replace("module.exports =", "export default");
}


module.exports = { copyRecipesClassesOver };


