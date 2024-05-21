const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
// const chatRoutes = require('../routes/chat');
// const { verifyToken } = require('../middleware/auth');
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
    // app.use('/api', verifyToken, chatRoutes);
    io.emit('message', { text, username });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

module.exports = { server, app,io };
