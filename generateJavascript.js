// generate js files for normal folder files inside public/textfiels/file
var fs = require('fs');
module.exports = {
  generateJavascript: function (path) {
    if(path === ""){
      console.log("empty path");
      return;
    }
    fs.readdir(path, function(err, items){
      if(err) return console.log(err);
      items = items.filter(function(file){
        return fs.lstatSync(path + '/' + file).isDirectory() && fs.existsSync(path + '/' + file + '/' + file + '.html');
      })
      for(var i=0;i<items.length;i++) {
        if(fs.lstatSync(path + '/' + items[i]).isDirectory()) {
          module.exports.generateJavascript(path + '/' + items[i]);
        }
      }
      items.forEach(function(item){
        data = '//an auto generated file\n$(document).ready(function(){\n$(\'#header\').load(\'/header.html\', function(){' +
            '\n$.getScript("/src/headerLoader.js");\n$.ajax({\nurl: \'/file?path=' + item + '\',\ntype: \'GET\',\nsuccess: (data) => {' +
                '\ndata = JSON.parse(data)\nconsole.log(data)\ndata.forEach(function(fileName){\nif(fileName.includes(".html") && fileName=="'+ item +'.html")\n$.ajax({' +
                    '\nurl: \'/data/' + item + '/\' + fileName,\ntype: \'GET\',\nsuccess: (data) => {\nconsole.log(data)\n$("#test").append(data);' +
                      '$("head").append($("<link rel=\'stylesheet\' type=\'text/css\' href=\'/style/general.css\'>"));\n},' +
                    '\nerror: (err) => {\nconsole.log(err);\n}\n});\n});\n},\nerror: (err) => {\nconsole.log(err);\n}\n});\n});\n});'
        fs.writeFile("public/src/" + item + ".js", data);
      });
    });
  }
};
