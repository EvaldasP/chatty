import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { AiOutlineSend } from "react-icons/ai";
const MessageForm = ({ user, messagesRef }) => {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState("false");
  const [isValidated, setValidated] = useState(false);

  const validateMsg = () => {
    if (msg === "") {
      setError("Message can't be empty");
      setIsError(true);
      setValidated(true);
      return true;
    }
    return false;
  };

  const sendMsg = async (e) => {
    e.preventDefault();

    validateMsg();

    if (!validateMsg()) {
      await messagesRef.add({
        text: msg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        owner: user.displayName,
        ownerPhoto: user.photoURL,
      });
      setError("");
      setMsg("");
      setIsError(false);
      setValidated(false);
    } else {
      console.log(error);
    }
  };

  return (
    <MessageFormContainer>
      <Form onSubmit={sendMsg}>
        <div>
          <MsgInput
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            isError={isError}
            isValidated={isValidated}
            type="text"
            placeholder={user.displayName + " say something !"}
          ></MsgInput>
          {isError ? <ErrorMsg>{error}</ErrorMsg> : null}
        </div>
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
  padding: 7px 0;
  display: flex;
  justify-content: space-between;
`;

const MsgInput = styled.input`
  min-width: 50%;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid;
  border-color: ${(props) =>
    props.isError && props.isValidated ? "red" : "#edf6e5"};
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

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.7rem;
  margin-left: 5px;
`;

export default MessageForm;
