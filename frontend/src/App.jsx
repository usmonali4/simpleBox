import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h1>JWT Authentication Example</h1>
      {!isLoggedIn ? (
        <div>
          <Login onLogin={handleLogin} />
          <Register/>
        </div>
      ) : (
        <ChatRoom username={username} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
