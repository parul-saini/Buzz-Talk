import React from "react";
import Logout from "../components/Logout";
import { Row, Col } from "react-bootstrap";
function ChatContainer({ currentChat }) {
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

      <div className="chat-messages"></div>
      <div className="chat-input"></div>
    </>
  );
}

export default ChatContainer;
