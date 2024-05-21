// src/App.js
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import ChatRoom from './pages/ChatRoom';

const App = () => {
  const token=localStorage.getItem('token')
  const [authenticated, setAuthenticated] = useState(false);


  
  return (
    <div className="app">
      {authenticated ? <ChatRoom /> : <LoginPage setAuthenticated={setAuthenticated} />}
    </div>
  );
};

export default App;
