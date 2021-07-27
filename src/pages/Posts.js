import React, { useEffect, useRef, useState } from "react";
import NavBar from "../utils/NavBar";
import PostForm from "../utils/PostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/base";
import styled from "styled-components";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Post from "../components/Post";

const Posts = () => {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  const firestore = firebase.firestore();
  const postsRef = firestore.collection("posts");
  const query = postsRef.orderBy("createdAt", "desc");
  const [posts] = useCollectionData(query, { idField: "id" });

  console.log(user.uid);

  const dummy = useRef();
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [posts]);

  return (
    <PostPageWrapper>
      <NavBar auth={auth} user={user} />
      <PostForm user={user} postsRef={postsRef} />
      <PostsContainer className="overflow-auto">
        {posts &&
          posts.map((post) => (
            <Post
              createdAt={post.createdAt}
              key={post.id}
              owner={post.postOwner}
              ownerPhoto={post.ownerPhoto}
              description={post.description}
              postURL={post.postURL}
              loggedInUser={user}
              postOwnerId={post.postOwnerId}
              id={post.id}
            />
          ))}
      </PostsContainer>
      <span ref={dummy}></span>
    </PostPageWrapper>
  );
};

const PostPageWrapper = styled.div`
  background-color: #17181f;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Track */
`;

const PostsContainer = styled.div`
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    box-shadow: inset 0 0 5px grey;
    width: 5px;
    border-radius: 5px;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #cb69c1;
    border-radius: 5px;
  }
`;

export default Posts;
