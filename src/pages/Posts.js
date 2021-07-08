import React from "react";
import NavBar from "../utils/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/base";
const Posts = () => {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  return (
    <>
      <NavBar auth={auth} user={user} />
    </>
  );
};

export default Posts;
