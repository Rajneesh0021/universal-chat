const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');

app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('message', ({ text, username }) => {
    console.log(text, username);
 
    io.emit('message', { text, username });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

module.exports = { server, app, io, express };
