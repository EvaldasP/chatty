import React from "react";
import "./App.css";

import firebase from "./firebase/base";
import SignIn from "./pages/SignIn";
import ChatRoom from "./pages/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  console.log(user);
  return <>{user ? <ChatRoom /> : <SignIn />}</>;
}

export default App;
