// generate js files for normal folder files inside public/textfiels/file
var fs = require('fs');
module.exports = {
  generateJavascript: function (path) {
    if(path === ""){
      console.log("empty path");
      return;
    }
    fs.readdir('public/' + path, function(err, items){
      if(err) return console.log(err);
      items = items.filter(function(file){
        return fs.lstatSync('public/' + path + '/' + file).isDirectory() && fs.existsSync('public/' + path + '/' + file + '/' + file + '.html');
      })
      for(var i=0;i<items.length;i++) {
        if(fs.lstatSync('public/' + path + '/' + items[i]).isDirectory()) {
          module.exports.generateJavascript(path + '/' + items[i]);
        }
      }
      items.forEach(function(item){
        var data = '//an auto generated file\n' +
        '$(document).ready(function(){\n' +
          '$(\'#header\').load(\'/header.html\', function(){\n' +
            '$.getScript("/src/headerLoader.js");\n' +
            '$.ajax({\n' +
              'url: \'' + (path + '/' + item + '/' + item + '.html') +'\',\n' +
              'type: \'GET\',\n' +
              'success: (data) => {\n' +
                'console.log(data)\n' +
                '$("#test").append(data);$("head").append($("<link rel=\'stylesheet\' type=\'text/css\' href=\'/style/general.css\'>"));\n' +
              '},\n' +
              'error: (err) => {\n' +
              '  console.log(err);\n' +
              '}\n' +
            '});\n' +
          '});\n' +
        '});\n';

        fs.writeFile("public/src/" + item + ".js", data);
      });
    });
  }
};
