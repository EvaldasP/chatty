import React from "react";
import styled from "styled-components";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ msgOwnerPhoto, msg, msgOwner }) => {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  return (
    <MessageContainer LoggedInUser={user.displayName} MsgOwner={msgOwner}>
      <img
        style={{
          verticalAlign: "middle",
          width: 40,
          height: 40,
          borderRadius: "50%",
        }}
        src={msgOwnerPhoto}
        alt="userphoto"
      ></img>
      <MessageTextContainer LoggedInUser={user.displayName} MsgOwner={msgOwner}>
        <p style={{ marginBottom: 0 }}>{msg}</p>
      </MessageTextContainer>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  margin: 0 20px;

  justify-content: ${(props) =>
    props.LoggedInUser === props.MsgOwner ? "flex-end" : null};
`;

const MessageTextContainer = styled.div`
  margin-left: 5px;
  background-color: ${(props) =>
    props.LoggedInUser === props.MsgOwner ? "#B5EAEA" : "white"};
  padding: 10px;
  border-radius: 10px;
`;

export default Message;
