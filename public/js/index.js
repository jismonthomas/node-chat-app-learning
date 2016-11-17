var socket = io();

socket.on('connect',function () {
  console.log('connected to server');

  socket.emit('sendMessage', {
    to: '123456789',
    text: 'good morning'
  });
});

socket.on('disconnect',function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function(msg) {
  console.log('new message', msg);
});
