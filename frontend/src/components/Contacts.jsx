import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import styled from 'styled-components'
import '../App.css';

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.userName);
      setCurrentUserImage(currentUser.avataarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const styleComponent={
    "overflow":"auto",
    "height": "80vh",
  }
 
  return (
    <>
    {currentUserName && currentUserImage && (
    <div
      className="container align-self-center "
      style={{
        width: "90%",
        height: "93%",
        // background: "#d6cbde",
        // background: "rgb(248 243 251)",
        borderRadius: "17px",
        border: "1px solid rgba(74, 74, 74, 0.51)",
      }}
    >
       
      <div className="row d-flex align-items-center pt-2 m-0 pb-4 sticky-top ">
        <img
          src={`data:image/svg+xml;base64,${currentUserImage}`}
          className="rounded-circle p-0 col-1"
          alt="Avatar"
          style={{ width: "50px", height: "50px" }}
        />
        <p
          className="col m-0 text-capitalize"
          style={{
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "30px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
          }}
        >
          {currentUserName}
        </p>
        <Logout />
      </div>
      <div
        className="contacts"
        style={{
          overflow: "auto",
          height: "80vh",
        }}
      >
        <p style={{fontSize: "22px", fontWeight: "700",color: "white"}}>Messages</p>
        {contacts.map((contact, index) => {
          return (
            <div
              className={`d-flex align-items-center m-0 overflow-y p-0 btn row border-0 ${
                index === currentSelected ? "selected" : ""
              } `}
              style={{ cursor: "pointer",...(index===currentSelected?{background:"rgb(102 61 133 / 27%)"}:"")}}
              key={index}
              onClick={() => changeCurrentChat(index, contact)}
            >
              {index === currentSelected ? (
                <span
                  style={{
                    width: "6px",
                    height: "75px",
                    background: "rgb(90 39 107 / 84%)",
                  }}
                  className="p-0"
                ></span>
              ) : (
                <span
                  style={{
                    width: "6px",
                    height: "75px",
                  }}
                  className="p-0"
                ></span>
              )}

              <img
                // src="https://i.pinimg.com/236x/0f/b4/7e/0fb47e9ffdf8b3ac3561265fdb038f8a.jpg"
                src={`data:image/svg+xml;base64,${contact.avataarImage}`}
                className="rounded-circle col-1 p-0"
                alt="Avatar"
                style={{ width: "50px", height: "50px" }}
                />
              <div className="col-9 text-capitalize text-start" style={{  fontSize: "20px",
                color: "white" ,...(index===currentSelected?{fontWeight:"600"}:"")}}>
                {contact.userName}
              </div>

              <div
                className="line col-1"
                style={{
                  background: "rgb(92 90 90 / 33%)",
                  height: "1px",
                  width: "100%",
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
    )} 
    </> 
  );
}
export default Contacts;
