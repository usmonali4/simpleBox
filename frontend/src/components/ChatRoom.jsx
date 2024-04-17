import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient =null;
const ChatRoom = ({username}) => {    
    const [publicChats, setPublicChats] = useState([]); 
    const [userData, setUserData] = useState({
        username: username,
        receivername: '',
        connected: false,
        message: ''
      });
    useEffect(() => {
      console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }
    
    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value} = event.target;
        setUserData({...userData,"message": value});
    }

    const sendValue = ()=>{
      if (stompClient && userData.message.trim() !== '') {
        var chatMessage = {
          senderName: userData.username,
          message: userData.message,
          status:"MESSAGE"
        };
        console.log(chatMessage);
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        setUserData({...userData, "message": ""});
      }
    }

    const handleKeyDown = (e) => {
      if(e.keyCode === 13){
        sendValue();
      }
    }

    
    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="container">
        {userData.connected?
        <div className="chat-box">
            <div className="chat-content">
                <ul className="chat-messages">
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message..." value={userData.message} onChange={handleMessage} onKeyDown={handleKeyDown}/> 
                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>
        </div>
        : 
        connect()}
    </div>
    </div>
    )
}

export default ChatRoom