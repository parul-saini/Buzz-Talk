import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const ChatInput = ({handleSendMsg}) => {
    const[ShowEmojiPicker,setShowEmojiPicker]= useState(false);
    const[msg,setMsg]= useState("");

    const handelEmojiPickerToggle=()=>{
        setShowEmojiPicker(!ShowEmojiPicker);
    }
    
    // const handleSelectedEmoji=(emojiobj, event)=>{
    //     console.log(emojiobj);
    //     let message = msg;
    //     message += emojiobj.emoji;
    //     setMsg(message);
    //     console.log(msg);
    // }
    function handleSelectedEmoji(emojiData, event) {
        console.log(emojiData);
        setMsg(
          (msg) =>
            msg + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
        );
    }

    const sendChat=(event)=>{
        event.preventDefault();
        if(msg.length >0) 
        {handleSendMsg(msg);
        setMsg('');}
    }


  return (

    <Container className="button-container row" style={{}}>
        <InputGroup className=" col-12">
            <BsEmojiSmileFill onClick={handelEmojiPickerToggle} />
            {
                ShowEmojiPicker && <Picker  onEmojiClick={handleSelectedEmoji}/>
            }
            <Form.Control
            placeholder="Type your message here......."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={msg}
            onChange={(e)=> setMsg(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2">
                <IoMdSend onClick={sendChat}/>
            </Button>
        </InputGroup>
    </Container>

  )
}

const Container = styled.div`
    justify-content: center;
    align-items: center;
    .input-group{
        background:black;
        position: relative;
        svg{
        font-size: 2rem;
        cursor: pointer;
        color: #dbbe14;
        margin-right:10px ; 
        margin-top: 6px;
        }
        input{
        background: black;
        color: white;
        outline: none;
        border: none;
        font-size:20px;
        }
        aside{
            position:absolute;
            bottom:58px;
            background:#101127
        }
    } 

` ;

export default ChatInput




