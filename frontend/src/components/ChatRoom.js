import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import axios from "../api/axiosConfig"

var stompClient = null;
const ChatRoom = ({username}) => {    
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab,setTab] =useState("CHATROOM");
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

    useEffect(() => {
      const fetchUsers = async () => {

        const token = localStorage.getItem('token');

        try {
          const response = await axios.get('/users', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          response.data.map((user, index) => {
            if(!privateChats.get(user.username)){
              privateChats.set(user.username,[]);
            }
          })
          setPrivateChats(new Map(privateChats));
        } catch (error) {
          // setError(error.message);
        }
      };
  
      fetchUsers();
    }, []); 

    useEffect(() => {
      connect();
    }, []);

    const connect = ()=>{
      if(!stompClient){
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
      }
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
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
        const elem = document.getElementById('chat-m')
        elem.scrollTop = elem.scrollHeight;
    }

    const onPrivateMessage = (payload)=>{
      console.log(payload);
      var payloadData = JSON.parse(payload.body);
      if(privateChats.get(payloadData.senderName)){
          privateChats.get(payloadData.senderName).push(payloadData);
          setPrivateChats(new Map(privateChats));
      }else{
          let list =[];
          list.push(payloadData);
          privateChats.set(payloadData.senderName,list);
          setPrivateChats(new Map(privateChats));
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
        if(tab === "CHATROOM") sendValue();
        else sendPrivateValue();
      }
    }

    const sendPrivateValue=()=>{
      if (stompClient) {
        var chatMessage = {
          senderName: userData.username,
          receiverName: tab,
          message: userData.message,
          status:"MESSAGE"
        };
        
        if(userData.username !== tab){
          privateChats.get(tab).push(chatMessage);
          setPrivateChats(new Map(privateChats));
        }
        stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
        setUserData({...userData,"message": ""});
      }
  }

    
    return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container">
          <div className="chat-box">
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages" id='chat-m'>
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} onKeyDown={handleKeyDown}/> 
                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>}
            {tab!=="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} onKeyDown={handleKeyDown}/> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
          </div>
      </div>
    </div>
    )
}

export default ChatRoom