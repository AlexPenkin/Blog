'use strict'
// var off = throttle(, 5);
var headPost = document.querySelector('#headPost');
var wrapperHead = document.querySelector('.headWrap');
var postTitleself = document.querySelector('.postTitle');
var body = document.querySelector('body');

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const scroll$ = Rx.Observable
    .fromEvent(document, 'scroll')
    .map(event => ({
        y: body.scrollTop
    }));

const animationFrame$ = Rx.Observable.interval(0, Rx.Scheduler.animationFrame);

const smoothMove$ = animationFrame$
    .withLatestFrom(scroll$, (tick, move) => move)
smoothMove$.subscribe(scroll => {  
    headPost.style.transform = `translate3d(0px, ${scroll.y / 5}px, 0px)`;
    wrapperHead.style.transform = `translate3d(0px, ${-scroll.y / 5}px, 0px)`;
    postTitleself.style.transform = `translate3d(0px, ${-scroll.y / 5}px, 0px)`;
});
