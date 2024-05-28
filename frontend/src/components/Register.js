import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import '../index.css'

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    if (username.trim() === '' || password.trim() === '' || email.trim() === '') {
      alert('Please fill in all fields before registering.');
      return;
    }
    e.preventDefault();
    try {
      await axios.post('/auth/register', { username, email, password });
      console.log('Registration successful');
      onRegister(username);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
