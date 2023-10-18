import React,{useState,useEffect} from "react";
import hiGif from '../assests/0da5cbca5d728a789100439958f502-unscreen.gif'


function Welcome({ currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.userName);
    }
  }, [currentUser]);

  return (
    <div className="align-content-around d-flex justify-content-center pe-0 " style={{height:"100vh"}}>
      <div className=" d-flex flex-column text-center justify-content-center">
          <img src={hiGif} alt="Welcome"/>
        <h1>Welcome {currentUserName}</h1>
        <p style={{fontSize: "2rem" }}>Please select a chat to Start Messaging</p>
      </div>
    </div>
  );
}

export default Welcome;
