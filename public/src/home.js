$(document).ready(function(){
  $('#header').load('header.html', function(){
    $.getScript("src/headerLoader.js");
    $.ajax({
      url: 'file?path=home',
      type: 'GET',
      success: (data) => {
        data = JSON.parse(data)
        console.log(data)
        data.forEach(function(fileName){
          if(fileName.includes(".txt"))
          $.ajax({
            url: 'textfiles/home/' + fileName,
            type: 'GET',
            success: (data) => {
              console.log(data)
              $("#test").append(data);
              $("head").append($("<link rel='stylesheet' type='text/css' href='style/home.css'>"));
              $("head").append($("<link rel='stylesheet' type='text/css' href='style/general.css'>"));
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
