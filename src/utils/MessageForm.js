import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { AiOutlineSend } from "react-icons/ai";
const MessageForm = ({ user, messagesRef }) => {
  const [msg, setMsg] = useState("");

  const sendMsg = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: msg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      owner: user.displayName,
      ownerPhoto: user.photoURL,
    });

    setMsg("");
  };

  return (
    <MessageFormContainer>
      <Form onSubmit={sendMsg}>
        <MsgInput
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          type="text"
          placeholder={user.displayName + " say something !"}
        ></MsgInput>
        <Button type="submit">
          Send ! <AiOutlineSend size={30} />
        </Button>
      </Form>
    </MessageFormContainer>
  );
};

const MessageFormContainer = styled.div`
  background-color: white;
  width: 60%;
  margin: 0 auto;
  background-color: #c1ac95;
`;

const Form = styled.form`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;

const MsgInput = styled.input`
  min-width: 50%;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #edf6e5;
  outline: none;
  color: #edf6e5;
  margin-left: 5px;
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  transition: 0.3s;
  :hover {
    color: #b5cda3;
  }
`;

export default MessageForm;
