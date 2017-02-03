$(document).ready(function(){
  $.ajax({
    url: '/news',
    type: 'GET',
    success: (data) => {
      console.log('user polls found, data: ');
      console.log(data);
      $('#test').text(data)
    },
    error: (err) => {
      console.log(err);
    }
  });
});
