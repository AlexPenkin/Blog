$(document).ready(function() {
  console.log(window.location.pathname);
  if (/loadPost/i.test(window.location.pathname)) {
    $('header').css('background-color', 'transparent');
    console.log('work');

  }
});
