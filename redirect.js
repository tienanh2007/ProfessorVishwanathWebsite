var express = require("express");
var app = express();
app.get("/*", (req, res) => {
  res.redirect("http://users.miamioh.edu/vishwak/");
});
app.listen(1337, function(){
  console.log("server is running on 1337 port");
});
