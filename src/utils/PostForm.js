import React, { useState } from "react";
import styled from "styled-components";

import firebase from "firebase";

const PostForm = ({ user }) => {
  const [description, setDescription] = useState("");
  const [postURL, setPostURL] = useState("");
  const firestore = firebase.firestore();
  const postsRef = firestore.collection("posts");
  const [clicked, isClicked] = useState("");

  const fileHandler = async (e) => {
    const file = e.target.files[0];

    const storage = firebase.storage();
    const fileRef = storage.ref(`/posts/${file.name}`);
    await fileRef.put(file);
    setPostURL(await fileRef.getDownloadURL());
  };

  const postHandler = async (e) => {
    e.preventDefault();
    await postsRef.add({
      postOwner: user.displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      description,
      postURL,
      ownerPhoto: user.photoURL,
    });

    setDescription("");
  };

  console.log(postURL);

  return (
    <PostFormWrapper>
      <Form onSubmit={postHandler}>
        <input type="file" onChange={fileHandler} />

        <label>Description:</label>
        <input
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          t
          type="text"
          value={description}
        />
        <button type="submit">Upload</button>
      </Form>
    </PostFormWrapper>
  );
};

const PostFormWrapper = styled.div``;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
`;

export default PostForm;
