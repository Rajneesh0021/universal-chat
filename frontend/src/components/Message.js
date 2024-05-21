// src/components/Message.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Message = ({ text, username }) => {
  // Retrieve username from localStorage
  const localStorageUsername = localStorage.getItem('username');

  // Check if the username matches the localStorage username
  const isCurrentUser = username === localStorageUsername;

  // Apply different styling based on whether the message is from the current user
  const messageClasses = `d-flex mb-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`;
  const messageBoxClasses = `bg-light p-2 rounded border message-box w-75`;

  return (
    <div className={messageClasses}>
      <div className={messageBoxClasses}>
        <small className="text-muted">{username}</small>
        <p className="mb-0">{text}</p>
      </div>
    </div>
  );
};

export default Message;
