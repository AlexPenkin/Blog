'use strict'
$(document).ready(function() {

  $(document).on('click', '#show', () => {
    var text = tinymce.activeEditor.getContent({
      format: 'raw'
    });
    //alert(text);
    $('#test').append(text);
    var b;
    httpGet('/makePost').then(res => alert(res));

  })
});

function httpGet(url) {

  return new Promise(function(resolve, reject) {
    $.ajax({
        url: url,
        method: "POST",
        data: {
          title: $("#title").val(),
          date: $("#date").val(),
          tags: $("#tags").val(),
          preText: $("#preText").val(),
          preImgUrl: $("#preImgUrl").val(),
          autor: $("#autor").val(),
          text: tinymce.activeEditor.getContent({
            format: 'raw'
          }),
          error: function() {
            reject("error");
          }
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
