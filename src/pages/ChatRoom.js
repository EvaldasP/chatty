import React, { useRef, useEffect } from "react";
import firebase from "../firebase/base";
import styled from "styled-components";
import NavBar from "../utils/NavBar";
import Message from "../components/Message";
import MessageForm from "../utils/MessageForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const ChatRoom = () => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const [user] = useAuthState(auth);
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limitToLast(14);
  const [messages] = useCollectionData(query, { idField: "id" });

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatRoomContainer>
      <NavBar auth={auth} user={user} />
      <MessagesContainer>
        <div>
          {messages &&
            messages.map((msg) => {
              return (
                <Message
                  msg={msg.text}
                  msgOwnerPhoto={msg.ownerPhoto}
                  msgOwner={msg.owner}
                />
              );
            })}
          <span ref={dummy}></span>
        </div>
      </MessagesContainer>
      <MessageForm user={user} messagesRef={messagesRef}></MessageForm>
    </ChatRoomContainer>
  );
};

const ChatRoomContainer = styled.div`
  background-color: #edf6e5;
  min-height: 100vh;
`;

const MessagesContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  background-color: #ffbcbc;
  height: 80vh;
  margin-top: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export default ChatRoom;
