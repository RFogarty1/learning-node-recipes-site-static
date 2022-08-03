


function getRecipeFilenameFromName(recipeName) {
	let outStr = recipeName.trim();
	outStr = outStr.replace( /\s+/g, '-' );
	outStr = outStr.replace(/,/g,"");
	return outStr;
}

module.exports = { getRecipeFilenameFromName };

