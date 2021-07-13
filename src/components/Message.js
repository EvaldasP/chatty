import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Moment from "react-moment";

const Message = ({ msgOwnerPhoto, msg, msgOwner, timeCreated }) => {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  const [isInfo, setisInfo] = useState(false);

  const msgInfoToggler = () => {
    setisInfo(!isInfo);
  };

  return (
    <MessageContainer LoggedInUser={user.displayName} MsgOwner={msgOwner}>
      <img
        style={{
          verticalAlign: "middle",
          width: 40,
          height: 40,
          borderRadius: "50%",
          transform: "translatey(1px)",
        }}
        src={msgOwnerPhoto}
        alt="userphoto"
      ></img>
      <MessageTextContainer onClick={msgInfoToggler}>
        <MessageStyle LoggedInUser={user.displayName} MsgOwner={msgOwner}>
          {msg}
        </MessageStyle>
        {isInfo && (
          <Info MsgOwner={msgOwner} LoggedInUser={user.displayName}>
            send by: {msgOwner} <br></br>
            <Moment fromNow>{new Date(timeCreated.seconds * 1000)}</Moment>
          </Info>
        )}
      </MessageTextContainer>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  // align-items: center;
  padding: 5px;
  margin: 0 20px;
  justify-content: ${(props) =>
    props.LoggedInUser === props.MsgOwner ? "flex-end" : null};
`;

const MessageTextContainer = styled.div`
  margin-left: 5px;
`;

const MessageStyle = styled.p`
  font-size: 0.9rem;
  background-color: ${(props) =>
    props.LoggedInUser === props.MsgOwner ? "#FAEBE0" : "white"};
  margin-bottom: 0;

  padding: 10px;
  border-radius: 10px;
`;

const Info = styled.p`
  font-size: 0.7rem;
  color: grey;
`;

export default Message;
