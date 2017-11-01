var fs = require('fs');
module.exports  = {
  generateWidget: function(path, num, height, width) {
    fs.readdir(path, function(err, items){
      if(err) return console.log(err);
        items = items.filter((item) => item.charAt(0) != '.')
                      .map((item) => 'resources/' + item);
        data = "<div id='pictures'><button id='shuffle'>change</button></div>\n" +
        "<script>\n" +
          "const pictures = ['" + items.join("','") + "'];\n" +
          "function getPicture(num) {\n" +
            "var pic = pictures.slice();\n" +
            "var ret = [];\n" +
            "for(var i=0;i<num;i++) {\n" +
              "ret.push(...pic.splice(Math.floor(Math.random()*pic.length), 1));\n" +
            "}\n" +
            "return ret;\n" +
          "}\n" +
          "$('#pictures').on('click', '#shuffle', () => {\n" +
            "$('#pictures').empty();\n" +
            "pic = getPicture(" + num + ");\n" +
            "for(i=0;i<" + num + ";i++) $('#pictures').append('<img src='+ pic[i] +' height=" + height + " width=" + width +">');\n" +
            "$('#pictures').append(\"<button id='shuffle'>change</button>\");" +
          "});\n" +
        "</script>\n";
        fs.writeFile("widget.html", data);
    });
  }
}
