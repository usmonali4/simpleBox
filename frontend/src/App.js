// App.jsx
import React, { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    // setJwtToken('');
    setIsLoggedIn(false);
  };

  const handleRegister = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Router>
      <Routes>
        <Route path="/chatroom" element={isLoggedIn ? <ChatRoom username={username} /> : <Navigate to="/" />} />
        <Route path="/" element={ isLoggedIn ? <Navigate to="/chatroom" /> :
          <div>
            { showLogin ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Register onRegister={handleRegister} />)}
            <button onClick={toggleForm}>
              {showLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        }/>
      </Routes>
    </Router>
  );
};

export default App;
