//an auto generated file
$(document).ready(function(){
  $('#header').load('/header.html', function(){
    $.getScript("/src/headerLoader.js");
    $.ajax({
      url: '/data/harro/haru/haru.html',
      type: 'GET',
      success: (data) => {
        console.log(data)
        $("#test").append(data);$("head").append($("<link rel='stylesheet' type='text/css' href='/style/general.css'>"));
      },
      error: (err) => {
        console.log(err);
      }
    });
  });
});
