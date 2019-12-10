//create project
npm init --yes
//run
node index.js
//install dependencies
npm i
//create .gitignore
node_modules/
//semantic versioning
^4.12.6 // caret Major.Minor.Path = 4.x
~4.12.6 // tilde Major.Minor.Path = 4.12.x
//listing the installed packages
npm list --depth=0
//updating packages
npm outdated
----//update wanted
npm update
----//update latest
npm i -g npm-check-updates
npm-check-updates
ncu -u
npm i
//traitement des problemes
npm i jshint --save-dev
//uninstall package
npm un underscore
//upgrade npm
npm i -g npm
//install nodemon for quick reload
npm i -g nodemon --save-dev
//set the default port
set PORT=5000
//install joi to validate variable
npm i joi
//install helmet to secure app
npm i helmet
//install morgan for http request logger
npm i morgan
//set varibale envirenment
set NODE_ENV=production or set NODE_ENV=development
//install configuration
npm i config
//set password on custom-environment-variables
set app-password=1234
//install debugging, set DEBUG=app:startup or set DEBUG= or set DEBUG=app:startup, app:db or set DEBUG=app:\*
npm i debug
//runnig debug with node
DEBUG=app:db nodemon index.js
