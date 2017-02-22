'use strict'
// var off = throttle(, 5);
var headPost = document.querySelector('#headPost');
var wrapperHead = document.querySelector('.headWrap');
var postTitleself = document.querySelector('.postTitle');
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function move() {
    headPost.style.transform = `translate3d(0px, ${window.scrollY / 5}px, 0px)`;
    wrapperHead.style.transform = `translate3d(0px, ${-window.scrollY / 5}px, 0px)`;
    postTitleself.style.transform = `translate3d(0px, ${-window.scrollY / 5}px, 0px)`;
    // headPost.style.filter = `brightness(33%) blur(${window.scrollY / 100}px)`;
}

if (!isMobile) {
    window.onscroll = move;
}