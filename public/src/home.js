$(document).ready(function(){
  $('#header').load('/header.html', function(){
    $.getScript("/src/headerLoader.js");
    $.ajax({
      url: '/newsAPI',
      type: 'GET',
      success: (data) => {
        data = JSON.parse(data);
        console.log(data);
        $("#new").append("<ul>");
        data.forEach(function(fileName){
          if(fileName.includes(".html")){
            $("#new").append("<li><a href='/" + fileName.hashCode() + "'>" +
            fileName.substring(0, fileName.length-5) + "</a></li>")
          }
        });
        $("#new").append("</ul>");
      }
    });
    $.ajax({
      url: '/homeAPI',
      type: 'GET',
      success: (data) => {
        data = JSON.parse(data)
        console.log(data)
        data.forEach(function(fileName){
          if(fileName.includes(".html"))
          $.ajax({
            url: '/special/home/' + fileName,
            type: 'GET',
            success: (data) => {
              console.log(data)
              $("#test").append(data);
              $("head").append($("<link rel='stylesheet' type='text/css' href='/style/home.css'>"));
              $("head").append($("<link rel='stylesheet' type='text/css' href='/style/general.css'>"));
            },
            error: (err) => {
              console.log(err);
            }
          });
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  });
});
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
