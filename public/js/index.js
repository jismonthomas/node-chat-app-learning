var socket = io();

socket.on('connect',function () {
  console.log('connected to server');

});

socket.on('disconnect',function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function(msg) {
  console.log('new message', msg);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);
});

// socket.emit('sendMessage', {
//   from: 'admin',
//   text: 'welcome to the chat app'
// }, function (data) {
//   console.log('got it', data);
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('sendMessage', {
    from: 'User',
    text:jQuery('[name=message]').val()
  }, function () {
    jQuery('[name=message]').val(''); //clearing box after sending
  })
});
