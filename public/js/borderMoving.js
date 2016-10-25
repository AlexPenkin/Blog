'use strict'
var blocks = document.querySelectorAll('.portItem'),
  wrapper = document.querySelector('.portWrap'),
  source,
  i;

console.log('aa');

function movingBorder() {
  this.borderOn = blocks[0];
  this.width = this.borderOn.offsetWidth + 10;
  this.height = this.borderOn.offsetHeight + 10;
  this.left = this.borderOn.offsetLeft - 5;
  this.top = this.borderOn.offsetTop - 5;

  this.isMove = false;

}

movingBorder.prototype.init = function() {
  var border = document.createElement("div");
  border.style.width = this.width + 'px';
  border.style.height = this.height + 'px';
  border.style.left = this.left + 'px';
  border.style.top = this.top + 'px';
  border.className = 'movingBorder';
  border.id = 'movingBorder';
  wrapper.appendChild(border);
}

var border = new movingBorder();
border.init();
for (i = 0; i < blocks.length; i++) {
  blocks[i].addEventListener('mouseenter', function() {
    console.log(border);
    console.log(this.getBoundingClientRect().left - (border.left * 2));
    console.log(this.getBoundingClientRect().left);
    console.log(border.left);

    var myAnimation = anime({
      targets: ['#movingBorder'],
      translateX: this.offsetLeft - 29,
      translateY: this.offsetTop - 15,
      duration: 500,
      loop: false,
      easing: 'easeOutCubic'
    });
    border.borderOn = blocks[i];
    console.log(i);
  })
}
console.log(anime.easings);
i = 0;
/*function writeDimension(elem) {
  elem.innerHTML = ('top: ' + elem.getBoundingClientRect().top) + '<br>' +
    ('right: ' + elem.getBoundingClientRect().right) + '<br>' +
    ('top: ' + elem.getBoundingClientRect().bottom) + '<br>' +
    ('left: ' + elem.getBoundingClientRect().left) + '<br>';
}

function movingBorder() {
  this.width = blocks[0].offsetWidth + 10;
  this.height = blocks[0].offsetHeight + 10;
  this.left = blocks[0].offsetLeft - 5;
  this.top = blocks[0].offsetTop - 5;
  this.isMove = false;

}
//movingBorder.prototype = Object.create(HTMLElement.prototype);
movingBorder.prototype.constructor = movingBorder;
movingBorder.prototype.init = function() {
  var border = document.createElement("div");
  border.style.width = this.width + 'px';
  border.style.height = this.height + 'px';
  border.style.left = this.left + 'px';
  border.style.top = this.top + 'px';
  border.className = 'movingBorder';
  border.id = 'movingBorder';
  wrapper.appendChild(border);
}

movingBorder.prototype.stop = function() {
  clearInterval(this.timer);
  this.isMove = false;
}

movingBorder.prototype.move = function(t) {
  this.isMove = true;
  var borItem = document.getElementById('movingBorder'),
    borItemOffsetLeft = borItem.offsetLeft,
    tOffsetLeft = t.offsetLeft,
    borItemOffsetTop = borItem.offsetTop,
    tOffsetTop = t.offsetTop;
  var self = this;
  this.timer = setInterval(function() {
    if (borItemOffsetLeft > tOffsetLeft - 5) {
      if (borItem.offsetLeft - t.offsetLeft < 10) {
        borItemOffsetLeft -= 1;
      } else {
        borItemOffsetLeft -= 2;
      }

      borItem.style.left = borItemOffsetLeft + 'px';
      console.log(1);
      if (borItemOffsetLeft <= tOffsetLeft - 5) {
          while (borItemOffsetLeft < tOffsetLeft) {
            borItemOffsetTop += 1;
          }

        } else {
          while (borItemOffsetLeft < tOffsetLeft) {
            borItemOffsetTop -= 1;
          }
        }
        self.stop();

    } else {
      if (t.offsetLeft - borItem.offsetLeft < 10) {
        borItemOffsetLeft += 1;
      } else {
        borItemOffsetLeft += 2;
      }

      borItem.style.left = borItemOffsetLeft + 'px';
      console.log(2);
      if (borItemOffsetLeft >= tOffsetLeft - 5) {
        self.stop();
      }
    }
  }, 1);
};

document.addEventListener("DOMContentLoaded", ready);

function ready() {
  wrapper = document.getElementById('portWrap')
  blocks = document.getElementsByClassName('portItem');
  for (let i = 0; i < blocks.length; i++) {
    writeDimension(blocks[i]);
    console.log(blocks[i]);
  }
  var border = new movingBorder();

  border.init();
  source = Rx.Observable.fromEvent(blocks, 'mouseover');
  source.subscribe(function(e) {
    var target = e.target;
    if (border.isMove) {
      border.stop();
    }
    border.move(target);
  });
};*/
