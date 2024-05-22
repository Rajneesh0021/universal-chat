import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import ChatRoom from './pages/ChatRoom';


const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <div className="app">
      {authenticated ? <ChatRoom /> : <LoginPage  setAuthenticated={setAuthenticated} />}
    
    </div>

  );
};

export default App;
