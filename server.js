var express = require("express");
var logger = require("morgan");
var path = require("path");
var http = require("http");
var fs = require("fs");
var directory = require('serve-index');
var gHTML = require("./generateHTML")
var gJS = require("./generateJavascript")
var gHD = require("./generateHeader");
var app = express();
gHTML.generateHTML('public/data', "");
gJS.generateJavascript('data');
gHD.generateHeader();
app.use(express.static(path.join(__dirname, 'public')));
// take care of the main route like home, research, etc ..
app.get('/*', function(req, res, next){
  var url = req.path;
  console.log(url)
  if(url.charAt(url.length-1) == '/') url = url.substring(0, url.length-1);
  if (fs.existsSync(__dirname + '/public' + url +'.html')){
    console.log(__dirname + ('/public' + url +'.html'));
    res.sendFile(__dirname + ('/public' + url +'.html'));
  }
  else {
    next();
  }
});

// an API that give you the name of normal file inside public/textfiles/file
app.get('/subfolderAPI',function(req,res){
  var path = 'public/data/' + req.query.path;
  fs.readdir(path, function(err, items){
    if(err) return console.log(err)
    if(items){
      items = items.filter(function(file){
        return fs.lstatSync(path + '/' + file).isDirectory() && fs.existsSync(path + '/' + file + '/' + file + '.html');
      })
      res.status(200).send(JSON.stringify(items));
      console.log("access subFolder API: " + path);
    }
    else{
      res.status(404).send('Not Found');
    }
  })
});
// an API that give you file names inside the home directory bc it is special
app.get('/homeAPI',function(req,res){
  fs.readdir('public/special/home', function(err, items){
    if(err) return console.log(err);
    if(items){
      res.status(200).send(JSON.stringify(items));
      console.log("access home API");
    }
    else{
      res.status(404).send('Not Found');
    }
  })
});
// an API that give you the file names inside news directory
app.get('/newsAPI',function(req,res){
  fs.readdir('public/news', function(err, items){
    if(err) return console.log(err)
    if(items){
      res.status(200).send(JSON.stringify(items));
      console.log("access news API");
    }
    else{
      res.status(404).send('Not Found')
    }
  })
});
// an API that gives you the file names inside textfiles
app.get('/specialFile',function(req, res){
  fs.readdir('public/news', function(err, items){
    if(err) return console.log(err)
    if(items){
      res.status(200).send(JSON.stringify(items));
      console.log("access special files API");
    }
    else{
      res.status(404).send('Not Found')
    }
  })
});
// an API that gives you the file names inside textfiles/file
app.get('/normalFile',function(req, res){
  fs.readdir('public/data', function(err, items){
    if(err) return console.log(err)
    sendFile = [];
    items = items.filter(function(file){
      return fs.lstatSync('public/data/'+file).isDirectory() && fs.existsSync('public/data/'+file+'/'+file+'.html');
    })
    items.forEach(function(item, i){
      fs.readdir('public/data/' + item, function(err, files){
        console.log(item + '.html');
        if(files.indexOf(item + '.html') != -1) sendFile.push(items[i]);
        if(sendFile.length==items.length){
          if(items){
            res.status(200).send(JSON.stringify(sendFile));
            console.log("access normal files API");
          }
          else{
            res.status(404).send('Not Found');
          }
        }
      });
    })
  });
});
// an api that get the files according the to hashcode
app.get('/:hash', function(req, res){
  fs.readdir('public/news', function(err, items){
    if(err) return console.log(err)
    if(items){
      items.forEach(function(fileName){
        if(fileName.hashCode() == req.params.hash){
          res.status(200).sendFile(__dirname + '/public/news/' + fileName);
          console.log(fileName)
        }
      })
    }
    else{
      res.status(404).send('Not Found')
    }
  })
})

app.listen(1337, function(){
  console.log("server is running on 1337 port")
});
// a typical hash function like .hashcode() in JAVA
String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
