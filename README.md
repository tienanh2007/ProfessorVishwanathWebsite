# ProfessorVishwanathWebsite
This is a website written using nodejs, express for server code and jquery for client.

## generateHTML.js
This file generate HTML files for to serve what is in /public/data folder
The function parameter: gHTML.generateHTML(path, parent);
path: path of the data folder
parent: always leave empty string
## generateJS.js
This file generate JS files for to serve what is in /public/data folder
The function parameter: gJS.generateJavascript(path);
path: path of the data folder
## generateHeader.js
This file generate the header which is based on what is in /public/data folder
## widget.js
This file generate a widget that randomly pick n pictures and display on the screen
The function parameter: gWG.generateWidget(path, n, width, height);
path: path to the folder contains pictures
n: number of pictures
width: width of the pictures being display
height: height of the pictures being display
## server.js
This run the 3 files above which generate all the needed static file to put on the server.

## How to generate file

1. put data in the /public/data folder (the data is a folder with one html file with the same name that contains all the content. Example in the source code)
2. In the generateHeader.js, you *have to* specify all the folder you have in an array so that the order can be determine inside the header.
3. Run server.js which generate all the html files inside /public, all the javascript client files in /public/src.
4. Copying /public into your MyDisk folder for your website.
