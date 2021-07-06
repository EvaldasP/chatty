import React from "react";
import "./App.css";
import firebase from "./firebase/base";
import SignIn from "./pages/SignIn";
import ChatRoom from "./pages/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const auth = firebase.auth();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  const [user] = useAuthState(auth);
  return <>{user ? <ChatRoom /> : <SignIn />}</>;
}

export default App;
