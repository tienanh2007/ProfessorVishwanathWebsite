// load the header
var special = [];
// load special file you need to specify the special file in the special array
$.ajax({
  url: '/specialFile',
  type: 'GET',
  success: (data) => {
    data = JSON.parse(data)
    console.log(data)
    data.forEach(function(folderName){
      if(!folderName.includes("."))
        if(special.indexOf(folderName) != -1)
          $('#header ul').prepend('<li><a id="' + folderName + '" href="/' + folderName + '">' + folderName +'</a></li>');
    })
  },
  error: (err) => {
    console.log(err);
  }
});
// load the normal auto-generated file
$.ajax({
  url: '/normalFile',
  type: 'GET',
  success: (data) => {
    data = JSON.parse(data)
    data.sort();
    data.forEach(function(folderName){
      if(!folderName.includes("."))
        $('#header ul').append('<li><a id="' + folderName + '" href="/' + folderName + '">' + folderName +'</a></li>');
    })
  },
  error: (err) => {
    console.log(err);
  }
});
