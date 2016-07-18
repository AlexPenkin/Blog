var socket = io();

socket.on('loginMessage', function (data) {
    console.log(data);
    alert(data.message);
  });
