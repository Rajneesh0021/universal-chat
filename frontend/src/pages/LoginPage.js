// src/components/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9090/api/login', { username, password });
      if (response.data.success) {
        setAuthenticated(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card p-5">
        <h3 className="card-title text-center ">Login</h3>
        <form onSubmit={handleLogin} className="flex-column justify-content-center align-items-center h-100" >
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2 btn-block">Login</button>
          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
