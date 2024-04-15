// App.jsx
import React, { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  // const [jwtToken, setJwtToken] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    setJwtToken('');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl text-center font-semibold">Join A Chat</h1>
        {isLoggedIn ? (
          <ChatRoom username={username} onLogout={handleLogout} />
        ) : (
          <div className="space-y-4">
            { showLogin ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Register onRegister={handleRegister} />)}
            <button onClick={toggleForm} className="w-full bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600">
              {showLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
