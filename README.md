# ProfessorVishwanathWebsite
This is a website written using nodejs, express for server code and jquery for client.

## generateHTML.js
This file generate HTML files for to serve what is in /public/data folder
## generateJS.js
This file generate JS files for to serve what is in /public/data folder
## generateHeader.js
This file generate the header which is based on what is in /public/data folder
## server.js
This run the 3 files above which generate all the needed static file to put on the server.

## How to generate file

1. put data in the /public/data folder (the data is a folder with one html file with the same name that contains all the content. Example in the source code)
2. In the generateHeader.js, you *have to* specify all the folder you have in an array so that the order can be determine inside the header.
3. Run server.js which generate all the html files inside /public, all the javascript client files in /public/src.
4. Copying /public into your MyDisk folder for your website.
