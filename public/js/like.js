'use strict'
$(document).ready(function() {
  function isLiked() {
    if (isLogged()) {
      for (var i = 0; i < likeUsers.length; i++) {
        if (likeUsers[i] == user.trim()) {
          likeButton.removeClass('notLiked');
          likeButton.addClass('liked');
          return true;
        };
      }
    }
  }

  function isLogged() {  
    if (user === undefined) return false;
    else return true
  }

  function addLike() {
    if (!isLogged()) return;
    return $.ajaxAsObservable({
      url: '/addLike',
      method: 'POST',
      data: {
        action: 'changeLike',
        user: user.trim(),
        postId: postId
      }
    });
  }

  function removeLike() {
    if (!isLogged()) return;
    return $.ajaxAsObservable({
      url: '/removeLike',
      method: 'POST',
      data: {
        action: 'changeLike',
        user: user.trim(),
        postId: postId
      }
    });
  }
  var user = $('.userName').html() || undefined;
  if (!isLogged()) return;
  var likeButton = $('.like');
  isLiked();
  var stream = likeButton.clickAsObservable();
  stream.map((response) => {
    return response
  }).subscribe(function(data) {
    if (data.target.className == 'like notLiked') {
      addLike().subscribe(function(data) {
        likeButton.html(data.data.likes);
        likeButton.removeClass('notLiked');
        likeButton.addClass('liked');
      });
    } else {
      removeLike().subscribe(function(data) {
        likeButton.html(data.data.likes);
        likeButton.removeClass('liked');
        likeButton.addClass('notLiked');
      });
    }
  });
});
