// src/components/ChatRoom.js
import React, { useEffect, useState, useRef } from 'react';
import socket from '../socket';
import axios from 'axios';
import Message from '../components/Message';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatRoom.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

 
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/messages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [token]);

 
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);


  // Handle submitting new messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      try {
        // Send message to backend API
        const response = await axios.post(
          'http://localhost:9090/api/messages',
          { text: input },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await response.data.pop();

        socket.emit('message', { text: input, username });

        setInput('');
      } catch (error) {
        console.error('Error posting message:', error);
      }
    }
  };

  return (
    <div className=" chat-container">
      <div className="card">
        <div className="card-header bg-black text-white">
          <h5 className="card-title">Chat Room</h5>
        </div>
        <div className="card-body messages-wrapper">
          <div className="messages mb-3 p-3" style={{ maxHeight: '90%', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <Message key={index} text={msg.text} username={msg.username} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="d-flex ">
            <input
              type="text"
              className="form-control mr-2 px-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
