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
app.get('/news',function(req,res){
  fs.readFile('public/textfiles/news.txt', function(err, data){
    if(err) return console.log(err)
    if(data){
      res.status(200).send(data.toString())
    }
    else{
      res.status(404).send('Not Found')
    }
  })

})
app.get('/about', function(req, res){
  res.sendFile(__dirname + '/public/about.html')
});
app.get('/research', function(req, res){
  res.sendFile(__dirname + '/public/research.html')
});
app.get('/team', function(req, res){
  res.sendFile(__dirname + '/public/team.html')
});
app.listen(1337, function(){
  console.log("server is running on 1337 port")
});
