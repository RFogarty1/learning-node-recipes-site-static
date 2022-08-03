
const jsdom = require('jsdom');
const path = require('path');

const addHeaderToAllPages = (fileObjs, metalsmithInstance) => {
	for (let prop in fileObjs){
		if (prop.endsWith(".html") == true)
			{
				_addHeaderToHtml(prop, fileObjs[prop]);
			}
	}
}

const _addHeaderToHtml = (fileKey, fileObj) => {
	let outHtml = _getHeaderHtml(fileKey);

	let currDom = new jsdom.JSDOM( fileObj.contents.toString() );

	currDom.window.document.querySelector("body").insertAdjacentHTML("afterBegin", outHtml);
	fileObj.contents = new Buffer.from ( currDom.serialize() );


}


const _getHeaderHtml = (fileKey) => {
	let startPath = path.sep;
	let endPath = path.join(path.sep,path.dirname(fileKey));

	let homePath = path.join( path.relative(endPath,startPath), 'index.html' ) 
	let shopListPath = path.join( path.relative(endPath, startPath), 'create_shopping_list.html');

	let outHTML = `<ul class="nav-bar">
	                 <a href="${homePath}"><li class="btnA"> All Recipes </li></a>
	                 <a href="${shopListPath}"><li class="btnA"> Create Shopping List </li> </a>
	               </ul>`;

	return outHTML;
}



module.exports = { addHeaderToAllPages };
