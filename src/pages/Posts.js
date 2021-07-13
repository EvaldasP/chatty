import React, { useEffect, useRef } from "react";
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
  const query = postsRef.orderBy("createdAt");
  const [posts] = useCollectionData(query, { idField: "id" });

  console.log(posts);

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [posts]);

  return (
    <>
      <NavBar auth={auth} user={user} />
      <PostPageWrapper className="overflow-auto">
        <PostForm user={user} postsRef={postsRef} />
        {posts &&
          posts.map((post) => (
            <Post
              createdAt={post.createdAt}
              key={post.id}
              owner={post.postOwner}
              ownerPhoto={post.ownerPhoto}
              description={post.description}
              postURL={post.postURL}
            />
          ))}
        <span ref={dummy}></span>
      </PostPageWrapper>
    </>
  );
};

const PostPageWrapper = styled.div`
  background-color: #faebe0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Posts;
