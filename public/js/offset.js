'use strict'
// var off = throttle(, 5);
var headPost = document.querySelector('#headPost');
function move() {
    headPost.style.transform = `translate3d(0px, ${window.scrollY / 4}px, 0px)`;
    headPost.style.filter = `brightness(33%) blur(${window.scrollY / 50}px)`
}
window.onscroll = move;
