'use strict'

$(document).ready(function() {
  var headPost = $('#headPost')
  $(document).scroll(function() {
    headPost.css('transform', `translate3d(0px, ${window.scrollY / 4}px, 0px)`);
  });
});
