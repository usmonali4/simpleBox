import React, { useState } from 'react';
import axios from "../api/axiosConfig"

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
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
      <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">Login</button>
    </form>
  );
};

export default Login;
