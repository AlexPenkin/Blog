'use strict'
// var off = throttle(, 5);
var headPost = document.querySelector('#headPost');
var wrapperHead = document.querySelector('.headWrap');
var postTitleself = document.querySelector('.postTitle');
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function throttle(f, awaitingTime) {
    // Set variable for value which stores that
    // whether action was triggered or not.
    var isThrottled = false;
    // Saved arguments of function which will be wrapped.
    // Saved context of function which will be wrapped.
    // It will used in setTimeout, that lose context.
    var savedArgs,
        savedContext;
    // Here we returns our wrapper. Name of this 
    //function is important. It will used for recursion.
    return function wrapper() {
        //Variable declration.           
        // Here we initialize argument and context by our
        // last one triggering to then execute it.
        if (isThrottled) {
            savedArgs = arguments;
            savedContext = this;
            return;
        }
        // Execute our function for first time.
        f.apply(this, arguments);
        // Throttle start.
        isThrottled = true;
        setTimeout(function () {
            // Reset our throttle.
            isThrottled = false;
            // Here executes recursion. If were some invocations
            // it invoke last one with last parameters.
            if (savedArgs) {
                wrapper.apply(savedContext, savedArgs);
                // Reset last arguments if they exist.
                savedArgs = savedContext = null;
            }
        }, awaitingTime);
    }
}
function move() {
    var scroll = window.scrollY / 5;
    headPost.style.transform = `translate3d(0px, ${scroll}px, 0px)`;
    wrapperHead.style.transform = `translate3d(0px, ${-scroll}px, 0px)`;
    postTitleself.style.transform = `translate3d(0px, ${-scroll}px, 0px)`;
    // headPost.style.filter = `brightness(33%) blur(${window.scrollY / 100}px)`;
}

var throttled = throttle(move, 15);


if (!isMobile) {
    window.onscroll = move;
}