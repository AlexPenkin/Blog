'use strict'
$(document).ready(function() {

  $(document).on('click', '#send', () => {
    var text = tinymce.activeEditor.getContent({
      format: 'raw'
    });
    //alert(text);
    $('#test').append(text);
    var b;
    httpGet('/makePost').then(res => {  
      var file = document.getElementById('headImg').files[0];
      upload(file, file.name)
    }).catch(res=> console.log(res + 'err'));

  })
});

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var hours = date.getHours();
var minutes = date.getMinutes();
if (minutes < 10) {
  minutes = '0' + minutes;
}
if (month  < 10) {
  month  = '0' + month ;
}
var formattedDate = `Published ${day}.${month}.${year} at ${hours}:${minutes}`;
function httpGet(url) {

  return new Promise(function(resolve, reject) {
    $.ajax({
        url: url,
        method: "POST",
        data: {
          title: $("#title").val(),
          date: formattedDate,
          tags: $("#tags").val(),
          preText: $("#preText").val(),
          headImg: $("#headImg").val(),
          autor: $("#autor").val() || "Alexander Penkin",
          text: tinymce.activeEditor.getContent({
            format: 'raw'
          }),
        }
      })
      .done(function(data) {
        alert('ok, dont close the page until it loaded img')
        resolve("success");
      })
      .fail(function() {
        reject("error");
      })

  });

}


function upload(file, name) {
  var xhr = new XMLHttpRequest();
  // обработчики можно объединить в один,
  // если status == 200, то это успех, иначе ошибка

  xhr.onload = xhr.onerror = function() {
    if (this.status == 200) {   
      document.getElementById('headImg').value = '';    
      alert('pic loaded! move away!')
    } else {
      console.log("error " + this.status);
    }
  };

  xhr.open("POST", "/uploadHeader");
  xhr.setRequestHeader('name', encodeURIComponent(document.getElementById('headImg').files[0].name));
  xhr.setRequestHeader('title', encodeURIComponent($("#title").val()));
  xhr.setRequestHeader('autor', encodeURIComponent($("#autor").val() || "Alexander Penkin"));
  xhr.send(file);
}
