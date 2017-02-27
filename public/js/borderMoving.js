'use strict'
var blocks = document.querySelectorAll('.portItem'),
  wrapper = document.querySelector('.portWrap'),
  source,
  i;
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
    var myAnimation = anime({
      targets: ['#movingBorder'],
      translateX: this.offsetLeft - 29,
      translateY: this.offsetTop - 15,
      duration: 500,
      loop: false,
      easing: 'easeOutCubic'
    });
    border.borderOn = this;    
  })
}
i = 0;
