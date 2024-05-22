import { io } from 'socket.io-client';

const socket = io('https://universal-chat.onrender.com/'); 

export default socket;
