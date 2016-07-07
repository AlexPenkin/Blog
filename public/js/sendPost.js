'use strict'
$(document).ready(function() {

  $(document).on('click', '#send', () => {
    var text = tinymce.activeEditor.getContent({
      format: 'raw'
    });
    //alert(text);
    $('#test').append(text);
    var b;
    httpGet('/makePost').then(res => alert(res));

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
var formattedDate = `Опубликовано ${day}.${month}.${year} в ${hours}:${minutes}`;
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
        resolve("success");
      })
      .fail(function() {
        reject("error");
      })

  });

}
