import React from "react";
import NavBar from "../utils/NavBar";
import PostForm from "../utils/PostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/base";
import styled from "styled-components";
const Posts = () => {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  return (
    <>
      <NavBar auth={auth} user={user} />
      <PostPageWrapper>
        <PostForm />
      </PostPageWrapper>
    </>
  );
};

const PostPageWrapper = styled.div`
  background-color: #faebe0;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export default Posts;
