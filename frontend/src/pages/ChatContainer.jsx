import React, { useEffect, useState,useRef } from "react";
import { Row, Col } from "react-bootstrap";
import ChatInput from "./ChatInput";
import Messages from "../components/Messages";
import { sendMessagesRouter,getALLMessagesRouter } from "../utils/ApiRoutes";
import axios from "axios";
import styled from "styled-components";


function ChatContainer({currentUser,currentChat}) {
    const [messages,setMessages]=useState([]); 
  
  useEffect(()=>{
          (async()=>{
      const response = await axios.post(getALLMessagesRouter,{
          from: currentUser._id,
          to: currentChat._id,
        })
      setMessages(response.data);  
      })();
      },[currentChat]);

  const handleSendMsg = async(msg)=>{
    await axios.post(sendMessagesRouter,{
    from:currentUser._id,
    to: currentChat._id,
    message:msg
    })
    
  }

  return (
    <>
    <ChatHeader className="row user-details bg-dark d-flex user-details p-1 align-items-center m-0"> 
          <Col className="avatar pe-0" sm="1">
              {/* <img src={`data:image/svg+xml;base64,${currentChat.avatar}`} alt="avatar" /> */}
              <img
                src={`data:image/svg+xml;base64,${currentChat.avataarImage}`}
                className="rounded-circle"
                alt="avatar"
              />
          </Col>
          <Col className="user-name" sm='11'>
              <h3 className="text-capitalize"> {currentChat.userName}</h3>
          </Col>
    </ChatHeader>

    <ChatMessages className="chat-messages me-0 ms-0" >
    {
      messages.map((msg,ind)=>{
        return (
          <div key={ind}>
            <div className={`message ${ (msg.fromSelf) ? "sender" : "recieved"}`}>
              <div className="content">
                <p>{msg.message}</p>
              </div>
            </div>
          </div>
        )
      })
    }
    </ChatMessages>
  
    <ChatInput handleSendMsg={handleSendMsg} />
    </>
  );
}

const ChatHeader = styled.div`
height: 11%;
.avatar{
  display: flex;
  justify-content: center;
  align-items: center;
  width:6.5%;
  height: 4.5rem;
  img{
    width: 63px;
    height: 64px;
  }
 }
 .user-name{
  color:white;
 }
`
const ChatMessages = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 21%);
    overflow: auto;
    gap: 1rem;
    padding: 1rem;
    background: #d6cbde;
    .message{
      display: flex;
      align-items: center;
      .content{
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.5rem 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: white;
      }
    }
    .sender{
      justify-content:flex-end;
      .content{
        ${'' /* background:#443C68; */}
        background:#443c68cc;
      }
    }
    .recieved{
      justify-content:flex-start;
      .content{
        background:#393053;
      }
    }
`

export default ChatContainer;
