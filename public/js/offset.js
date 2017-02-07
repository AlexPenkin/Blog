'use strict'
$(document).ready(function() {
  console.log('ready');
  var ismobile=navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
  console.log(ismobile);
  function throttle(func, ms) {

    var isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {

      if (isThrottled) { // (2)
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments); // (1)

      isThrottled = true;

      setTimeout(function() {
        isThrottled = false; // (3)
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  };
  var move = throttle(function() {
    headPost.style.transform = `translate3d(0px, ${window.scrollY / 4}px, 0px)`;
  }, 1)

  // var off = throttle(, 5);
  var headPost = document.querySelector('#headPost');

      window.onscroll = move;
  


})
