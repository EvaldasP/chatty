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
  const [user] = useAuthState(auth);
  const firestore = firebase.firestore();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limitToLast(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatRoomContainer>
      <NavBar auth={auth} user={user} />
      <MessagesContainer>
        <Wrapper className="overflow-auto">
          {messages &&
            messages.map((msg) => {
              return (
                <Message
                  msg={msg.text}
                  msgOwnerPhoto={msg.ownerPhoto}
                  msgOwner={msg.owner}
                  timeCreated={msg.createdAt}
                />
              );
            })}
          <span ref={dummy}></span>
        </Wrapper>
      </MessagesContainer>
      <MessageForm user={user} messagesRef={messagesRef}></MessageForm>
    </ChatRoomContainer>
  );
};

const ChatRoomContainer = styled.div`
  background-color: #17181f;
  min-height: 100vh;
`;

const MessagesContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  background: rgb(108, 114, 203);
  background: rgb(108, 114, 203);
  background: linear-gradient(
    90deg,
    rgba(108, 114, 203, 1) 0%,
    rgba(203, 105, 193, 1) 100%
  );
  height: 80vh;
  margin-top: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.43);
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Wrapper = styled.div`
  /* Track */
  &::-webkit-scrollbar {
    box-shadow: inset 0 0 5px grey;
    width: 5px;
    border-radius: 5px;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #bbe1fa;
    border-radius: 5px;
  }
`;
export default ChatRoom;
