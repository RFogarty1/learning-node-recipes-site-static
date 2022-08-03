
const sqlite = require('better-sqlite3');
const cfgVars = require('./../config_vars');

//var DATABASE = new sqlite3.Database('../../database/toy-db-att1.sqlite');
var DATABASE = null;

function openDatabase(){
	if (DATABASE==null){
//		DATABASE = new sqlite("/run/media/windowsMain/Users/polic/Documents/work2/Random_Crap/recipes/sites/metalsmith_static/att2/database/toy-db-att1.sqlite");
		DATABASE = new sqlite(cfgVars.DATABASE_PATH);
	}
}

function closeDatabase(){
	if (DATABASE!=null){
		DATABASE.close();
		DATABASE = null;
	}
}

function getDatabase(){
	return DATABASE;
}

module.exports = {openDatabase, closeDatabase, getDatabase};

