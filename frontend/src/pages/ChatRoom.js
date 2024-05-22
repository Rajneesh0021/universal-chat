import React, { useEffect, useState, useRef } from 'react';

import socket from '../socket';
import axios from 'axios';
import Message from '../components/Message';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatRoom.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ChatRoom = () => {
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const token = localStorage.getItem('unichtoken');
  const username = localStorage.getItem('username');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

 
  useEffect(() => {
    
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://universal-chat.onrender.com/api/messages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        if(response.statusText==='OK'){
        setMessages(response.data);
        }else{
        toast(response.message)
      }
      } catch (error) {
        console.log(error)
        toast(error.message);
        

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



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      try {
  
        const response = await axios.post(
          'https://universal-chat.onrender.com/api/messages',
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
        toast(error.message)
        console.error('Error posting message:', error);
        
      }
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className=" chat-container">
      <div className="card">
        <div className="card-header bg-black text-white">
          <h5 className="card-title">Universal Chat</h5>
         
        </div>
        <div className="card-body messages-wrapper">
          <div className="messages mb-3 p-3" style={{ maxHeight: '90%', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <Message key={index} text={msg.text} username={msg.username} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="d-flex ">
            <div class="messageBox">
  <div class="fileUploadWrapper">
    <label for="file">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
        <circle
          stroke-width="20"
          stroke="#6c6c6c"
          fill="none"
          r="158.5"
          cy="168.5"
          cx="168.5"
        ></circle>
        <path
          stroke-linecap="round"
          stroke-width="25"
          stroke="#6c6c6c"
          d="M167.759 79V259"
        ></path>
        <path
          stroke-linecap="round"
          stroke-width="25"
          stroke="#6c6c6c"
          d="M79 167.138H259"
        ></path>
      </svg>
      <span class="tooltip">Add an image</span>
    </label>
    <input  type="file" id="file" name="file" />
  </div>
  <input
              value={input}
              onChange={(e) => setInput(e.target.value)} required="" placeholder="Message..." type="text" id="messageInput" />
  <button type="submit" id="sendButton">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
      <path
        fill="none"
        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
      ></path>
      <path
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="33.67"
        stroke="#6c6c6c"
        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
      ></path>
    </svg>
  </button>
</div>

            
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatRoom;
