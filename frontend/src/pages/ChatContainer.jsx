import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
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
      <Row>
        <div className="user-details bg-dark d-flex user-details p-1 align-items-center">
          <Col sm="1">
            <div className="avatar">
              {/* <img src={`data:image/svg+xml;base64,${currentChat.avatar}`} alt="avatar" /> */}
              <img
                src="https://i.pinimg.com/236x/b4/b5/40/b4b5408801fdd5bc55749d6a102c759b.jpg"
                className="rounded-circle"
                alt="avatar"
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          </Col>
          <Col sm='10'>
            <div className="user-name">
              <h3> {currentChat.userName}</h3>
            </div>
          </Col>
          <Col sm='1' >
            <Logout  />
          </Col>
        </div>
      </Row>

      <div className="chat-messages" style={{height:"80%"}}>
      {
        messages.map((msg,ind)=>{
          return (
            <div key={ind}>
              <div className={`message ${ msg.fromSelf? "sender": "recieved"}`}>
                <div className="content">
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          )
        })
      }
      </div>
    
      <ChatInput handleSendMsg={handleSendMsg} />
    </>
  );
}

const div= styled.div`

`

export default ChatContainer;
