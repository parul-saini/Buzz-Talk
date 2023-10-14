import React, { useEffect, useState } from "react";
import logo from "../assests/logo.png";

function Contacts({ contacts, currentUser,changeChat }) {
  
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.userName);
      setCurrentUserImage(currentUser.avatar);
    }
  }, [currentUser]);

  const changeCurrentChat=(index,contact)=>{
    setCurrentSelected(index);
    changeChat(contact)

  }
 

  return (
    <div>
      {currentUserName && currentUserImage && (
        <>
          <div>
            <div className="align-items-center brandName d-flex justify-content-center mb-2 bg-black sticky-top">
              <img
                src={logo}
                alt="Logo"
                style={{ height: "4.5rem", width: "4.5rem" }}
              />
              <h3 className="text-light">BuZZ Talk</h3>
            </div>
            <div className="contacts" style={{
               overflow:"auto",
               height: "80vh",
            }}>
              {contacts.map((contact, index) => {
                return (
                  <div
                    className={`d-flex align-items-center mb-2  overflow-y p-1 btn btn-dark ${index===currentSelected?"bg-info":""} `}style={{cursor:"pointer",
                    
                    }}
                    key={index}
                    onClick={()=>changeCurrentChat(index,contact)}
                  >
                    <img
                      src="https://i.pinimg.com/236x/0f/b4/7e/0fb47e9ffdf8b3ac3561265fdb038f8a.jpg"
                      // src={`data:image/svg+xml;base64,${contact.avatar}`}
                      className="rounded-circle me-3"
                      alt="Avatar"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div>
                      <h5 className="m-0 ">{contact.userName}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
             <div className="d-flex align-items-center bg-danger p-1 sticky-bottom " >
              <img
                // src={`data:image/svg+xml;base64,${currentUserImage}`}
                src="https://i.pinimg.com/236x/6f/2a/66/6f2a66d81585fadb40329a07adfcad89.jpg"
                className="rounded-circle me-3"
                alt="Avatar"
                style={{ width: "50px", height: "50px" }}
              />
              <h2>{currentUserName}</h2>
            </div> 
          </div>
        </>
      )}
    </div>
  );
}

export default Contacts;
