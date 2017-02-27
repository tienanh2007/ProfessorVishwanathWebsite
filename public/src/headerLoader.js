$.ajax({
  url: 'textfiles',
  type: 'GET',
  success: (data) => {
    data = JSON.parse(data)
    console.log(data)
    data.forEach(function(folderName){
      if(!folderName.includes("."))
        if(folderName === "home")
          $('#header ul').prepend('<li><a id="' + folderName + '" href="/' + folderName + '">' + folderName +'</a></li>')
        else
          $('#header ul').append('<li><a id="' + folderName + '" href="/' + folderName + '">' + folderName +'</a></li>')
    })
  },
  error: (err) => {
    console.log(err);
  }
});
