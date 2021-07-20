import React, { useState } from "react";
import styled from "styled-components";
import { BiCloudUpload } from "react-icons/bi";

import firebase from "firebase";

const PostForm = ({ user }) => {
  const [description, setDescription] = useState("");
  const [postURL, setPostURL] = useState("");
  const firestore = firebase.firestore();
  const postsRef = firestore.collection("posts");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState("false");
  const [isValidated, setValidated] = useState(false);

  const fileHandler = async (e) => {
    const file = e.target.files[0];
    const storage = firebase.storage();
    const fileRef = storage.ref(`/posts/${file.name}`);
    await fileRef.put(file);
    setPostURL(await fileRef.getDownloadURL());
  };

  const validatePost = () => {
    if (description === "") {
      setIsError(true);
      setValidated(true);
      setError("Description cannot be empty !");
      return true;
    } else return false;
  };

  const postHandler = async (e) => {
    e.preventDefault();
    if (!validatePost()) {
      await postsRef.add({
        postOwner: user.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        description,
        postURL,
        ownerPhoto: user.photoURL,
      });
      setDescription("");
      setIsError(false);
      setValidated(false);
    }
  };

  console.log(postURL);

  return (
    <PostFormWrapper>
      <Form onSubmit={postHandler}>
        <FileInput type="file" onChange={fileHandler} />

        <label style={{ color: "white" }}>Description:</label>
        <FileInput
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          t
          type="text"
          value={description}
        />
        {isError ? <ErrorMsg>{error}</ErrorMsg> : null}
        <Button type="submit">
          <BiCloudUpload size={40} /> Upload
        </Button>
      </Form>
    </PostFormWrapper>
  );
};

const PostFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
  width: 500px;
  height: 200px;
  background-color: #0f4c75;
  border-radius: 10px;
  border: 2px solid #bbe1fa;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.43);
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 5px;
  // margin-bottom: 10px;

  background-color: #bbe1fa;
  outline: none;
  border: none;
  color: black;
  border-radius: 10px;
  :first-child {
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  background-color: transparent;
  color: #bbe1fa;
  border: none;
  border: 1px solid #bbe1fa;
  border-radius: 15px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  margin-top: 10px;
  &:hover {
    background-color: #bbe1fa;
    color: white;
  }
`;
const ErrorMsg = styled.p`
  color: red;
  font-size: 0.7rem;
  margin-left: 5px;
  margin-bottom: 0;
`;

export default PostForm;
