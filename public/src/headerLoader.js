// load the header
var order = ["team", "research", "harro"];
// load the normal auto-generated file
order.forEach(function(folderName){
  if(!folderName.includes(".")){
    $.ajax({
      url: '/subfolderAPI?path=' + folderName,
      type: 'GET',
      success: (subfolders) => {
        subfolders = JSON.parse(subfolders);
        if(subfolders.length != 0){
          var dropdowns = '';
          subfolders.forEach(function(subfolder){
            recursiveDropdown(folderName + '/' + subfolder, subfolder, function(dd){
              dropdowns += dd;
            });
          });
          $('#header ul.nav').append('<li class=dropdown><a id="' + folderName + '" href="/' + folderName +'" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'
           + folderName +'</a><ul class="dropdown-menu">'+ dropdowns +'</ul></li>');
           $('#' + folderName).click(function(){
             window.location.href='/' + folderName;
           });
        }
        else{
          $('#header ul.nav').append('<li><a id="' + folderName + '" href="/' + folderName + '">' + folderName +'</a></li>');
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
});
function recursiveDropdown(path, folderName, cb){
  $.ajax({
    url: '/subfolderAPI?path=' + path,
    type: 'GET',
    async: false,
    success: (subfolders) => {
      subfolders = JSON.parse(subfolders);

      if(subfolders.length != 0){
        var dropdowns = '';
        dropdowns += '<li class="dropdown-submenu">' +
                      '<a id="' + folderName + '" class="test" href="/' + folderName + '">' + folderName + '<span class="caret"></span></a>' +
                      '<ul class="dropdown-menu">'
        subfolders.forEach(function(subfolder){
          recursiveDropdown(path + '/' + subfolder, subfolder, function(dd){
            dropdowns += dd;
          });
        });
        dropdowns += '</ul></li>';
        
        console.log(dropdowns);
        cb(dropdowns);
      }
      else{
        var dropdowns = '<li><a id="' + folderName + '" href="/' + folderName + '">' + folderName +'</a></li>';
        cb(dropdowns);
      }
    },
    error: (err) => {
      console.log(err);
    }
  });
}
