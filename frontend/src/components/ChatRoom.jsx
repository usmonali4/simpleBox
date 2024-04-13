// ChatRoom.jsx
import React from 'react';

const ChatRoom = ({ username, onLogout }) => {
  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <button onClick={onLogout}>Logout</button>
      {/* Add chat room UI here */}
    </div>
  );
};

export default ChatRoom;
