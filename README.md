## What is it?

Static site generator which creates a basic recipes site from an sqlite3 database. The main purpose in creating it was to help me learn some html/css/javascript/nodeJS.

## Previewing

If you want to see what the generator produces without installing any dependencies then navigate to the pre_built_toy folder and start a server. There are various ways to initiate a local server, a simple one-line python solution is:

python -m http.server

This will output the servers local address in terminal; by default it is likely "http://0.0.0.0:8000/". Navigate here in any browser to explore the toy site. It is also possible to just open the relevant index.html file in a browser, but javascript will be disabled (unless you are using a very old/insecure browser).

## Creating a simple demonstration site

To create the demonstration site just run "node create\_site.js", then run a live server in the newly created "build" directory (see above for a python command to run a local server).

## Creating a general site

By default the code is setup to use a simple toy database, but this can be changed by altering the "DATABASE_PATH" variable in src/config\_vars.js. This variable must point to an sqlite database with the same schema as the toy database (found in database/toy-db-att1.sqlite).

