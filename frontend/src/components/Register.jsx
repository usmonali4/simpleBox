import React, { useState } from 'react';
import axios from '../api/axiosConfig'; // Import Axios instance

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', { username, email, password });
      console.log('Registration successful');
      onRegister();
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
      <button type="submit" className="w-full bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600">Register</button>
    </form>
  );
};

export default Register;
