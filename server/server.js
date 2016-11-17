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
    to: '123456789',
    text: 'heu, how are u ?'
  });

  socket.on('sendMessage', (msg) => {
    console.log('new msg', msg);
  });
  socket.on('disconnect', () => {
    console.log('browser closed');
  });
});



server.listen(PORT, () => {
  console.log("server started at port: "+ PORT);
});
