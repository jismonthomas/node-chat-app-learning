const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const  publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('new user connected');

  socket.emit('newMessage', {
    from: 'admin',
    text: 'welcome to the chat app'
  });

  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'new user joined',
    createdAt: new Date().getTime()
  });

  socket.on('sendMessage', (msg, callback) => {
    console.log('new msg', msg);
    io.emit('newMessage',{
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    });
    callback();
    // socket.broadcast.emit('newMessage',{
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('browser closed');
  });
});



server.listen(PORT, () => {
  console.log("server started at port: "+ PORT);
});
