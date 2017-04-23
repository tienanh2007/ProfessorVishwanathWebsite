// generate html files for normal folder files inside public/textfiels/file
var fs = require('fs');
module.exports  = {
  generateHTML: function(path) {
    if(path === ""){
      console.log("empty path");
      return;
    }
    fs.readdir(path, function(err, items){
      if(err) return console.log(err)
      items = items.filter(function(file){
        return fs.lstatSync(path + '/' + file).isDirectory() && fs.existsSync(path + '/' + file + '/' +file + '.html');
      })
      for(var i=0;i<items.length;i++) {
        if(fs.lstatSync(path + '/' + items[i]).isDirectory()) {
          module.exports.generateHTML(path + '/' + items[i]);
        }
      }
      items.forEach(function(item){
        data = '<!--an auto generated file-->\n<!DOCTYPE html>\n<html lang="en"><head>\n<meta charset="UTF-8">' +
          '<title>Karthik Vishwanath | ' + item + '</title>\n' +
          '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">\n' +
          '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>\n' +
          '<script type="text/javascript" src="/src/' + item + '.js" charset="utf-8"></script>\n' +
        '</head>\n<body>\n<div id="header">\n</div>\n<hr/>\n<div class="banner" id="banner1">' +
        '\n</div>\n<div id="test">\n</div>\n</body>\n</html>';
        fs.writeFile("public/" + item + ".html", data);
      });
    });
  }
}
