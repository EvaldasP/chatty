import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import firebase from "./firebase/base";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import ChatRoom from "./pages/ChatRoom";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  console.log(user);
  return <>{user ? <ChatRoom /> : <SignIn />}</>;
}

export default App;
