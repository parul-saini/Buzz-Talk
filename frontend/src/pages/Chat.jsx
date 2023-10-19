import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRouter,host } from "../utils/ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "./ChatContainer";
// socket
import { io } from "socket.io-client";
import { useRef } from "react";

const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const storedUser = JSON.parse(
        localStorage.getItem("chat-app-current-user")
      );
      if (!storedUser) {
        navigate("/login");
      } else {
        setCurrentUser(storedUser);
        //console.log("currentUser", storedUser);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current=io(host);
      socket.current.emit("add-user",currentUser._id)
    }
  }, [currentUser]);
  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUserRouter}/${currentUser._id}`);
          // console.log(data);
          setContacts(data.data);
        } else navigate("/setavatar");
      }
    })();
  }, [currentUser]);
  //console.log("contact",contacts)

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const customStyles = {
    "margin-right": "0px",
    "margin-left": "0 !important",
    'height': '100vh',
    'background': '#d6cbde'
  };

  return (
    <div className="row gx-0 ms-0" style={{ height: "100vh", width: "100vw" }}>
      <div
        className="col-md-3 pe-0 d-flex"
        style={{ borderRight: "1px solid white", background: " #212529" }}
      >
        {/* <div className="col-md-3 pe-0 overflow: auto; height: 200px;"> */}
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
      </div>
      <div className="col-md-9 pe-0 " style={customStyles}>
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket}/>
        )}
      </div>
    </div>
  );
};

export default Chat;
