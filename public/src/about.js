$(document).ready(function(){
  $('#header').load('header.html', function(){
    $.getScript("src/headerLoader.js");
    $.ajax({
      url: 'file?path=about',
      type: 'GET',
      success: (data) => {
        data = JSON.parse(data)
        console.log(data)
        data.forEach(function(fileName){
          if(fileName.includes(".txt"))
          $.ajax({
            url: 'textfiles/about/' + fileName,
            type: 'GET',
            success: (data) => {
              console.log(data)
              $("#test").append(data)
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
