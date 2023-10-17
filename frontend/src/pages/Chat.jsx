import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRouter } from "../utils/ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "./ChatContainer";


const Chat = () => {
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
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUserRouter}/${currentUser._id}`);
          // console.log(data);
          setContacts(data.data);
        } 
        else navigate("/setavatar");
      }
    })();
  }, [currentUser]);
  //console.log("contact",contacts)

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className=" bg-black text-white">
      <div className="row" style={{ height: "100vh", width: "100vw" }}>
        <div className="col-md-3 pe-0 overflow: auto; height: 200px;">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        </div>
        <div className=" col-md-9  pe-0">
          {
            currentChat === undefined? 
            <Welcome currentUser={currentUser} />
            :
            <ChatContainer currentUser={currentUser} currentChat={currentChat} />
          }
        </div>
      </div>
    </div>
  );
};


export default Chat;
