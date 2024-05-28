import React, { useState } from 'react';
import axios from "../api/axiosConfig"
import '../index.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Please fill in all fields before registering.');
      return;
    }
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      onLogin(username);
    } catch (error) {
      alert("Login failed")
      setPassword('');
      console.error('Login failed', error);
      return;
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
