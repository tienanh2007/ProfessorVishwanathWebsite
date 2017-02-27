var express = require("express");
var logger = require("morgan");
var path = require("path");
var http = require("http");
var fs = require("fs");

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', function(req, res){
  res.sendFile(__dirname + '/public/home.html')
});
app.get('/about', function(req, res){
  res.sendFile(__dirname + '/public/about.html')
});
app.get('/research', function(req, res){
  res.sendFile(__dirname + '/public/research.html')
});
app.get('/file',function(req,res){
  fs.readdir('public/textfiles/' + req.query.path, function(err, items){
    if(err) return console.log(err)
    if(items){
      res.status(200).send(JSON.stringify(items))
    }
    else{
      res.status(404).send('Not Found')
    }
  })
});
app.get('/textfiles',function(req,res){
  fs.readdir('public/textfiles', function(err, items){
    if(err) return console.log(err)
    if(items){
      res.status(200).send(JSON.stringify(items))
    }
    else{
      res.status(404).send('Not Found')
    }
  })
});
app.get('/feed.xml', function(req, res){
  res.sendFile(__dirname + '/public/feed/feed.xml');
});

app.get('/team', function(req, res){
  res.sendFile(__dirname + '/public/team.html')
});
app.listen(1337, function(){
  console.log("server is running on 1337 port")
});
