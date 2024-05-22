import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Message = ({ text, username }) => {

  const localStorageUsername = localStorage.getItem('username');

  const isCurrentUser = username === localStorageUsername;


  const messageClasses = `d-flex mb-3 ${isCurrentUser ? 'flex-row-reverse ' : 'flex-row'}`;
  const messageBoxClasses = ` p-2 rounded border message-box w-75 ${isCurrentUser ? 'bg-danger text-white' : 'bg-warning'}`;

  return (
    <div className={messageClasses}>
      <div className={messageBoxClasses}>
        <small className="text-white">{username}</small>
        <p className="mb-0">{text}</p>
      </div>
    </div>
  );
};

export default Message;
